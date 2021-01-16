const getTodaysActiveBugs = async (user_id) => {
    try {
        const fetchedBugs = await fetch(`/api/users/${user_id}/bugs-active`);
        const bugs = await fetchedBugs.json();

        return bugs;

    } catch (err) {
        console.error(err.message);
    }
}

export default getTodaysActiveBugs;