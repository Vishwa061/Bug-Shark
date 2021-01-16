import React, { useState } from "react";
import Modal from "./Modal";
import assignDeveloper from "../modules/assignDeveloper";

const AssignDevsModal = ({ project_id, bug_id, submitBtnCallback, exitCallback }) => {
    const [email, setEmail] = useState("");

    const callAssignDeveloper = () => {
        assignDeveloper(email, project_id, bug_id)
            .then(() => {
                submitBtnCallback();
                exitCallback();
            });
    }

    const containerStyle = {
        position: "relative",
        display: "inline-block",
        marginLeft: "5vw"
    }

    const promptStyle = {
        position: "relative",
        color: "white",
        fontSize: "3.5vw",
        float: "left"
    }

    return (
        <Modal
            title="Assigning a Developer"
            submitBtnText="Assign"
            submitBtnCallback={callAssignDeveloper}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <h2 style={promptStyle}>Email:</h2>
                <input
                    id="devs-modal-input"
                    type="text"
                    placeholder="Enter email..."
                    onInput={e => setEmail(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default AssignDevsModal;