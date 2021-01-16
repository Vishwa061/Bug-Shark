const deleteBug = async (project_id, bug_id) => {
    try {
        await fetch(`/api/projects/${project_id}/bugs/${bug_id}`, {
            method: "DELETE"
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default deleteBug;