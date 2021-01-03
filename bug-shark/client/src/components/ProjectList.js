import filterProjects from "../modules/filterProjects";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getProjects from "../modules/getProjects";
import getCompareFunction from "../modules/getCompareFunction";
import getViewStyle from "../modules/getViewStyle";

const ProjectList = ({ user_id, reload, filterProjectName, changeNumProjects, sortMethod, viewType }) => {
    const [projects, setProjects] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [numProjects, setNumProjects] = useState({
        total: 0,
        filteredTotal: 0
    });

    useEffect(() => {
        getProjects(user_id)
            .then(projects => {
                setProjects(projects);
                setNumProjects(prevState => {
                    return {
                        ...prevState,
                        total: projects.length
                    }
                });
            })

    }, [user_id, reload]);

    useEffect(() => {
        const filteredProjects = filterProjects(projects, filterProjectName);
        filteredProjects.sort(getCompareFunction(sortMethod));
        const { l1Style, l2Style, l3Style, l4Style, l5Style } = getViewStyle(viewType);
        const projectList = filteredProjects.map(project => {
            return (
                <div id="project-item" key={project.project_id} style={l1Style}>
                    <Link to={`/projects/${project.project_id}`}>
                        <div id="project-item-name-wrapper" style={l2Style}>
                            <h4 id="project-item-name" style={l3Style}>{project.project_name}</h4>
                        </div>
                        <div id="project-item-info-wrapper" style={l4Style}>
                            <h4 id="project-item-info" style={l5Style}>
                                {`Participants (${project.num_participants})`}
                            </h4>
                            <h4 id="project-item-info" style={l5Style}>
                                {`Active Bugs (${project.num_active_bugs})`}
                            </h4>
                        </div>
                    </Link>
                </div>
            );
        });

        setProjectList(projectList);
        setNumProjects(prevState => {
            return {
                ...prevState,
                filteredTotal: filteredProjects.length
            }
        });
    }, [projects, filterProjectName, sortMethod, viewType]);

    useEffect(() => {
        changeNumProjects(numProjects);
    }, [changeNumProjects, numProjects]);

    return (
        <div id="project-list">
            {projectList}
        </div>
    );
}

export default ProjectList;