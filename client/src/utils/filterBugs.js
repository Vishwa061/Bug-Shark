
import { parseBugStatus, parseReportedDate } from "./parseFunctions"

const filterBySearchOption = (bug, { searchOption, searchInput }) => {
    switch (searchOption) {
        case "Bug ID":
            return `${bug.bug_id}`.includes(searchInput);
        case "Severity":
            return bug.severity.toUpperCase().includes(searchInput.toUpperCase());
        case "Status":
            return parseBugStatus(bug.bug_status).includes(searchInput.toUpperCase());
        case "Reported":
            return parseReportedDate(bug.reported).includes(searchInput);
        case "Reporter":
            return `${bug.reporter.toUpperCase()}`.includes(searchInput.toUpperCase());
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