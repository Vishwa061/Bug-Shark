import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

const ProjectSettings = ({ user_id }) => {
    const { project_id } = useParams();
    return (
        <Fragment>
            <h2>PROJECT ID: {project_id}</h2>
            <h2>THIS IS THE PROJECT SETTINGS PAGE</h2>
        </Fragment>
    );
}

export default ProjectSettings;