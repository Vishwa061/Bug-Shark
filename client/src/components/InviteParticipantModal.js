import React, { useState } from "react";
import DropDown from "./DropDown";
import Modal from "./Modal";
import inviteParticipant from "../modules/inviteParticipant";

const OWNER = 2;
const MANAGER = 1;
const DEVELOPER = 0;

const InviteParticipantModal = ({ project_id, exitCallback, participant_type }) => {
    const [email, setEmail] = useState("");
    const [inviteType, setInviteType] = useState(DEVELOPER);

    const callInviteParticipant = () => {
        inviteParticipant(email, project_id, inviteType)
            .then(() => {
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
            title="Inviting a New Participant"
            submitBtnText="Send Invite"
            submitBtnCallback={callInviteParticipant}
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
            {(participant_type === OWNER) &&
                <div style={containerStyle2}>
                    <h2 style={promptStyle2}>Invite Type:</h2>
                    <DropDown
                        text=""
                        id="invite-participant-modal-dropdown"
                        defaultOption="Developer"
                        options={["Developer", "Manager"]}
                        callback={type => setInviteType((type === "Manager") ? MANAGER : DEVELOPER)}
                    />
                </div>
            }
        </Modal>
    );
}

export default InviteParticipantModal;