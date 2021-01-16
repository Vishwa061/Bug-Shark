const getDevelopers = async (project_id, bug_id) => {
    try {
        const fetchedDevs = await fetch(`/api/projects/${project_id}/bugs/${bug_id}/assignments`);
        const devs = await fetchedDevs.json();

        return devs;
    } catch (err) {
        console.error(err.message);
    }
}

export default getDevelopers;