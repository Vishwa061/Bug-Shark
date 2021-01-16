const deleteProfilePicture = async (user_id) => {
    try {
        await fetch(`/api/users/${user_id}/profile_picture`, {
            method: "DELETE"
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default deleteProfilePicture;