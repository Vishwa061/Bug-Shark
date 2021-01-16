const updateName = async (user_id, first_name, last_name) => {
    try {
        const body = {
            first_name: first_name,
            last_name: last_name
        }

        await fetch(`/api/users/${user_id}/name`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err.message);
    }
}

export default updateName;