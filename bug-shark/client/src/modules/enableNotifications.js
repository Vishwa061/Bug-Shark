const enableNotifications = async (user_id, project_id, bug_id) => {
    try {
        const body = {
            user_id: user_id,
            project_id: project_id,
            bug_id: bug_id
        }

        await fetch("http://localhost:5000/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err.message);
    }
}

export default enableNotifications;