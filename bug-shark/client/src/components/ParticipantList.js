import React, { useEffect, useState } from "react";
import getParticipants from "../modules/getParticipants";
import default_profile_picture from "../assets/images/default_profile_picture.png";
import filterParticipants from "../utils/filterParticipants";

const pTypeToString = (participant_type) => {
    switch (participant_type) {
        case 0:
            return "Developer";
        case 1:
            return "Manager";
        case 2:
            return "Owner";
        default: {
            console.error("INVALID PARTICIPANT TYPE");
            return 0;
        }
    }
}

const ParticipantList = ({ project_id, setTotalParticipants, setNumParticipants, searchInput, reload }) => {
    const [participants, setParticipants] = useState([]);
    const [participantList, setParticipantList] = useState([]);

    useEffect(() => {
        getParticipants(project_id)
            .then(participants => {
                setParticipants(participants);
                setTotalParticipants(participants.length);
            });
    }, [project_id, setTotalParticipants, reload]);

    useEffect(() => {
        const participantList = filterParticipants(participants, searchInput).map((participant, i) => {
            return (
                <div id="participant-item" key={i}>
                    <div id="participant-picture-wrapper">
                        <img
                            id="participant-picture"
                            src={participant.has_profile_picture ?
                                `http://localhost:5000/api/users/${participant.user_id}/profile_picture` :
                                default_profile_picture
                            }
                            alt={default_profile_picture}
                        />
                    </div>
                    <div id="participant-item-top"></div>
                    <div id="participant-item-bottom">
                        <div id="participant-item-bottom-name">{participant.fullname}</div>
                        <div id="participant-item-bottom-type">{pTypeToString(participant.participant_type)}</div>
                    </div>
                </div>
            );
        });
        setParticipantList(participantList);
        setNumParticipants(participantList.length)
    }, [participants, setNumParticipants, searchInput]);

    return (
        <div id="participant-list">
            {participantList}
        </div>
    );
}

export default ParticipantList;