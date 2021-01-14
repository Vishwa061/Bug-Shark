const filterParticipants = (participants, searchInput) => {
    if (searchInput === "") {
        return participants;
    }

    return participants.filter(participant => participant.fullname === searchInput);
}

export default filterParticipants;