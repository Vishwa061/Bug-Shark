const updateProject = async (project_id, project_name) => {
    try {
        const body = {
            project_id: project_id,
            project_name: project_name
        }

        await fetch(`/api/projects/${project_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err.message);
    }
}

export default updateProject;