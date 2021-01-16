import React, { useState } from "react";
import DropDown from "./DropDown";
import Modal from "./Modal";
import updateParticipantType from "../modules/updateParticipantType";

const MANAGER = 1;
const DEVELOPER = 0;

const EditParticipantModal = ({ project_id, user_id, submitBtnCallback, exitCallback }) => {
    const [email, setEmail] = useState("");
    const [participant_type, setParticipant_type] = useState(DEVELOPER);

    const callUpdateParticipantType = () => {
        updateParticipantType(project_id, email, participant_type, user_id)
            .then(() => {
                submitBtnCallback();
                exitCallback();
            });
    }

    const containerStyle1 = {
        position: "relative",
        display: "inline-block",
        marginLeft: "7vw"
    }

    const containerStyle2 = {
        position: "relative",
        marginLeft: "7vw",
        marginTop: "2vw"
    }

    const promptStyle1 = {
        position: "relative",
        color: "white",
        fontSize: "3.5vw",
        float: "left"
    }

    const promptStyle2 = {
        position: "relative",
        color: "white",
        fontSize: "3.5vw",
        float: "left"
    }

    return (
        <Modal
            title="Editing Participant Permissions"
            submitBtnText="Save"
            submitBtnCallback={callUpdateParticipantType}
            exitCallback={exitCallback}
        >

            <div style={containerStyle1}>
                <h2 style={promptStyle1}>Email:</h2>
                <input
                    id="invite-participant-modal-input"
                    type="text"
                    placeholder="Enter Email..."
                    onInput={e => setEmail(e.target.value)}
                    style={{ marginLeft: "1vw", bottom: "0.3vw" }}
                />
            </div>
            <div style={containerStyle2}>
                <h2 style={promptStyle2}>New Permission Level:</h2>
                <DropDown
                    text=""
                    id="invite-participant-modal-dropdown"
                    defaultOption="Developer"
                    options={["Developer", "Manager"]}
                    callback={type => setParticipant_type((type === "Manager") ? MANAGER : DEVELOPER)}
                />
            </div>

        </Modal>
    );
}

export default EditParticipantModal;