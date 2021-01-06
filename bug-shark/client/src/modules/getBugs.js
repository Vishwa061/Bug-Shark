const getBugs = async (project_id, bugType) => {
    try {
        const fetchedBugs = await fetch(`http://localhost:5000/api/projects/${project_id}/bugs-${bugType}`);
        const bugs = await fetchedBugs.json();

        return bugs;
    } catch (err) {
        console.error(err.message);
    }
}

export default getBugs;