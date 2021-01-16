import React, { useState } from "react";
import back_arrow_icon from "../assets/icons/back_arrow_icon.png";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Button from "../components/Button";
import ParticipantList from "../components/ParticipantList";
import EditParticipantModal from "../components/EditParticipantModal";
import RemoveParticipantModal from "../components/RemoveParticipantModal";

const OWNER = 2;
const MANAGER = 1;

const ProjectParticipants = ({ props, user_id }) => {
    const project_id = props.match.params.project_id;
    const participant_type = props.location.participant_type;
    const project_name = props.location.project_name;

    const [totalParticipants, setTotalParticipants] = useState(0);
    const [numParticipants, setNumParticipants] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [showEditParticipantModal, setShowEditParticipantModal] = useState(false);
    const [showRemoveParticipantModal, setShowRemoveParticipantModal] = useState(false);
    const [reloadParticipants, setReloadParticipants] = useState(false);

    return (
        <>
            {showRemoveParticipantModal &&
                <RemoveParticipantModal
                    project_id={project_id}
                    participant_type={participant_type}
                    submitBtnCallback={() => setReloadParticipants(prevState => !prevState)}
                    exitCallback={() => setShowRemoveParticipantModal(false)}
                />
            }
            {showEditParticipantModal &&
                <EditParticipantModal
                    project_id={project_id}
                    user_id={user_id}
                    submitBtnCallback={() => setReloadParticipants(prevState => !prevState)}
                    exitCallback={() => setShowEditParticipantModal(false)}
                />
            }
            <div id="participants">
                <Link to={`/projects/${project_id}`}>
                    <img id="back-button" src={back_arrow_icon} alt="" />
                </Link>
                <h1 id="participants-project-name">{project_name}</h1>
                {(participant_type >= MANAGER) &&
                    <Button
                        id="remove-participant-btn"
                        buttonText="Remove Participant"
                        onClick={() => setShowRemoveParticipantModal(true)}
                    />
                }
                {(participant_type === OWNER) &&
                    <Button
                        id="edit-permissions-btn"
                        buttonText="Edit Permissions"
                        onClick={() => setShowEditParticipantModal(true)}
                    />
                }
                <div>
                    <Search
                        id="partcipants-search"
                        input_id="partcipants-search-input"
                        onSearch={(input) => setSearchInput(input)}
                        placeholder="Search Name..."
                    />
                </div>
                <h4 id="num-of-participants">Showing {numParticipants} of {totalParticipants} participants</h4>
                <ParticipantList
                    project_id={project_id}
                    setTotalParticipants={(n) => setTotalParticipants(n)}
                    setNumParticipants={(n) => setNumParticipants(n)}
                    searchInput={searchInput}
                    reload={reloadParticipants}
                />
            </div>
        </>
    );
}

export default ProjectParticipants;