const projectNameFilter = (filterProjectName, project_name) => {
    return filterProjectName === "" || filterProjectName.toUpperCase() === project_name.toUpperCase();
}

const filterProjects = (projects, filterProjectName) => {
    return projects.filter(project =>
        projectNameFilter(filterProjectName, project.project_name)
    );
}

export default filterProjects;