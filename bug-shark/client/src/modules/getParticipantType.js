const getParticipantType = async (project_id, user_id) => {
    try {
        const fetchedParticipant = await fetch(`http://localhost:5000/api/projects/${project_id}/participants/${user_id}`);
        const participant_type = await fetchedParticipant.json();

        return participant_type;
    } catch (err) {
        console.error(err.message);
    }
}

export default getParticipantType;