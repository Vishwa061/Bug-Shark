import React from "react";
import { useParams } from "react-router-dom"

const ProjectView = ({ user_id }) => {
    const { project_id } = useParams();

    return (
        <div>
            <h1>THIS IS A PROJECT</h1>
            <h1>UserID: {user_id}</h1>
            <h1>ProjectID: {project_id}</h1>
        </div>
    );
}

export default ProjectView;