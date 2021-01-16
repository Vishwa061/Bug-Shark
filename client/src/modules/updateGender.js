const updateGender = async (user_id, gender) => {
    try {
        const body = {
            gender: gender
        }

        await fetch(`http://localhost:5000/api/users/${user_id}/gender`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err.message);
    }
}

export default updateGender;