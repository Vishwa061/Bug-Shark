import { Row, Col } from "reactstrap";

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

const getTodaysActiveBugsList = (todaysActiveBugs, project_name, isChecked) => {
    const todaysActiveBugsList = [];

    let numBugs = 0; // number of bugs without filters
    todaysActiveBugs.forEach(bugs => {
        bugs.forEach(bug => {
            numBugs++;
            if (projectNameFilter(project_name, bug.project_name) && severityFilter(isChecked, bug.severity)) {
                todaysActiveBugsList.push(
                    <Row key={bug.bug_id} id="home-bugs-rows">
                        <Col><h4 id="home-bugs">{bug.project_name}</h4></Col>
                        <Col><h4 id="home-bugs">{bug.severity}</h4></Col>
                        <Col><h4 id="home-bugs">{bug.bug_id}</h4></Col>
                    </Row>
                )
            }
        })
    })

    return {
        todaysActiveBugsList: todaysActiveBugsList,
        numBugs: numBugs
    };
}

export default getTodaysActiveBugsList;