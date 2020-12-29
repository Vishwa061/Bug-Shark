import { useState, useEffect } from "react";
import default_profile_picture from "../assets/images/default_profile_picture.png";

const useAuthLogic = (user) => {
    useEffect(() => {
        if (user !== undefined) {
            fetchUser(user);
        }
    }, [user]);

    const [user_id, setUser_id] = useState(-1);

    const fetchUser = async (user) => {
        try {
            const body = {
                email: user.email,
                first_name: user.given_name,
                last_name: user.family_name
            };

            const fetchUser = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const userData = await fetchUser.json();

            setUser_id(userData.user_id);
        } catch (err) {
            console.log(err.message);
        }
    }

    return user_id;
}

const useNavProfileRequest = (user_id) => {
    useEffect(() => {
        if (user_id !== -1) { // waits for user id to initialize
            fetchProfile(user_id);
        }
    }, [user_id]);

    const [profile, setProfile] = useState({});

    const fetchProfile = async (user_id) => {
        try {
            const fetchProfile = await fetch(`http://localhost:5000/api/users/${user_id}`);
            const profile = await fetchProfile.json();
            setProfile(profile);
        } catch (err) {
            console.error(err.message);
        }
    }

    const profile_picture = profile.has_profile_picture ?
        `http://localhost:5000/api/users/${user_id}/profile_picture` :
        default_profile_picture;

    return {
        profile: profile,
        profile_picture: profile_picture
    };
}

const useTodaysActiveBugsRequest = (user_id) => {
    const [todaysActiveBugs, setTodaysActiveBugs] = useState([]);

    useEffect(() => {
        const fetchTodaysActiveBugs = async (user_id) => {
            try {
                const fetchedProjects = await fetch(`http://localhost:5000/api/users/${user_id}/projects`);
                const projects = await fetchedProjects.json();

                // getting all active bugs for each project
                await Promise.all(projects.map(async (project) => await fetchActiveBugs(project)))
                    .then((arrOfTodaysActiveBugsData) => {
                        let cc = [];
                        arrOfTodaysActiveBugsData.forEach(todaysActiveBugsData => cc = [...cc, todaysActiveBugsData]);
                        setTodaysActiveBugs(cc);
                    })
                    .catch((err) => console.error(err.message));

            } catch (err) {
                console.error(err.message);
            }
        }

        const fetchActiveBugs = async (project) => {
            try {
                const fetchedActiveBugs = await fetch(`http://localhost:5000/api/projects/${project.project_id}/bugs-active`);
                const activeBugs = await fetchedActiveBugs.json();

                const todaysActiveBugs = activeBugs.filter(bug => {
                    const reported = new Date(bug.reported);
                    const today = new Date();

                    return today.getFullYear() === reported.getFullYear()
                        && today.getMonth() === reported.getMonth()
                        && today.getDate() === reported.getDate();
                });

                const todaysActiveBugsData = todaysActiveBugs.map(bug => {
                    return {
                        project_name: project.project_name,
                        severity: bug.severity,
                        bug_id: bug.bug_id
                    };
                });

                return todaysActiveBugsData;
            } catch (err) {
                console.error(err.message);
            }
        }

        if (user_id !== -1) { // waits for user id to initialize
            fetchTodaysActiveBugs(user_id);
        }

    }, [user_id]);

    return todaysActiveBugs;
}

export { useAuthLogic, useNavProfileRequest, useTodaysActiveBugsRequest };