import React, { useState } from "react";
import Modal from "./Modal";
import updateName from "../modules/updateName";

const EditNameModal = ({ user_id, prevFname, prevLname, submitBtnCallback, exitCallback }) => {
    const [first_name, setFirst_Name] = useState(prevFname);
    const [last_name, setLast_Name] = useState(prevLname);

    const callUpdateName = () => {
        if ((first_name === prevFname && last_name === prevLname) || first_name.length > 25 || last_name.length > 25) {
            exitCallback();
            return;
        }

        updateName(user_id, first_name, last_name)
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
            title="Editing Your Name"
            submitBtnText="Save"
            submitBtnCallback={callUpdateName}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <h2 style={promptStyle}>First Name:</h2>
                <input
                    id="edit-name-modal-input-1"
                    type="text"
                    placeholder="Enter First Name..."
                    defaultValue={prevFname}
                    onInput={e => setFirst_Name(e.target.value)}
                />
            </div>
            <div>
                <div style={containerStyle}>
                    <h2 style={promptStyle}>Last Name:</h2>
                    <input
                        id="edit-name-modal-input-2"
                        type="text"
                        placeholder="Enter Last Name..."
                        defaultValue={prevLname}
                        onInput={e => setLast_Name(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default EditNameModal;