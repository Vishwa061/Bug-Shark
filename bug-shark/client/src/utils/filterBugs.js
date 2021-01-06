const parseReportedDate = (sqlDate) => { // from standard sql date format to yyyy-mm-dd
    try {
        return new Date(sqlDate).toLocaleDateString("en-CA");
    }
    catch (err) {
        console.error(err.message);
    }
}

const parseBugStatus = (status) => {
    switch (status) {
        case 0:
            return "OPEN";
        case 1:
            return "IN PROGRESS";
        case 2:
            return "CLOSED";
        default: {
            console.error("INVALID BUG STATUS:", status);
            return "";
        }
    }
}

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

export {
    filterBugs,
    parseBugStatus,
    parseReportedDate
};