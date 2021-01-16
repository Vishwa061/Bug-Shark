const getBug = async (project_id, bug_id) => {
    try {
        const fetchedBug = await fetch(`/api/projects/${project_id}/bugs/${bug_id}`);
        const bug = await fetchedBug.json();

        return bug[0];
    } catch (err) {
        console.error(err.message);
    }
}

export default getBug;