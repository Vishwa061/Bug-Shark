const updateParticipantType = async (project_id, email, participant_type, owner_id) => {
    try {
        const body = {
            participant_type: participant_type,
            owner_id: owner_id
        }

        await fetch(`/api/projects/${project_id}/participants/${email.toLowerCase()}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err.message);
    }
}

export default updateParticipantType;