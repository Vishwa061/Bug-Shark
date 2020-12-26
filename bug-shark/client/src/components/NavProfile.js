import React, { useState, useEffect } from "react";
import default_profile_picture from "../assets/images/default_profile_picture.png";

const NavProfile = () => {
    useEffect(() => {
        fetchProfile();
    }, []);

    const [profile, setProfile] = useState({});

    const fetchProfile = async () => {
        try {
            const fetchProfile = await fetch(`http://localhost:5000/api/users/${sessionStorage.getItem("user_id")}`);
            const profile = (await fetchProfile.json())[0];
            setProfile(profile);
        } catch (err) {
            console.error(err.message);
        }
    }

    const profile_picture = profile.has_profile_picture ?
        `http://localhost:5000/api/users/${sessionStorage.getItem("user_id")}/profile_picture` :
        default_profile_picture;

    return (
        <div id="profile">
            <img src={profile_picture} alt="Profile" id="nav-profile-picture" />
            <h4 id="nav-profile-name">{`${profile.first_name} ${profile.last_name}`}</h4>
        </div>
    );
}

export default NavProfile;