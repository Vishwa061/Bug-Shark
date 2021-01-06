import React from "react";
import { Link } from "react-router-dom";
import settings_icon from "../assets/icons/settings_icon.png";

const SettingsBtn = ({ project_id, user_id }) => {
    return (
        <Link to={`/projects/${project_id}/settings`}>
            <img id="settings-btn" src={settings_icon} alt="" />
        </Link>
    );
}

export default SettingsBtn;