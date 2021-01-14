const removeParticipant = async (project_id, email, participant_type) => {
    try {
        await fetch(`http://localhost:5000/api/projects/${project_id}/participants/${email.toLowerCase()}/who/${participant_type}`, {
            method: "DELETE"
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default removeParticipant;