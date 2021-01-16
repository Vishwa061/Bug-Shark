const deleteInvite = async (project_id, email) => {
    try {
        await fetch(`/api/projects/${project_id}/invites/${email.toLowerCase()}`, {
            method: "DELETE"
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default deleteInvite;