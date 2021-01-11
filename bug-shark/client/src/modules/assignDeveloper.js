const assignDeveloper = async (email, project_id, bug_id) => {
    try {
        const body = {
            email: email,
            project_id: project_id,
            bug_id: bug_id
        }

        await fetch("http://localhost:5000/api/assignments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default assignDeveloper;