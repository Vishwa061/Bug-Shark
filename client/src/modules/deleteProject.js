const deleteProject = async (project_id) => {
    try {
        await fetch(`/api/projects/${project_id}`, {
            method: "DELETE"
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default deleteProject;