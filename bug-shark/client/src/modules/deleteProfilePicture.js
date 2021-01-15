const deleteProfilePicture = async (user_id) => {
    try {
        await fetch(`http://localhost:5000/api/users/${user_id}/profile_picture`, {
            method: "DELETE"
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default deleteProfilePicture;