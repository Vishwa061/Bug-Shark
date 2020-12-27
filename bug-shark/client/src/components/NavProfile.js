import React from "react";
import { useNavProfileLogic, useAuthLogic } from "./hooks"
import { useAuth0 } from "@auth0/auth0-react";

const NavProfile = () => {
    const { user } = useAuth0();
    const user_id = useAuthLogic(user); // YOU NEED TO GET THE USER_ID TO APP.JS
    const { profile, profile_picture } = useNavProfileLogic(user_id);

    return (
        <div id="profile">
            <img src={profile_picture} alt="Profile" id="nav-profile-picture" />
            <h4 id="nav-profile-name">{`${profile.first_name} ${profile.last_name}`}</h4>
        </div>
    );
}

export default NavProfile;