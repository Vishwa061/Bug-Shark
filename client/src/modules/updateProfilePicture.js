const updateProfilePicture = async (user_id, profile_picture) => {
    try {
        const data = new FormData();
        data.append("profile_picture", profile_picture);

        await fetch(`http://localhost:5000/api/users/${user_id}/profile_picture`, {
            method: "PUT",
            body: data
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default updateProfilePicture;