const getNotification = async (project_id, bug_id, user_id) => {
    try {
        const fetchedNotification
            = await fetch(`/api/projects/${project_id}/bugs/${bug_id}/users/${user_id}/notifications`);
        const notification = await fetchedNotification.json();

        return notification;
    } catch (err) {
        console.error(err.message);
    }
}

export default getNotification;