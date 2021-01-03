const joinProject = async (user_id, project_id) => {
    try {
        const fetchedInvite = await fetch(`http://localhost:5000/api/projects/${project_id}/users/${user_id}/invites`);
        const invite = await fetchedInvite.json();

        if (invite.length === 0) { // if invite was not found
            return;
        }

        const body = {
            user_id: user_id,
            project_id: project_id,
            participant_type: invite[0].invite_type
        }

        await fetch(`http://localhost:5000/api/participants`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default joinProject;