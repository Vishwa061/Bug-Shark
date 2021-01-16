const removeDeveloper = async (email, project_id, bug_id) => {
    try {
        await fetch(`/api/projects/${project_id}/bugs/${bug_id}/users/${email.toLowerCase()}/assignments`, {
            method: "DELETE"
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default removeDeveloper;