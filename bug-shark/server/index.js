const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//////////////////////////////// MIDDLEWARE ////////////////////////////////

app.use(cors());
app.use(express.json());

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

//////////////////////////////// REST API ROUTES ////////////////////////////////

// create user
app.post("/api/users", async (req, res) => {
    try {
        const { email, first_name, last_name, gender } = req.body;
        const user_id = (await generateID("project")); // must await since generateID() is async so it returns a promise

        // finds all users with the same email
        const usersWithSameEmail = await pool.query(
            `SELECT * 
            FROM Users 
            WHERE email = $1`,
            [email]
        );

        // checks if the user does not exists
        if (usersWithSameEmail.rows.length === 0) {
            // adds the user to the DB
            await pool.query(
                `INSERT INTO Users(user_id, email, first_name, last_name, gender) VALUES 
                (${user_id}, $1, $2, $3, $4)`,
                [email, first_name, last_name, gender]
            );
            res.send("User Created");
        } else {
            res.send("User Already Exists");
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

        res.send("Project Created");
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
        await pool.query(
            `INSERT INTO Bug(bug_id, bug_status, reported, project_id, severity, error, reporter_id, reproduce) VALUES 
            (${bug_id}, ${STATUS_OPEN}, to_timestamp(${Date.now()} / 1000.0), $1, $2, $3, $4, $5)`,
            [project_id, severity, error, user_id, reproduce]
        );

        res.send("Bug Created");
    } catch (err) {
        console.error(err.message);
    }
});

// create log
app.post("/api/logs", async (req, res) => {
    try {
        const { bug_id, project_id, change } = req.body;
        const log_id = (await generateID("log")); // must await since generateID() is async so it returns a promise
        await pool.query(
            `INSERT INTO Log(log_id, logged, bug_id, project_id, change) VALUES 
            (${log_id}, to_timestamp(${Date.now()} / 1000.0), $1, $2, $3)`,
            [bug_id, project_id, change]
        );

        res.send("Log Created");
    } catch (err) {
        console.error(err.message);
    }
});

// create invite
app.post("/api/invites", async (req, res) => {
    try {
        const { user_id, project_id, invite_type } = req.body;
        const sameInvites = await pool.query(
            `SELECT * 
            FROM Invited 
            WHERE user_id = $1 AND project_id = $2`,
            [user_id, project_id]
        );

        if (sameInvites.rows.length === 0) {
            await pool.query(
                `INSERT INTO Invited(user_id, project_id, invite_type) VALUES 
                ($1, $2, $3)`,
                [user_id, project_id, invite_type]
            );
            res.send("Invite Created");
        } else {
            res.send("Invite Already Exists");
        }
    } catch (err) {
        console.log(err.message);
    }
});

// create assignment
app.post("/api/assignments", async (req, res) => {
    try {
        const { user_id, project_id, bug_id } = req.body;
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
            `SELECT first_name || ' ' || last_name AS participant, participant_type
            FROM Participant P, Users U
            WHERE project_id = $1 AND P.user_id = U.user_id`,
            [project_id]
        );

        res.json(participants.rows);
    } catch (err) {
        console.error(err.message);
    }

});

// get a specific bug
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
            WHERE project_id = $1 AND bug_id = $2`,
            [project_id, bug_id]
        );

        res.json(logs.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// update user first and last name
app.patch("/api/users/:user_id/name", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { first_name, last_name } = req.body;
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

// update user profile picture <<<<<<<<<<<<<<<<<<<< NOT DONE

// update user email
app.patch("/api/users/:user_id/email", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { email } = req.body;

        const usersWithSameEmail = await pool.query(
            `SELECT user_id 
            FROM Users 
            WHERE email = $1`,
            [email]
        );

        if (usersWithSameEmail.rowCount === 0) {
            await pool.query(
                `UPDATE Users 
                SET email = $1 
                WHERE user_id = $2`,
                [email, user_id]
            );

            res.send("User Email Updated");
        } else {
            res.send("User Email Already Exists");
        }
    } catch (err) {
        console.error(err.message);
    }
});

// update bug
app.patch("/api/projects/:project_id/bugs/:bug_id", async (req, res) => {
    try {
        const { project_id, bug_id } = req.params;
        const { atr_key, atr_value } = req.body;

        if (atr_key === "bug_id" || atr_key === "project_id") {
            res.send("CANNOT UPDATE AN ID");
            return;
        }

        await pool.query(
            `UPDATE Bug 
            SET $1 = $2 
            WHERE project_id = $3 AND bug_id = $4`,
            [atr_key, atr_value, project_id, bug_id]
        );

        res.send(`Bug ${atr_key} Updated`);
    } catch (err) {
        console.error(err.message);
    }
});

// update project name
app.patch("/api/projects/:project_id", async (req, res) => {
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
app.delete("/api/projects/:project_id/bugs/bug_id", async (req, res) => {
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
app.delete("/api/projects/:project_id/participants/:user_id", async (req, res) => {
    try {
        const { project_id, user_id } = req.params;

        await pool.query(
            `DELETE FROM Participant 
            WHERE project_id = $1 AND user_id = $2`,
            [project_id, user_id]
        );

        res.send("Participant Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// delete invite
app.delete("/api/projects/:project_id/invites/:user_id", async (req, res) => {
    try {
        const { project_id, user_id } = req.params;

        await pool.query(
            `DELETE FROM Invited 
            WHERE project_id = $1 AND user_id = $2`,
            [project_id, user_id]
        );

        res.send("Invite Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// delete assignment
app.delete("/api/projects/:project_id/bugs/:bug_id/users/:user_id/assignments", async (req, res) => {
    try {
        const { project_id, bug_id, user_id } = req.params;

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

// listen to calls made from the client side
app.listen(5000, () => {
    console.log("The database connection has started on port 5000");
});