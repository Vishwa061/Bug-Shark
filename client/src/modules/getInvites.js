const getInvites = async (project_id) => {
    try {
        const fetchedInvites = await fetch(`http://localhost:5000/api/projects/${project_id}/invites`);
        const invites = await fetchedInvites.json();

        return invites;
    } catch (err) {
        console.error(err.message);
    }
}

export default getInvites;