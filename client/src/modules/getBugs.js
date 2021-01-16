const getBugs = async (project_id, bugType) => {
    try {
        const fetchedBugs = await fetch(`/api/projects/${project_id}/bugs-${bugType}`);
        const bugs = await fetchedBugs.json();

        return bugs;
    } catch (err) {
        console.error(err.message);
    }
}

export default getBugs;