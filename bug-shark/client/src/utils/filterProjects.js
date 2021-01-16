const projectNameFilter = (filterProjectName, project_name) => {
    return filterProjectName === "" || project_name.toUpperCase().includes(filterProjectName.toUpperCase());
}

const filterProjects = (projects, filterProjectName) => {
    return projects.filter(project =>
        projectNameFilter(filterProjectName, project.project_name)
    );
}

export default filterProjects;