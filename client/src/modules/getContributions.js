const getContributions = async (user_id) => {
    try {
        const fetchedContributions = await fetch(`/api/users/${user_id}/contributions`);
        const contributions = await fetchedContributions.json();

        return contributions;
    } catch (err) {
        console.error(err.message);
    }
}

export default getContributions;