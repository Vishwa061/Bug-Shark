import React, { useState } from "react";
import Modal from "./Modal";
import updateProject from "../modules/updateProject";

const EditProjectNameModal = ({ project_id, prevName, submitBtnCallback, exitCallback }) => {
    const [project_name, setProject_name] = useState(prevName);

    const callUpdateProject = () => {
        if (project_name === prevName) {
            exitCallback();
            return;
        }

        updateProject(project_id, project_name)
            .then(() => {
                submitBtnCallback(project_name);
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
            title="Editing Project Name"
            submitBtnText="Save"
            submitBtnCallback={callUpdateProject}
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

export default EditProjectNameModal;