import React, { useState } from "react";
import Modal from "./Modal";
import createProject from "../modules/createProject";

const CreateProjectModal = ({ user_id, submitBtnCallback, exitCallback }) => {
    const [project_name, setProject_name] = useState("");

    const createNewProject = () => {
        createProject(user_id, project_name)
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
            title="Creating a New Project"
            submitBtnText="Create Project"
            submitBtnCallback={createNewProject}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <h2 style={promptStyle}>Project Name:</h2>
                <input
                    id="project-modal-input"
                    type="text"
                    placeholder="Enter Name..."
                    onInput={e => setProject_name(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default CreateProjectModal;