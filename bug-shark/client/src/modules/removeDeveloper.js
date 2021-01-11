const removeDeveloper = async (email, project_id, bug_id) => {
    try {
        await fetch(`http://localhost:5000/api/projects/${project_id}/bugs/${bug_id}/users/${email}/assignments`, {
            method: "DELETE"
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default removeDeveloper;