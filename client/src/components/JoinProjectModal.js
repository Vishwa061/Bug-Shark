import React, { useState } from "react";
import Modal from "./Modal";
import joinProject from "../modules/joinProject";

const INVALID_ID = -1;

const JoinProjectModal = ({ user_id, submitBtnCallback, exitCallback }) => {
    const [project_id, setProject_id] = useState(INVALID_ID);

    const joinNewProject = () => {
        joinProject(user_id, project_id)
            .then(() => {
                submitBtnCallback();
                exitCallback();
            });
    }

    const containerStyle = {
        position: "relative",
        display: "inline-block"
    }

    const promptStyle = {
        position: "relative",
        color: "white",
        fontSize: "3.5vw",
        float: "left"
    }

    return (
        <Modal
            title="Joining a Project"
            submitBtnText="Join Project"
            submitBtnCallback={joinNewProject}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <h2 style={promptStyle}>Project ID:</h2>
                <input
                    id="project-modal-input"
                    type="text"
                    placeholder="Enter ID..."
                    onInput={e => setProject_id(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default JoinProjectModal;