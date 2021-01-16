import React, { useState } from "react";
import Modal from "./Modal";
import updateProfilePicture from "../modules/updateProfilePicture";

const ONE_MB = 1024 * 1024;

const EditProfilePictureModal = ({ user_id, submitBtnCallback, exitCallback }) => {
    const [profile_picture, setProfile_picture] = useState("");

    const callUpdateProfilePicture = () => {
        if (profile_picture.size > ONE_MB) {
            exitCallback();
            return;
        }

        updateProfilePicture(user_id, profile_picture)
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
            title="Editing Profile Picture"
            submitBtnText="Save"
            submitBtnCallback={callUpdateProfilePicture}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <h2 style={promptStyle}>Profile Picture: </h2>
                <input
                    id="select-profile-picture"
                    type="file"
                    name="profile_picture"
                    onChange={e => setProfile_picture(e.target.files[0])}
                    accept="image/png"
                />
            </div>
        </Modal>
    );
}

export default EditProfilePictureModal;