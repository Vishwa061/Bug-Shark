const createBug = async (project_id, severity, error, user_id, reproduce) => {
    try {
        const body = {
            project_id: project_id,
            severity: severity,
            error: error,
            user_id: user_id,
            reproduce: reproduce
        }

        await fetch("http://localhost:5000/api/bugs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default createBug;