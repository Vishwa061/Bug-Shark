const createProject = async (user_id, project_name) => {
    try {
        const body1 = {
            user_id: user_id,
            project_name: project_name
        }

        const fetchedProject = await fetch(`http://localhost:5000/api/projects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body1)
        });

        const projectData = await fetchedProject.json();

        const OWNER = 2;
        const body2 = {
            user_id: user_id,
            project_id: projectData.project_id,
            participant_type: OWNER
        }

        await fetch(`http://localhost:5000/api/participants`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body2)
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default createProject;