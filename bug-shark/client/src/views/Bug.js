import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

const Bug = ({ user_id }) => {
    const { project_id, bug_id } = useParams();
    return (
        <Fragment>
            <h2>PROJECT ID: {project_id}</h2>
            <h2>BUG ID: {bug_id}</h2>
            <h2>THIS IS THE BUG PAGE</h2>
        </Fragment>
    );
}

export default Bug;