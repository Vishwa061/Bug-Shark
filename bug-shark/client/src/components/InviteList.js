import React, { useEffect, useState } from "react";
import getInvites from "../modules/getInvites";
import { Container, Row, Col } from "reactstrap";

const InviteList = ({ project_id, reload }) => {
    const [inviteList, setInviteList] = useState([]);

    useEffect(() => {
        getInvites(project_id)
            .then(invites => {
                let i = 0;
                setInviteList(invites.map(invite => {
                    i++;
                    return (
                        <Row key={i} style={{ position: "relative", marginBottom: "0.5vw" }}>
                            <Col id="dev-list-col-1" xs="auto">{invite.fullname}</Col>
                            <Col id="dev-list-col-2" xs="auto">{invite.email}</Col>
                        </Row>
                    );
                }));
            });

    }, [project_id, reload]);

    const titleColStyle1 = {
        position: "relative",
        backgroundColor: "#0D68A9",
        padding: "0.5vw",
        fontSize: "2vw",
        color: "white",
        marginRight: "1vw",
        textAlign: "center",
        width: "17vw"
    }

    const titleColStyle2 = {
        position: "relative",
        backgroundColor: "#0D68A9",
        padding: "0.5vw",
        fontSize: "2vw",
        color: "white",
        marginRight: "1vw",
        textAlign: "center",
        width: "25vw"
    }

    const titleRowStyle = {
        position: "relative",
        width: "max-content",
        marginBottom: "1.5vw"
    }

    const containerStyle = {
        position: "relative",
        width: "42vw",
        margin: "0"
    }

    return (
        <div id="invite-list">
            <Container xs="auto" style={containerStyle}>
                <Row style={titleRowStyle}>
                    <Col style={titleColStyle1} xs="auto">Name</Col>
                    <Col style={titleColStyle2} xs="auto">Email</Col>
                </Row>
                {inviteList}
            </Container>
        </div>
    );
}

export default InviteList;