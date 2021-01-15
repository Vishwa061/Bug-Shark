import React, { useState } from "react";
import Modal from "./Modal";
import updateGender from "../modules/updateGender";

const EditGenderModal = ({ user_id, prevGender, submitBtnCallback, exitCallback }) => {
    const [gender, setGender] = useState(prevGender);

    const callUpdateGender = () => {
        if (gender === prevGender || gender.length > 12) {
            exitCallback();
            return;
        }

        updateGender(user_id, gender)
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
            title="Editing Your Gender"
            submitBtnText="Save"
            submitBtnCallback={callUpdateGender}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <h2 style={promptStyle}>Gender:</h2>
                <input
                    id="edit-name-modal-input-1"
                    type="text"
                    placeholder="Enter Gender..."
                    defaultValue={prevGender}
                    onInput={e => setGender(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default EditGenderModal;