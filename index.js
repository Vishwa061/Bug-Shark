const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");
const fs = require("fs");
const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

//////////////////////////////// MIDDLEWARE ////////////////////////////////

app.use(cors());
app.use(express.json());
app.use(fileUpload());

if (process.env.NODE_ENV === "production") {
    // server static content (build)
    app.use(express.static(path.join(__dirname, "client/build")));
}

//////////////////////////////// FUNCTIONS ////////////////////////////////

// generate random ID
async function generateID(type) {
    const POSTGRES_MAX_INTEGER = 2147483646;
    let id;
    let sameIDs;
    let table;

    switch (type) {
        case "user":
            table = "Users";
            break;
        case "project":
            table = "Project";
            break;
        case "bug":
            table = "Bug";
            break;
        case "log":
            table = "Log";
            break;
        default: {
            console.log("INVALID ID TYPE");
            return null;
        }
    }

    try {
        do {
            id = Math.round(Math.random() * POSTGRES_MAX_INTEGER);

            // finds all same IDs
            sameIDs = await pool.query(
                `SELECT * 
                FROM ${table} 
                WHERE ${type}_id = ${id}`
            );
        } while (sameIDs.rows.length !== 0);

        return id;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

// send notifications to subscribed users
function sendNotifications(emails, subject, text) {
    let stringifiedEmails = "";
    emails.forEach(email => {
        stringifiedEmails += `, ${email.email}`
    });
    stringifiedEmails = stringifiedEmails.substring(2);

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: stringifiedEmails,
        subject: subject,
        text: text
    }

    transporter.sendMail(mailOptions, err => {
        if (err) {
            console.error("EMAIL ERROR", mailOptions);
        }
    });
}

//////////////////////////////// REST API ROUTES ////////////////////////////////

// create user
app.post("/api/users", async (req, res) => {
    try {
        const { email, first_name, last_name, gender } = req.body;
        const user_id = (await generateID("project")); // must await since generateID() is async so it returns a promise

        // finds all users with the same email
        const usersWithSameEmail = await pool.query(
            `SELECT user_id 
            FROM Users 
            WHERE email = $1`,
            [email]
        );

        // checks if the user does not exists
        if (usersWithSameEmail.rows.length === 0) {
            // adds the user to the DB
            await pool.query(
                `INSERT INTO Users(user_id, has_profile_picture, email, first_name, last_name, gender) VALUES 
                (${user_id}, FALSE, $1, $2, $3, $4)`,
                [email, first_name, last_name, gender]
            );

            res.json({ user_id: user_id });
        } else {
            res.json({ user_id: usersWithSameEmail.rows[0].user_id });
        }
    } catch (err) {
        console.error(err.message);
    }
});

// create project
app.post("/api/projects", async (req, res) => {
    try {
        const { project_name } = req.body;
        const project_id = (await generateID("project")); // must await since generateID() is async so it returns a promise

        // adds the project to the DB
        await pool.query(
            `INSERT INTO Project(project_id, project_name) VALUES 
            (${project_id}, $1)`,
            [project_name]
        );

        res.json({ project_id: project_id });
    } catch (err) {
        console.error(err.message);
    }
});

// create participant
app.post("/api/participants", async (req, res) => {
    try {
        const { user_id, project_id, participant_type } = req.body;
        const sameParticipants = await pool.query(
            `SELECT user_id 
            FROM Participant 
            WHERE user_id = $1 AND project_id = $2`,
            [user_id, project_id]
        );

        if (sameParticipants.rowCount === 0) {
            // participant_type
            // 0: dev
            // 1: manager
            // 2: owner
            await pool.query(
                `INSERT INTO Participant(user_id, project_id, participant_type) VALUES 
                ($1, $2, $3)`,
                [user_id, project_id, participant_type]
            );

            await pool.query(
                `DELETE FROM Invited 
                WHERE project_id = $1 AND user_id = $2`,
                [project_id, user_id]
            );

            res.send("Participant Created");
        } else {
            res.send("Participant Already Exists");
        }
    } catch (err) {
        console.error(err.message);
    }
});

// create bug
app.post("/api/bugs", async (req, res) => {
    try {
        const { project_id, severity, error, user_id, reproduce } = req.body;
        const bug_id = (await generateID("bug")); // must await since generateID() is async so it returns a promise
        const STATUS_OPEN = 0;
        const bug = await pool.query(
            `INSERT INTO Bug(bug_id, bug_status, reported, project_id, severity, error, reporter_id, reproduce) VALUES 
            (${bug_id}, ${STATUS_OPEN}, to_timestamp(${Date.now()} / 1000.0), $1, $2, $3, $4, $5) 
            RETURNING *`,
            [project_id, severity, error, user_id, reproduce]
        );

        res.json(bug.rows[0].bug_id);
    } catch (err) {
        console.error(err.message);
    }
});

// create log
app.post("/api/logs", async (req, res) => {
    try {
        const { user_id, bug_id, project_id, change } = req.body;
        const log_id = (await generateID("log")); // must await since generateID() is async so it returns a promise

        const user = await pool.query(
            `SELECT first_name || ' ' || last_name AS fullname 
            FROM Users 
            WHERE user_id = $1`,
            [user_id]
        );

        const fullname = user.rows[0].fullname;

        await pool.query(
            `INSERT INTO Log(log_id, logged, bug_id, project_id, change) VALUES 
            (${log_id}, to_timestamp(${Date.now()} / 1000.0), $1, $2, $3)`,
            [bug_id, project_id, `${change} by ${fullname}`]
        );

        const emails = await pool.query(
            `SELECT email 
            FROM Users U, Notified N 
            WHERE N.project_id = $1 AND N.bug_id = $2 AND N.user_id = U.user_id AND U.user_id <> $3`,
            [project_id, bug_id, user_id]
        );

        if (emails.rowCount > 0) {
            const project = await pool.query(
                `SELECT project_name 
                FROM Project 
                WHERE project_id = $1`,
                [project_id]
            );

            sendNotifications(
                emails.rows,
                `${project.rows[0].project_name} Bug ID:${bug_id} Updated`,
                `${change} by ${fullname}`
            );
        }

        res.send("Log Created");
    } catch (err) {
        console.error("log", err.message);
    }
});

// create invite
app.post("/api/invites", async (req, res) => {
    try {
        const { email, project_id, invite_type } = req.body;

        const user = await pool.query(
            `SELECT user_id 
            FROM Users 
            WHERE email = $1`,
            [email]
        );

        if (user.rowCount === 0) {
            // console.log("User does not have a Bug Shark account")
            res.send("User does not have a Bug Shark account");
            return;
        }

        const user_id = user.rows[0].user_id;

        const dups = await pool.query(
            `(SELECT user_id 
            FROM Invited 
            WHERE user_id = $1 AND project_id = $2) 
            UNION 
            (SELECT user_id 
            FROM Participant 
            WHERE user_id = $1 AND project_id = $2)`,
            [user_id, project_id]
        );

        if (dups.rows.length === 0) { // avoids dup invites/participants
            await pool.query(
                `INSERT INTO Invited(user_id, project_id, invite_type) VALUES 
                ($1, $2, $3)`,
                [user_id, project_id, invite_type]
            );
            res.send("Invite Created");
        } else {
            res.send("Invite Already Exists or User Is Already Apart of Project");
        }
    } catch (err) {
        console.log(err.message);
    }
});

// create assignment
app.post("/api/assignments", async (req, res) => {
    try {
        const { email, project_id, bug_id } = req.body;
        const DEVELOPER = 0;

        const user = await pool.query( // check if the user is a developer (also implies they are in the project)
            `SELECT P.user_id 
            FROM Users U, Participant P 
            WHERE email = $1 AND U.user_id = P.user_id AND project_id = $2 
                AND participant_type = ${DEVELOPER}`,
            [email, project_id]
        );
        if (user.rowCount === 0) {
            res.send("User not apart of project or isnt a developer");
            return;
        }

        const user_id = user.rows[0].user_id;

        const dups = await pool.query(
            `SELECT user_id 
            FROM Assigned 
            WHERE user_id = $1 AND project_id = $2 AND bug_id = $3`,
            [user_id, project_id, bug_id]
        );
        if (dups.rowCount > 0) {
            res.send("User already assigned")
            return;
        }

        await pool.query(
            `INSERT INTO Assigned(user_id, project_id, bug_id) VALUES 
            ($1, $2, $3)`,
            [user_id, project_id, bug_id]
        );

        res.send("Assignment Created");
    } catch (err) {
        console.log(err.message);
    }
});

// create notification
app.post("/api/notifications", async (req, res) => {
    try {
        const { user_id, project_id, bug_id } = req.body;

        await pool.query(
            `INSERT INTO Notified(user_id, project_id, bug_id) VALUES 
            ($1, $2, $3)`,
            [user_id, project_id, bug_id]
        );
        res.send("Notification Created");
    } catch (err) {
        console.log(err.message);
    }
});

// get user ID
app.get("/api/users/:email/user_id", async (req, res) => {
    try {
        const { email } = req.params;
        const user = await pool.query(
            `SELECT user_id 
            FROM Users 
            WHERE email = $1`,
            [email]
        );

        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get user
app.get("/api/users/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await pool.query(
            `SELECT * 
            FROM Users 
            WHERE user_id = $1`,
            [user_id]
        );

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get user profile picture
app.get("/api/users/:user_id/profile_picture", async (req, res) => {
    try {
        const { user_id } = req.params;
        res.sendFile(path.join(__dirname, "profile_pictures", `${user_id}.png`));
    } catch (err) {
        console.error(err.message);
    }
});

// get all projects for a specific user
app.get("/api/users/:user_id/projects", async (req, res) => {
    try {
        const { user_id } = req.params;
        const projects = await pool.query(
            `WITH P(project_id, project_name) AS 
            (SELECT PR.project_id, project_name 
            FROM Project PR, Participant PA 
            WHERE PR.project_id = PA.project_id AND user_id = $1) 

            SELECT project_id, project_name, 
            (SELECT COUNT(*) 
            FROM Participant PA 
            WHERE PA.project_id = P.project_id) AS num_participants, 
            (SELECT COUNT(*) 
            FROM Bug B 
            WHERE B.project_id = P.project_id AND bug_status < 2) AS num_active_bugs 
            FROM P `,
            [user_id]
        );
        res.json(projects.rows);
    } catch (err) {
        console.error(err.message);
    }

});

// get all participants for a specific project
app.get("/api/projects/:project_id/participants", async (req, res) => {
    try {
        const { project_id } = req.params;
        const participants = await pool.query(
            `SELECT first_name || ' ' || last_name AS fullname, participant_type, has_profile_picture, U.user_id 
            FROM Participant P, Users U 
            WHERE project_id = $1 AND P.user_id = U.user_id`,
            [project_id]
        );

        res.json(participants.rows);
    } catch (err) {
        console.error(err.message);
    }

});

// get participant type for a specific participant
app.get("/api/projects/:project_id/participants/:user_id", async (req, res) => {
    try {
        const { project_id, user_id } = req.params;
        const participant = await pool.query(
            `SELECT participant_type 
            FROM Participant 
            WHERE project_id = $1 AND user_id = $2`,
            [project_id, user_id]
        );

        if (participant.rowCount === 0) {
            res.send("User not apart of project");
            return
        }

        res.json(participant.rows[0].participant_type);
    } catch (err) {
        console.error(err.message);
    }

});

// get project
app.get("/api/projects/:project_id", async (req, res) => {
    try {
        const { project_id } = req.params;
        const project = await pool.query(
            `SELECT project_name, 
                (SELECT COUNT(*) 
                FROM Participant PA2 
                WHERE PR.project_id = PA2.project_id) AS num_participants 
            FROM Project PR, Participant PA1 
            WHERE PR.project_id = $1 AND PR.project_id = PA1.project_id`,
            [project_id]
        );

        res.json(project.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get invite
app.get("/api/projects/:project_id/users/:user_id/invites", async (req, res) => {
    try {
        const { project_id, user_id } = req.params;

        const invite = await pool.query(
            `SELECT invite_type 
            FROM Invited 
            WHERE project_id = $1 AND user_id = $2`,
            [project_id, user_id]
        );

        res.json(invite.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get bug
app.get("/api/projects/:project_id/bugs/:bug_id", async (req, res) => {
    try {
        const { project_id, bug_id } = req.params;
        const bug = await pool.query(
            `SELECT severity, error, bug_status, reported, first_name || ' ' || last_name AS reporter, workaround, solution, reproduce 
            FROM Bug B, Users U 
            WHERE project_id = $1 AND bug_id = $2 AND B.reporter_id = U.user_id`,
            [project_id, bug_id]
        );

        res.send(bug.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get todays active bugs for a specific user
app.get("/api/users/:user_id/bugs-active", async (req, res) => {
    try {
        const { user_id } = req.params;
        const bugs = await pool.query(
            `SELECT project_name, severity, B.bug_id  
            FROM Participant PA, Project PR, Bug B 
            WHERE PA.user_id = $1 AND PA.project_id = PR.project_id AND PR.project_id = B.project_id 
                AND bug_status < 2 AND reported >= CURRENT_DATE`,
            [user_id]
        );

        res.json(bugs.rows);
    } catch (err) {
        console.error(err.message);
    }

});

// get all active bugs for a specific project
app.get("/api/projects/:project_id/bugs-active", async (req, res) => {
    try {
        const { project_id } = req.params;
        const bugs = await pool.query(
            `SELECT bug_id, severity, bug_status, reported, first_name || ' ' || last_name AS reporter 
            FROM Bug B, Users U 
            WHERE B.project_id = $1 AND B.reporter_id = U.user_id AND bug_status < 2`,
            [project_id]
        );

        res.json(bugs.rows);
        //console.log(Date(bugs.rows[0].reported))
    } catch (err) {
        console.error(err.message);
    }

});

// get all closed bugs for a specific project
app.get("/api/projects/:project_id/bugs-closed", async (req, res) => {
    try {
        const { project_id } = req.params;
        const bugs = await pool.query(
            `SELECT bug_id, severity, bug_status, reported, first_name || ' ' || last_name AS reporter 
            FROM Bug B, Users U 
            WHERE B.project_id = $1 AND B.reporter_id = U.user_id AND bug_status = 2`,
            [project_id]
        );

        res.json(bugs.rows);
        //console.log(Date(bugs.rows[0].reported))
    } catch (err) {
        console.error(err.message);
    }

});

// get all logs for a specific bug
app.get("/api/projects/:project_id/bugs/:bug_id/logs", async (req, res) => {
    try {
        const { project_id, bug_id } = req.params;
        const logs = await pool.query(
            `SELECT change, logged 
            FROM Log 
            WHERE project_id = $1 AND bug_id = $2 
            ORDER BY logged DESC`,
            [project_id, bug_id]
        );

        res.json(logs.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get all assignments for a specific bug
app.get("/api/projects/:project_id/bugs/:bug_id/assignments", async (req, res) => {
    try {
        const { project_id, bug_id } = req.params;
        const assignments = await pool.query(
            `SELECT A.user_id, first_name || ' ' || last_name AS fullname, email 
            FROM Assigned A, Users U 
            WHERE project_id = $1 AND bug_id = $2 AND A.user_id = U.user_id 
            ORDER BY fullname`,
            [project_id, bug_id]
        );

        res.json(assignments.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get whether or not notifications for a specific bug is enabled
app.get("/api/projects/:project_id/bugs/:bug_id/users/:user_id/notifications", async (req, res) => {
    try {
        const { project_id, bug_id, user_id } = req.params;
        const notifications = await pool.query(
            `SELECT user_id 
            FROM Notified 
            WHERE project_id = $1 AND bug_id = $2 AND user_id = $3`,
            [project_id, bug_id, user_id]
        );

        res.json(notifications.rowCount === 1);
    } catch (err) {
        console.log(err.message);
    }
});

// get all invites for a specific project
app.get("/api/projects/:project_id/invites", async (req, res) => {
    try {
        const { project_id } = req.params;

        const invites = await pool.query(
            `SELECT first_name || ' ' || last_name AS fullname, email 
            FROM Invited I, Users U 
            WHERE project_id = $1 AND I.user_id = U.user_id`,
            [project_id]
        );

        res.json(invites.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get contributions for a specific user
app.get("/api/users/:user_id/contributions", async (req, res) => {
    try {
        const { user_id } = req.params;

        const contributions = await pool.query(
            `SELECT project_name, 
                (SELECT COUNT(*) 
                FROM Bug B 
                WHERE PR.project_id = B.project_id AND reporter_id = $1) AS num_bugs_reported 
            FROM Participant PA, Project PR 
            WHERE user_id = $1 AND PA.project_id = PR.project_id`,
            [user_id]
        );

        res.json(contributions.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// update user first and last name
app.put("/api/users/:user_id/name", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { first_name, last_name } = req.body;

        if (first_name.length > 25 || last_name.length > 25) {
            res.send("Length too long");
            return;
        }

        await pool.query(
            `UPDATE Users 
                SET first_name = $1, last_name = $2 
                WHERE user_id = $3`,
            [first_name, last_name, user_id]
        );

        res.send("User First & Last Name Updated")
    } catch (err) {
        console.error(err.message);
    }
});

// update user gender
app.put("/api/users/:user_id/gender", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { gender } = req.body;

        if (gender.length > 12) {
            res.send("Length too long");
            return;
        }

        await pool.query(
            `UPDATE Users 
                SET gender = $2 
                WHERE user_id = $1`,
            [user_id, gender]
        );

        res.send("User Gender Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// update user profile picture
app.put("/api/users/:user_id/profile_picture", async (req, res) => {
    try {
        const { user_id } = req.params;
        const ONE_MB = 1024 * 1024;

        if (req.files === null) {
            res.send("No file uploaded");
            return;
        }

        const profile_picture = req.files.profile_picture;
        if (profile_picture.size > ONE_MB) {
            res.send("File too large");
            return;
        }
        profile_picture.mv(path.join(__dirname, "profile_pictures", `${user_id}.png`));

        await pool.query(
            `UPDATE Users 
                SET has_profile_picture = TRUE 
                WHERE user_id = $1`,
            [user_id]
        );

        res.send("User Profile Picture Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// update user email
// app.put("/api/users/:user_id/email", async (req, res) => {
//     try {
//         const { user_id } = req.params;
//         const { email } = req.body;

//         const usersWithSameEmail = await pool.query(
//             `SELECT user_id 
//             FROM Users 
//             WHERE email = $1`,
//             [email]
//         );

//         if (usersWithSameEmail.rowCount === 0) {
//             await pool.query(
//                 `UPDATE Users 
//                 SET email = $1 
//                 WHERE user_id = $2`,
//                 [email, user_id]
//             );

//             res.send("User Email Updated");
//         } else {
//             res.send("User Email Already Exists");
//         }
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// update participant type
app.put("/api/projects/:project_id/participants/:email", async (req, res) => {
    try {
        const { project_id, email } = req.params;
        const { participant_type, owner_id } = req.body;

        await pool.query(
            `UPDATE Participant P 
            SET participant_type = $1 
            FROM Users U 
            WHERE project_id = $2 AND P.user_id = U.user_id AND email = $3 
                AND P.user_id <> $4`,
            [participant_type, project_id, email, owner_id]
        );

        res.send("Participant Type Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// update bug
app.put("/api/projects/:project_id/bugs/:bug_id", async (req, res) => {
    try {
        const { project_id, bug_id } = req.params;
        const { atr_key, atr_value } = req.body;

        if (atr_key === "bug_id" || atr_key === "project_id") {
            res.send("CANNOT UPDATE AN ID");
            return;
        }

        switch (atr_key) {
            case "severity": {
                await pool.query(
                    `UPDATE Bug 
                    SET severity = $1 
                    WHERE project_id = $2 AND bug_id = $3`,
                    [atr_value, project_id, bug_id]
                );
                break;
            }
            case "status": {
                await pool.query(
                    `UPDATE Bug 
                    SET bug_status = $1 
                    WHERE project_id = $2 AND bug_id = $3`,
                    [atr_value, project_id, bug_id]
                );
                break;
            }
            case "error": {
                await pool.query(
                    `UPDATE Bug 
                    SET error = $1 
                    WHERE project_id = $2 AND bug_id = $3`,
                    [atr_value, project_id, bug_id]
                );
                break;
            }
            case "reproduce": {
                await pool.query(
                    `UPDATE Bug 
                    SET reproduce = $1 
                    WHERE project_id = $2 AND bug_id = $3`,
                    [atr_value, project_id, bug_id]
                );
                break;
            }
            case "workaround": {
                await pool.query(
                    `UPDATE Bug 
                    SET workaround = $1 
                    WHERE project_id = $2 AND bug_id = $3`,
                    [atr_value, project_id, bug_id]
                );
                break;
            }
            case "solution": {
                await pool.query(
                    `UPDATE Bug 
                    SET solution = $1 
                    WHERE project_id = $2 AND bug_id = $3`,
                    [atr_value, project_id, bug_id]
                );
                break;
            }
            default: {
                console.error("INAVLID atr_key", atr_key);
            };
        }

        res.send(`Bug ${atr_key} Updated`);
    } catch (err) {
        console.error(err.message);
    }
});

// update project name
app.put("/api/projects/:project_id", async (req, res) => {
    try {
        const { project_id } = req.params;
        const { project_name } = req.body;

        await pool.query(
            `UPDATE Project 
            SET project_name = $1 
            WHERE project_id = $2`,
            [project_name, project_id]
        );

        res.send("Project Name Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// delete user profile picture
app.delete("/api/users/:user_id/profile_picture", async (req, res) => {
    try {
        const { user_id } = req.params;

        const user = await pool.query(
            `SELECT has_profile_picture 
            FROM Users 
            WHERE user_id = $1`,
            [user_id]
        );

        const has_profile_picture = user.rows[0].has_profile_picture;
        if (!has_profile_picture) {
            res.send("No profile picture to delete");
            return;
        }

        fs.unlinkSync(path.join(__dirname, "profile_pictures", `${user_id}.png`));

        await pool.query(
            `UPDATE Users 
                SET has_profile_picture = FALSE 
                WHERE user_id = $1`,
            [user_id]
        );

        res.send("User Profile Picture Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// delete project
app.delete("/api/projects/:project_id", async (req, res) => {
    try {
        const { project_id } = req.params;

        await pool.query(
            `DELETE FROM Project 
            WHERE project_id = $1`,
            [project_id]
        );

        res.send("Project Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// delete bug
app.delete("/api/projects/:project_id/bugs/:bug_id", async (req, res) => {
    try {
        const { bug_id, project_id } = req.params;

        await pool.query(
            `DELETE FROM Bug 
            WHERE bug_id = $1 AND project_id = $2`,
            [bug_id, project_id]
        );

        res.send("Bug Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// delete participant
app.delete("/api/projects/:project_id/participants/:email/who/:participant_type", async (req, res) => {
    try {
        // participant type of the user who made the delete request
        const { project_id, email, participant_type } = req.params;
        const OWNER = 2;

        await pool.query(
            `DELETE FROM Participant P USING Users U 
            WHERE project_id = $1 AND email = $2 AND P.user_id = U.user_id 
                AND participant_type <> $3 AND participant_type <> ${OWNER}`,
            [project_id, email, participant_type]
        );

        res.send("Participant Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// delete invite
app.delete("/api/projects/:project_id/invites/:email", async (req, res) => {
    try {
        const { project_id, email } = req.params;

        await pool.query(
            `DELETE FROM Invited I USING Users U 
            WHERE project_id = $1 AND I.user_id = U.user_id AND U.email = $2`,
            [project_id, email]
        );

        res.send("Invite Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// delete assignment
app.delete("/api/projects/:project_id/bugs/:bug_id/users/:email/assignments", async (req, res) => {
    try {
        const { email, project_id, bug_id } = req.params;

        const user = await pool.query( // developer participant_type is 0
            `SELECT P.user_id 
            FROM Users U, Participant P 
            WHERE email = $1 AND U.user_id = P.user_id AND project_id = $2`,
            [email, project_id]
        );

        if (user.rowCount === 0) {
            res.send("User not apart of project");
            return;
        }

        const user_id = user.rows[0].user_id;

        await pool.query(
            `DELETE FROM Assigned 
            WHERE project_id = $1 AND bug_id = $2 AND user_id = $3`,
            [project_id, bug_id, user_id]
        );

        res.send("Assignment Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// delete notification
app.delete("/api/projects/:project_id/bugs/:bug_id/users/:user_id/notifications", async (req, res) => {
    try {
        const { project_id, bug_id, user_id } = req.params;

        await pool.query(
            `DELETE FROM Notified 
            WHERE project_id = $1 AND bug_id = $2 AND user_id = $3`,
            [project_id, bug_id, user_id]
        );

        res.send("Notification Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// catch all handler
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// listen to calls made from the client side
app.listen(PORT, () => {
    console.log(`The database connection has started on port ${PORT}`);
});