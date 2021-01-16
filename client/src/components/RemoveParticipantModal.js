import React, { useState } from "react";
import Modal from "./Modal";
import removeParticipant from "../modules/removeParticipant";

const RemoveParticipantModal = ({ project_id, participant_type, submitBtnCallback, exitCallback }) => {
    const [email, setEmail] = useState("");

    const callRemoveParticipant = () => {
        removeParticipant(project_id, email, participant_type)
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
            title="Removing a Participant"
            submitBtnText="Remove"
            submitBtnCallback={callRemoveParticipant}
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

export default RemoveParticipantModal;