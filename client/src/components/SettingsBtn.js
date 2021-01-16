import React from "react";
import { Link } from "react-router-dom";
import settings_icon from "../assets/icons/settings_icon.png";

const SettingsBtn = ({ project_id, participant_type, project_name }) => {
    return (
        <Link
            to={{
                pathname: `/projects/${project_id}/settings`,
                participant_type: participant_type,
                project_name: project_name
            }}
        >
            <img id="settings-btn" src={settings_icon} alt="" />
        </Link>
    );
}

export default SettingsBtn;