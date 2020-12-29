import React from "react";
import { useNavProfileRequest } from "./hooks"

const NavProfile = (props) => {
    const { profile, profile_picture } = useNavProfileRequest(props.user_id);
    return (
        <div id="profile">
            <img src={profile_picture} alt="Profile" id="nav-profile-picture" />
            <h4 id="nav-profile-name">{`${profile.first_name} ${profile.last_name}`}</h4>
        </div>
    );
}

export default NavProfile;