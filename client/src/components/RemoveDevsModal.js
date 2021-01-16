import React, { useState } from "react";
import Modal from "./Modal";
import removeDeveloper from "../modules/removeDeveloper";

const RemoveDevsModal = ({ project_id, bug_id, submitBtnCallback, exitCallback }) => {
    const [email, setEmail] = useState("");

    const callRemoveDeveloper = () => {
        removeDeveloper(email, project_id, bug_id)
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
            title="Removing a Developer"
            submitBtnText="Remove"
            submitBtnCallback={callRemoveDeveloper}
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

export default RemoveDevsModal;