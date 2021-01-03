const projectNameFilter = (project_name, bug_project_name) => {
    return project_name === "" || project_name.toUpperCase() === bug_project_name.toUpperCase();
}

const severityFilter = ({ isLow, isMinor, isMajor, isCritical }, bugSeverity) => {
    const noneSelected = !(isLow || isMinor || isMajor || isCritical);

    if (noneSelected) {
        return true;
    }

    switch (bugSeverity) {
        case "LOW":
            return isLow;
        case "MINOR":
            return isMinor;
        case "MAJOR":
            return isMajor;
        case "CRITICAL":
            return isCritical;
        default: {
            console.error("INVALID BUG SEVERITY");
            return true;
        }
    }
}

const filterTodaysActiveBugs = (todaysActiveBugs, project_name, isChecked) => {
    return todaysActiveBugs.filter(bug =>
        projectNameFilter(project_name, bug.project_name)
        && severityFilter(isChecked, bug.severity)
    );
}

export default filterTodaysActiveBugs;