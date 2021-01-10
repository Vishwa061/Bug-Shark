const parseBugStatus = (status) => {
    switch (status) {
        case 0:
            return "OPEN";
        case 1:
            return "IN PROGRESS";
        case 2:
            return "CLOSED";
        default: {
            if (status !== undefined)
                console.error("INVALID BUG STATUS:", status);
            return "";
        }
    }
}

const reverseParseBugStatus = (status) => {
    switch (status) {
        case "OPEN":
            return 0;
        case "IN PROGRESS":
            return 1;
        case "CLOSED":
            return 2;
        default: {
            if (status !== undefined)
                console.error("INVALID BUG STATUS:", status);
            return "";
        }
    }
}

const parseSeverity = (severity) => {
    switch (severity.toUpperCase()) {
        case "LOW":
            return 0;
        case "MINOR":
            return 1;
        case "MAJOR":
            return 2;
        case "CRITICAL":
            return 3;
        default: {
            if (severity !== undefined)
                console.error("INVALID SEVERITY", severity);
            return -1;
        }
    }
}

const parseDateToTime = (sqlDate) => { // to HH:MM AM/PM
    const d = new Date(sqlDate);
    const format = (n) => (n < 10) ? `0${n}` : n; // to 2 digits
    const formatH = (h) => (h % 12) || 12; // to HH
    const period = (h) => (h < 12) ? "AM" : "PM";

    return `${formatH(d.getHours())}:${format(d.getMinutes())} ${period(d.getHours())}`;
}

const parseReportedDate = (sqlDate) => { // to YYYY-MM-DD
    return new Date(sqlDate).toLocaleDateString("en-CA");
}

export {
    parseReportedDate,
    parseBugStatus,
    parseSeverity,
    parseDateToTime,
    reverseParseBugStatus
}