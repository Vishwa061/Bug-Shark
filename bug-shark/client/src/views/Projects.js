import React, { useState } from "react";
import Button from "../components/Button";
import Search from "../components/Search";
import plus_icon from "../assets/icons/plus_icon.png";
import join_icon from "../assets/icons/join_icon.png";
import DropDown from "../components/DropDown";
import GalleryViewIcon from "../components/GalleryViewIcon";
import ListViewIcon from "../components/ListViewIcon";
import ProjectList from "../components/ProjectList";
import CreateProjectModal from "../components/CreateProjectModal";
import JoinProjectModal from "../components/JoinProjectModal";

const Projects = ({ user_id }) => {
    const [project_name, setProject_name] = useState("");
    const onSearch = (project_name) => {
        setProject_name(project_name);
    }

    const [numProjects, setNumProjects] = useState({
        total: 0,
        filteredTotal: 0
    });
    const changeNumProjects = (numProjects) => {
        setNumProjects(numProjects);
    }

    const [sortMethod, setSortMethod] = useState("Name");
    const changeSortMethod = (option) => {
        setSortMethod(option);
        console.log(option);
    }

    const [viewType, setViewType] = useState("gallery");
    const changeViewType = (type) => {
        setViewType(type);
        console.log(type);
    }

    const [showCreate, setShowCreate] = useState(false);
    const toggleShowCreate = () => {
        setShowCreate(prevState => !prevState);
    }

    const [showJoin, setShowJoin] = useState(false);
    const toggleShowJoin = () => {
        setShowJoin(prevState => !prevState);
    }

    const [reloadProjectList, setReloadProjectList] = useState(false);
    const callReloadProjectList = () => {
        setReloadProjectList(prevState => !prevState);
    }

    const noProjects = numProjects.total === 0;

    return (
        <div id="projects">
            {showCreate &&
                <CreateProjectModal
                    user_id={user_id}
                    submitBtnCallback={callReloadProjectList}
                    exitCallback={toggleShowCreate}
                />
            }
            {showJoin &&
                <JoinProjectModal
                    user_id={user_id}
                    submitBtnCallback={callReloadProjectList}
                    exitCallback={toggleShowJoin}
                />
            }
            <div id="projects-content-1">
                <Search id="projects-search" onSearch={onSearch} input_id="projects-search-input" />
                <div id="create-join-wrapper">
                    <div id="create-join">
                        <Button
                            id="projects-btn-container"
                            buttonText="Join"
                            icon={join_icon}
                            onClick={toggleShowJoin}
                        />
                        <Button
                            id="projects-btn-container"
                            buttonText="Create"
                            icon={plus_icon}
                            onClick={toggleShowCreate}
                        />
                    </div>
                </div>
            </div>
            <div id="projects-content-2">
                <h4 id="projects-content-2-num-projects">
                    {noProjects ?
                        "No projects" :
                        `Showing ${numProjects.filteredTotal} of ${numProjects.total} projects`
                    }
                </h4>
                <div id="projects-content-2-options-wrapper">
                    <div id="projects-content-2-options">
                        <DropDown
                            text="Sort By:"
                            id="project-sort-dropdown"
                            defaultOption="Name"
                            options={["Name", "Participants", "Bugs"]}
                            callback={changeSortMethod}
                        />
                        <GalleryViewIcon onClick={changeViewType} isSelected={viewType === "gallery"} />
                        <ListViewIcon onClick={changeViewType} isSelected={viewType === "list"} />
                    </div>
                </div>
            </div>
            <div id="project-content-3">
                <ProjectList
                    user_id={user_id}
                    reload={reloadProjectList}
                    filterProjectName={project_name}
                    sortMethod={sortMethod}
                    changeNumProjects={changeNumProjects}
                    viewType={viewType}
                />
                {/* projects in gallery view */}
                {/* projects in list view */}
            </div>
        </div>
    );
}

export default Projects;