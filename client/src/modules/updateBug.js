const updateBug = async (project_id, bug_id, atr_key, atr_value) => {
    try {
        const body = {
            atr_key: atr_key,
            atr_value: atr_value
        }

        await fetch(`http://localhost:5000/api/projects/${project_id}/bugs/${bug_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err.message);
    }
}

export default updateBug;