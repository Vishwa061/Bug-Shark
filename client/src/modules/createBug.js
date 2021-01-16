import createLog from "./createLog";
import { parseReportedDate, parseDateToTime } from "../utils/parseFunctions";

const createBug = async (project_id, severity, error, user_id, reproduce) => {
    try {
        const body = {
            project_id: project_id,
            severity: severity,
            error: error,
            user_id: user_id,
            reproduce: reproduce
        }

        const fetchedBugID = await fetch("http://localhost:5000/api/bugs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const bug_id = await fetchedBugID.json();

        const change = `${parseReportedDate(new Date())} ${parseDateToTime(new Date())}\nBug reported`;

        await createLog(user_id, project_id, bug_id, change);

    } catch (err) {
        console.error(err.message);
    }
}

export default createBug;