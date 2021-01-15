import React, { useState } from "react";
import { useNavProfileRequest } from "../components/hooks";
import default_profile_picture from "../assets/images/default_profile_picture.png";
import EditButton from "../components/EditButton";
import EditProfilePictureModal from "../components/EditProfilePictureModal";
import Button from "../components/Button";
import deleteProfilePicture from "../modules/deleteProfilePicture";
import EditNameModal from "../components/EditNameModal";
import EditGenderModal from "../components/EditGenderModal";
import ContributionList from "../components/ContributionList";

const Account = ({ user_id }) => {
    const { profile, profile_picture } = useNavProfileRequest(user_id);
    const [showEditProfilePictureModal, setShowEditProfilePictureModal] = useState(false);
    const [showEditNameModal, setShowEditNameModal] = useState(false);
    const [showEditGenderModal, setShowEditGenderModal] = useState(false);

    const handleDeleteProfilePicture = () => {
        deleteProfilePicture(user_id);
        window.location.reload();
    }

    return (
        <>
            {showEditGenderModal &&
                <EditGenderModal
                    user_id={user_id}
                    prevGender={profile.gender}
                    submitBtnCallback={() => window.location.reload()}
                    exitCallback={() => setShowEditGenderModal(false)}
                />
            }
            {showEditNameModal &&
                <EditNameModal
                    user_id={user_id}
                    prevFname={profile.first_name}
                    prevLname={profile.last_name}
                    submitBtnCallback={() => window.location.reload()}
                    exitCallback={() => setShowEditNameModal(false)}
                />
            }
            {showEditProfilePictureModal &&
                <EditProfilePictureModal
                    user_id={user_id}
                    submitBtnCallback={() => window.location.reload()}
                    exitCallback={() => setShowEditProfilePictureModal(false)}
                />
            }
            <div id="account">
                <div id="account-profile-picture-wrapper">
                    <img
                        id="account-profile-picture"
                        src={profile_picture}
                        alt={default_profile_picture}
                    />
                    <EditButton
                        id="edit-account-profile-picture"
                        size="3vw"
                        onClick={() => setShowEditProfilePictureModal(true)}
                    />
                    <Button
                        id="delete-profile-picture"
                        buttonText="Delete Profile Picture"
                        onClick={handleDeleteProfilePicture}
                    />
                </div>
                <div>
                    <h2 id="account-name">{`${profile.first_name} ${profile.last_name}`}</h2>
                    <EditButton
                        id="edit-account-name"
                        size="3vw"
                        onClick={() => setShowEditNameModal(true)}
                    />
                </div>
                <div>
                    <h3 id="account-gender">{`(${profile.gender || "Unknown"})`}</h3>
                    <EditButton
                        id="edit-account-gender"
                        size="2vw"
                        onClick={() => setShowEditGenderModal(true)}
                    />
                </div>
                <h2 id="account-contributions-title">Your Contributions</h2>
                <ContributionList user_id={user_id} />
            </div>
        </>
    );
}

export default Account;