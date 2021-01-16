const inviteParticipant = async (email, project_id, invite_type) => {
    try {
        const body = {
            email: email.toLowerCase(),
            project_id: project_id,
            invite_type: invite_type
        }

        await fetch(`/api/invites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default inviteParticipant;