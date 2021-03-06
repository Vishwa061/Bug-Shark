const getLogs = async (project_id, bug_id) => {
    try {
        const fetchedLogs = await fetch(`/api/projects/${project_id}/bugs/${bug_id}/logs`)
        const logs = await fetchedLogs.json();

        return logs;
    } catch (err) {
        console.error(err.message);
    }
}

export default getLogs;