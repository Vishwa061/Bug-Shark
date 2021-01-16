const filterParticipants = (participants, searchInput) => {
    if (searchInput === "") {
        return participants;
    }

    return participants.filter(participant => `${participant.fullname.toLowerCase()}`.includes(searchInput.toLowerCase()));
}

export default filterParticipants;