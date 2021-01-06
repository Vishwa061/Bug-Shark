const parseSeverity = (severity) => {
    switch (severity) {
        case "LOW":
            return 0;
        case "MINOR":
            return 1;
        case "MAJOR":
            return 2;
        case "CRITICAL":
            return 3;
        default: {
            console.error("INVALID SEVERITY");
            return -1;
        }
    }
}

const getCompareFunction = (sortMethod) => {
    switch (sortMethod) {
        case "Name":
            return function (a, b) { return a.project_name > b.project_name ? 1 : -1 }
        case "Participants":
            return function (a, b) { return a.num_participants > b.num_participants ? -1 : 1 }
        case "Bugs":
            return function (a, b) { return a.num_active_bugs > b.num_active_bugs ? -1 : 1 }
        case "Bug ID":
            return function (a, b) { return a.bug_id > b.bug_id ? -1 : 1 }
        case "Severity":
            return function (a, b) { return parseSeverity(a.severity) > parseSeverity(b.severity) ? -1 : 1 }
        case "Status":
            return function (a, b) { return a.bug_status > b.bug_status ? -1 : 1 }
        case "Reported":
            return function (a, b) { return a.reported > b.reported ? -1 : 1 }
        case "Reporter":
            return undefined;
        default: {
            console.error("INVALID SORT METHOD", sortMethod);
            return undefined; // default sort
        }
    }
}

export default getCompareFunction;