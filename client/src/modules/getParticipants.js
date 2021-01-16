const getParticipants = async (project_id) => {
    try {
        const fetchedParticipants = await fetch(`/api/projects/${project_id}/participants`)
        const participants = await fetchedParticipants.json();

        return participants;
    } catch (err) {
        console.error(err.message);
    }
}

export default getParticipants;