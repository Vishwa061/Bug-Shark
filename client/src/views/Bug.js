import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import back_arrow_icon from "../assets/icons/back_arrow_icon.png";
import LogList from "../components/LogList";
import getBug from "../modules/getBug";
import { parseBugStatus, parseReportedDate, parseDateToTime } from "../utils/parseFunctions";
import EditButton from "../components/EditButton";
import EditBugModal from "../components/EditBugModal";
import EditSeverityModal from "../components/EditSeverityModal";
import EditStatusModal from "../components/EditStatusModal";
import DevList from "../components/DevList";
import plus_icon from "../assets/icons/plus_icon.png";
import deleteBug from "../modules/deleteBug";
import getNotification from "../modules/getNotification";
import enableNotifications from "../modules/enableNotifications";
import disableNotifications from "../modules/disableNotifications";
import AssignDevsModal from "../components/AssignDevsModal";
import RemoveDevsModal from "../components/RemoveDevsModal";

const MANAGER = 1;

const Bug = ({ props, user_id }) => {
    const project_id = props.match.params.project_id;
    const bug_id = props.match.params.bug_id;
    const project_name = props.location.project_name;
    const participant_type = props.location.participant_type;
    const history = useHistory();

    const [bug, setBug] = useState({});
    const [reloadLogs, setReloadLogs] = useState(false);
    const [reloadDevs, setReloadDevs] = useState(false);
    const [areNotificationsEnabled, setAreNotificationsEnabled] = useState(false);
    const [showEditBugModal, setShowEditBugModal] = useState(false);
    const [editBugModalState, setEditBugModalState] = useState({ type: "", prompt: "", prevValue: "" });
    const [showEditSeverityModal, setShowEditSeverityModal] = useState(false);
    const [showEditStatusModal, setShowEditStatusModal] = useState(false);
    const [showAssignDevsModal, setShowAssignDevsModal] = useState(false);
    const [showRemoveDevsModal, setShowRemoveDevsModal] = useState(false);
    const [numDevs, setNumDevs] = useState(0);

    useEffect(() => {
        getBug(project_id, bug_id)
            .then(bug => {
                setBug(bug);
            });

    }, [project_id, bug_id, reloadLogs]);

    useEffect(() => {
        getNotification(project_id, bug_id, user_id)
            .then(isEnabled => {
                setAreNotificationsEnabled(isEnabled);
            });

    }, [project_id, bug_id, user_id]);

    const toggleNotifications = () => {
        if (areNotificationsEnabled) {
            disableNotifications(user_id, project_id, bug_id)
                .then(() => {
                    setAreNotificationsEnabled(false);
                });
        } else {
            enableNotifications(user_id, project_id, bug_id)
                .then(() => {
                    setAreNotificationsEnabled(true);
                });
        }
    }

    const changeError = () => {
        setEditBugModalState({
            type: "error",
            prompt: "What went wrong?",
            prevValue: bug.error
        });
        setShowEditBugModal(true);
    }

    const changeReproduce = () => {
        setEditBugModalState({
            type: "reproduce",
            prompt: "What are the steps to reproduce it?",
            prevValue: bug.reproduce
        });
        setShowEditBugModal(true);
    }

    const changeWorkaround = () => {
        setEditBugModalState({
            type: "workaround",
            prompt: "What's a temporary solution?",
            prevValue: bug.workaround
        });
        setShowEditBugModal(true);
    }

    const changeSolution = () => {
        setEditBugModalState({
            type: "solution",
            prompt: "What's a permanent solution?",
            prevValue: bug.solution
        });
        setShowEditBugModal(true);
    }

    return (
        <>
            {showRemoveDevsModal &&
                <RemoveDevsModal
                    project_id={project_id}
                    bug_id={bug_id}
                    submitBtnCallback={() => setReloadDevs(prevState => !prevState)}
                    exitCallback={() => setShowRemoveDevsModal(false)}
                />
            }
            {showAssignDevsModal &&
                <AssignDevsModal
                    project_id={project_id}
                    bug_id={bug_id}
                    submitBtnCallback={() => setReloadDevs(prevState => !prevState)}
                    exitCallback={() => setShowAssignDevsModal(false)}
                />
            }
            {showEditBugModal &&
                <EditBugModal
                    type={editBugModalState.type}
                    user_id={user_id}
                    project_id={project_id}
                    bug_id={bug_id}
                    prompt={editBugModalState.prompt}
                    prevValue={editBugModalState.prevValue}
                    submitBtnCallback={() => setReloadLogs(prevState => !prevState)}
                    exitCallback={() => setShowEditBugModal(false)}
                />
            }
            {showEditSeverityModal &&
                <EditSeverityModal
                    user_id={user_id}
                    project_id={project_id}
                    bug_id={bug_id}
                    prevValue={bug.severity}
                    submitBtnCallback={() => setReloadLogs(prevState => !prevState)}
                    exitCallback={() => setShowEditSeverityModal(false)}
                />
            }
            {showEditStatusModal &&
                <EditStatusModal
                    user_id={user_id}
                    project_id={project_id}
                    bug_id={bug_id}
                    prevValue={bug.bug_status}
                    submitBtnCallback={() => setReloadLogs(prevState => !prevState)}
                    exitCallback={() => setShowEditStatusModal(false)}
                />
            }
            <div id="bug">
                <div id="bug-content-1">
                    <Link to={`/projects/${project_id}`}>
                        <img id="back-button" src={back_arrow_icon} alt="" />
                    </Link>
                    <h1 id="bug-project-name">{project_name}</h1>
                    <h2 id="bug-bug-id">Bug ID: {bug_id}</h2>
                    <div id="bug-content-1-right-btns">
                        <div id="delete-bug-btn-wrapper">
                            <button
                                id="delete-bug-btn"
                                onClick={() =>
                                    deleteBug(project_id, bug_id)
                                        .then(() => history.push(`/projects/${project_id}`))
                                }
                            >
                                Delete Bug
                            </button>
                        </div>
                        <button
                            id="toggle-notifications-btn"
                            onClick={toggleNotifications}
                        >
                            {areNotificationsEnabled ? "Disable" : "Enable"} Notifications
                        </button>

                    </div>
                </div>
                <div id="bug-main-content">
                    <div id="bug-content-2">
                        <div id="bug-content-severity">
                            <h2 id="bug-severity-title">Severity</h2>
                            <h2 id="bug-severity-text">{bug.severity}</h2>
                            <EditButton id="edit-bug" size="2vw" onClick={() => setShowEditSeverityModal(true)} />
                        </div>
                        <div id="bug-content-status">
                            <h2 id="bug-status-title">Status</h2>
                            <h2 id="bug-status-text">{parseBugStatus(bug.bug_status)}</h2>
                            <EditButton id="edit-bug" size="2vw" onClick={() => setShowEditStatusModal(true)} />
                        </div>
                        <div id="bug-content-reported">
                            <div id="bug-reported-wrapper">
                                <h2 id="bug-reported-title">Reported</h2>
                                <div id="bug-reported-text-wrapper">
                                    <h2 id="bug-reported-text">(EST)</h2>
                                    <h2 id="bug-reported-text">{parseReportedDate(bug.reported)}</h2>
                                    <h2 id="bug-reported-text">{parseDateToTime(bug.reported)}</h2>
                                </div>
                            </div>
                        </div>
                        <div id="bug-content-reporter">
                            <h2 id="bug-reporter-title">Reporter</h2>
                            <h2 id="bug-reporter-text">{bug.reporter}</h2>
                        </div>
                        <div id="bug-content-error">
                            <h2 id="bug-error-title">What went wrong</h2>
                            <EditButton id="edit-bug-2" size="2vw" onClick={changeError} />
                            <div id="bug-error-text">
                                {
                                    (bug.error === "" || bug.error === null) ?
                                        "Does Not Exist" : bug.error
                                }
                            </div>
                        </div>
                        <div id="bug-content-reproduce">
                            <h2 id="bug-reproduce-title">Steps to reproduce it</h2>
                            <EditButton id="edit-bug-2" size="2vw" onClick={changeReproduce} />
                            <div id="bug-reproduce-text">
                                {
                                    (bug.reproduce === "" || bug.reproduce === null) ?
                                        "Does Not Exist" : bug.reproduce
                                }
                            </div>
                        </div>
                        <div id="bug-content-workaround">
                            <h2 id="bug-workaround-title">Workaround</h2>
                            <EditButton id="edit-bug-2" size="2vw" onClick={changeWorkaround} />
                            <div id="bug-workaround-text">
                                {
                                    (bug.workaround === "" || bug.workaround === null) ?
                                        "Does Not Exist" : bug.workaround
                                }
                            </div>
                        </div>
                    </div>
                    <div id="bug-content-3">
                        <div>
                            <h1 id="log-list-title">Logs</h1>
                            <LogList
                                reload={reloadLogs}
                                project_id={project_id}
                                bug_id={bug_id}
                            />
                            <div style={{ display: "inline-block", marginTop: "5vw" }}>
                                <h1 id="dev-list-title">Developers Assigned ({numDevs})</h1>
                                {(participant_type >= MANAGER) &&
                                    <>
                                        <img
                                            id="add-dev-icon"
                                            src={plus_icon}
                                            alt=""
                                            onClick={() => setShowAssignDevsModal(true)}
                                        />
                                        <EditButton id="edit-bug-devs" size="2vw" onClick={() => setShowRemoveDevsModal(true)} />
                                    </>
                                }
                            </div>
                            <DevList
                                project_id={project_id}
                                bug_id={bug_id}
                                reload={reloadDevs}
                                setNumDevs={setNumDevs}
                            />
                            <div id="bug-content-solution">
                                <h2 id="bug-solution-title">Solution</h2>
                                <EditButton id="edit-bug-2" size="2vw" onClick={changeSolution} />
                                <div id="bug-solution-text">
                                    {
                                        (bug.solution === "" || bug.solution === null) ?
                                            "Does Not Exist" : bug.solution
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Bug;