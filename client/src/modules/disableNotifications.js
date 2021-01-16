const disableNotifications = async (user_id, project_id, bug_id) => {
    try {
        await fetch(`http://localhost:5000/api/projects/${project_id}/bugs/${bug_id}/users/${user_id}/notifications`, {
            method: "DELETE"
        });
    } catch (err) {
        console.error(err.message);
    }
}

export default disableNotifications;