const getBug = async (project_id, bug_id) => {
    try {
        const fetchedBug = await fetch(`http://localhost:5000/api/projects/${project_id}/bugs/${bug_id}`);
        const bug = await fetchedBug.json();

        return bug[0];
    } catch (err) {
        console.error(err.message);
    }
}

export default getBug;