import React, { useState } from "react";
import Modal from "./Modal";
import deleteInvite from "../modules/deleteInvite";

const RemoveInvitesModal = ({ project_id, submitBtnCallback, exitCallback }) => {
    const [email, setEmail] = useState("");

    const callDeleteInvite = () => {
        deleteInvite(project_id, email)
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
            title="Removing an Invite"
            submitBtnText="Remove"
            submitBtnCallback={callDeleteInvite}
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

export default RemoveInvitesModal;