const getProjects = async (user_id) => {
    try {
        const fetchedProjects = await fetch(`http://localhost:5000/api/users/${user_id}/projects`);
        const projects = await fetchedProjects.json();

        return projects;
    } catch (err) {
        console.error(err.message);
    }
}

export default getProjects;