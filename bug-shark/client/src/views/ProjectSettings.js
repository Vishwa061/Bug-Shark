import React, { useState } from "react";
import back_arrow_icon from "../assets/icons/back_arrow_icon.png";
import { Link, useHistory } from "react-router-dom";
import EditButton from "../components/EditButton";
import Button from "../components/Button";
import InviteList from "../components/InviteList";
import EditProjectNameModal from "../components/EditProjectNameModal";
import RemoveInvitesModal from "../components/RemoveInvitesModal";
import deleteProject from "../modules/deleteProject";

const OWNER = 2;

const ProjectSettings = ({ props }) => {
    const project_id = props.match.params.project_id;
    const participant_type = props.location.participant_type;
    const history = useHistory();

    const [projectName, setProjectName] = useState(props.location.project_name);
    const [showEditProjectNameModal, setShowEditProjectNameModal] = useState(false);
    const [showRemoveInvitesModal, setShowRemoveInvitesModal] = useState(false);
    const [reloadInvites, setReloadInvites] = useState(false);

    const handleProjectDelete = () => {
        deleteProject(project_id)
            .then(() => {
                history.push("/projects");
            });
    }

    return (
        <>
            {showRemoveInvitesModal &&
                <RemoveInvitesModal
                    project_id={project_id}
                    submitBtnCallback={() => setReloadInvites(prevState => !prevState)}
                    exitCallback={() => setShowRemoveInvitesModal(false)}
                />
            }
            {showEditProjectNameModal &&
                <EditProjectNameModal
                    project_id={project_id}
                    prevName={projectName}
                    submitBtnCallback={(newProjectName) => setProjectName(newProjectName)}
                    exitCallback={() => setShowEditProjectNameModal(false)}
                />
            }
            <div id="project-settings">
                <Link to={`/projects/${project_id}`}>
                    <img id="back-button" src={back_arrow_icon} alt="" />
                </Link>
                <h1 id="settings-project-name">{projectName}</h1>
                {(participant_type === OWNER) &&
                    <EditButton
                        id="edit-project-name-btn"
                        size="3vw"
                        onClick={() => setShowEditProjectNameModal(true)}
                    />
                }
                <h2 id="settings-project-id">Project ID: {project_id}</h2>
                {(participant_type === OWNER) &&
                    <Button
                        id="delete-project-btn"
                        buttonText="Delete Project"
                        onClick={handleProjectDelete}
                    />
                }
                <h2 id="invites-title">Invites</h2>
                <EditButton
                    id="edit-invites-btn"
                    size="2.5vw"
                    onClick={() => setShowRemoveInvitesModal(true)}
                />
                <InviteList project_id={project_id} reload={reloadInvites} />
            </div>
        </>
    );
}

export default ProjectSettings;