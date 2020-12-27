import { useState, useEffect } from "react";
import default_profile_picture from "../assets/images/default_profile_picture.png";

class Storage {
    static USER_ID = -1;
}

const useAuthLogic = (user) => {
    useEffect(() => {
        fetchUser(user);
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

const useNavProfileLogic = (user_id) => {
    useEffect(() => {
        if (user_id !== -1) { // waits for user id to initialize
            fetchProfile(user_id);
        }
    }, [user_id]);

    const [profile, setProfile] = useState({});

    const fetchProfile = async (user_id) => {
        try {
            const fetchProfile = await fetch(`http://localhost:5000/api/users/${user_id}`);
            const profile = (await fetchProfile.json())[0];
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

export { Storage, useAuthLogic, useNavProfileLogic };