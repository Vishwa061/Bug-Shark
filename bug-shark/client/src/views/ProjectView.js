import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjectRequest } from "../components/hooks";
import plus_icon from "../assets/icons/plus_icon.png";
import SettingsBtn from "../components/SettingsBtn";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import Search from "../components/Search";
import BugList from "../components/BugList";
import InviteParticipantModal from "../components/InviteParticipantModal";
import ReportBugModal from "../components/ReportBugModal";
import getParticipantType from "../modules/getParticipantType";

const MANAGER = 1;

const ProjectView = ({ user_id }) => {
    const { project_id } = useParams();
    const { project_name, num_participants } = useProjectRequest(project_id);
    const [participant_type, setParticipant_type] = useState(0);

    const [numTotalBugs, setNumTotalBugs] = useState(0);
    const [numFilteredBugs, setNumFilteredBugs] = useState(0);

    const [searchOption, setSearchOption] = useState("Bug ID");
    const changeSearchOption = (option) => {
        setSearchOption(option);
    }

    const [searchInput, setSearchInput] = useState("");
    const changeSearchInput = (input) => {
        setSearchInput(input);
    }

    const [sortMethod, setSortMethod] = useState("Bug ID");
    const changeSortMethod = (option) => {
        setSortMethod(option);
    }

    const [bugType, setBugType] = useState("active");
    const changeBugType = () => {
        setBugType(prevState => (prevState === "active") ? "closed" : "active");
    }

    const options = (bugType === "active") ?
        ["Bug ID", "Severity", "Status", "Reported", "Reporter"] :
        ["Bug ID", "Severity", "Reported", "Reporter"];

    const [showInviteModal, setShowInviteModal] = useState(false);
    const changeShowInviteModal = () => {
        setShowInviteModal(prevState => !prevState);
    }
    const [showReportBugModal, setShowReportBugModal] = useState(false);
    const changeShowBugModal = () => {
        setShowReportBugModal(prevState => !prevState);
    }

    const [reloadBugList, setReloadBugList] = useState(false);
    const callReloadBugList = () => {
        setReloadBugList(prevState => !prevState);
    }

    useEffect(() => {
        getParticipantType(project_id, user_id)
            .then(participant_type => {
                setParticipant_type(participant_type);
            });
    }, [project_id, user_id]);

    return (
        <>
            {showInviteModal &&
                <InviteParticipantModal
                    project_id={project_id}
                    exitCallback={changeShowInviteModal}
                    participant_type={participant_type}
                />
            }
            {showReportBugModal &&
                <ReportBugModal
                    user_id={user_id}
                    project_id={project_id}
                    submitBtnCallback={callReloadBugList}
                    exitCallback={changeShowBugModal}
                />
            }
            <div id="project-view">
                <div id="project-view-content">
                    <div id="project-view-content-1">
                        <div id="project-name-settings-wrapper">
                            <h1 id="project-view-name">{project_name}</h1>
                            {(participant_type >= MANAGER) &&
                                <SettingsBtn
                                    project_id={project_id}
                                    participant_type={participant_type}
                                    project_name={project_name}
                                />
                            }
                        </div>
                        <h5 id="project-view-project-id">Project ID: {project_id}</h5>
                        <Link
                            to={{
                                pathname: `/projects/${project_id}/participants`,
                                participant_type: participant_type,
                                project_name: project_name
                            }}
                        >
                            <Button
                                id="participants-btn"
                                buttonText={`Participants (${num_participants})`}
                            />
                        </Link>
                        <h3 id="project-view-num-bugs">
                            Showing {numFilteredBugs} of {numTotalBugs} {bugType} bugs
                    </h3>
                    </div>
                    <div id="project-view-content-2">
                        {(participant_type >= MANAGER) &&
                            <Button
                                id="project-view-invite-btn"
                                buttonText="Invite New Participant"
                                icon={plus_icon}
                                onClick={changeShowInviteModal}
                            />
                        }
                        <DropDown
                            text="Search By:"
                            id="project-view-search-dropdown"
                            defaultOption="Bug ID"
                            options={options}
                            callback={changeSearchOption}
                        />
                        <div id="project-view-search-wrapper">
                            <Search
                                id="project-view-search"
                                onSearch={changeSearchInput}
                                input_id="project-view-search-input"
                                placeholder={`Search ${searchOption}...`}
                            />
                        </div>
                    </div>
                    <div id="project-view-content-3">
                        <Button
                            id="project-view-report-btn"
                            buttonText="Report Bug"
                            icon={plus_icon}
                            onClick={changeShowBugModal}
                        />
                        <div>
                            <DropDown
                                text="Sort By:"
                                id="project-view-sort-dropdown"
                                defaultOption="Bug ID"
                                options={options}
                                callback={changeSortMethod}
                            />
                        </div>
                        <div>
                            <Button
                                id="project-view-active-closed-btn"
                                buttonText={`${(bugType === "active") ? "Closed" : "Active"} Bugs`}
                                onClick={changeBugType}
                            />
                        </div>
                    </div>
                </div>
                <div id="project-view-bugs">
                    <BugList
                        project_name={project_name}
                        project_id={project_id}
                        bugType={bugType}
                        filter={{ searchOption: searchOption, searchInput: searchInput }}
                        sortMethod={sortMethod}
                        setNumTotalBugs={setNumTotalBugs}
                        setNumFilteredBugs={setNumFilteredBugs}
                        reloadBugList={reloadBugList}
                        participant_type={participant_type}
                    />
                </div>
            </div>
        </>
    );
}

export default ProjectView;