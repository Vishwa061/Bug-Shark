const createLog = async (user_id, project_id, bug_id, change) => {
    try {
        const body = {
            user_id: user_id,
            project_id: project_id,
            bug_id: bug_id,
            change: change
        }

        await fetch("/api/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err.message);
    }
}

export default createLog;