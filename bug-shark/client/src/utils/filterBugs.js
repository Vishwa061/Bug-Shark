
import { parseBugStatus, parseReportedDate } from "./parseFunctions"

const filterBySearchOption = (bug, { searchOption, searchInput }) => {
    switch (searchOption) {
        case "Bug ID":
            return bug.bug_id + "" === searchInput;
        case "Severity":
            return bug.severity.toUpperCase() === searchInput.toUpperCase();
        case "Status":
            return parseBugStatus(bug.bug_status) === searchInput.toUpperCase();
        case "Reported":
            return parseReportedDate(bug.reported) === searchInput;
        case "Reporter":
            return bug.reporter === searchInput;
        default: {
            console.error("INVALID BUG SEARCH OPTION:", searchOption);
            return true;
        }
    }
}

const filterBugs = (bugs, filter) => {
    if (filter.searchInput === "") {
        return bugs;
    }

    return bugs.filter(bug =>
        filterBySearchOption(bug, filter)
    );
}

export default filterBugs;