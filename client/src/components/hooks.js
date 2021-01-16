import { useState, useEffect } from "react";
import default_profile_picture from "../assets/images/default_profile_picture.png";

const INVALID_USER_ID = -1;

const useAuthLogic = (user) => {
    useEffect(() => {
        if (user !== undefined) {
            fetchUser(user);
        }
    }, [user]);

    const [user_id, setUser_id] = useState(INVALID_USER_ID);

    const fetchUser = async (user) => {
        try {
            const body = {
                email: user.email,
                first_name: user.given_name || user.email,
                last_name: user.family_name || ""
            };

            const fetchUser = await fetch(`/api/users`, {
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
        if (user_id !== INVALID_USER_ID) { // waits for user id to initialize
            fetchProfile(user_id);
        }
    }, [user_id]);

    const [profile, setProfile] = useState({});

    const fetchProfile = async (user_id) => {
        try {
            const fetchProfile = await fetch(`/api/users/${user_id}`);
            const profile = await fetchProfile.json();
            setProfile(profile);
        } catch (err) {
            console.error(err.message);
        }
    }

    const profile_picture = profile.has_profile_picture ?
        `/api/users/${user_id}/profile_picture` :
        default_profile_picture;

    return {
        profile: profile,
        profile_picture: profile_picture
    };
}

const useProjectRequest = (project_id) => {
    const [project, setProject] = useState({});

    useEffect(() => {
        getProject(project_id);
    }, [project_id]);

    const getProject = async (project_id) => {
        try {
            const fetchedProject = await fetch(`/api/projects/${project_id}`);
            const project = await fetchedProject.json();

            setProject(project);
        } catch (err) {
            console.error(err.message);
        }
    }

    return project;
}

export {
    useAuthLogic,
    useNavProfileRequest,
    useProjectRequest
};