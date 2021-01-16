import React, { useEffect, useState } from "react";
import getDevelopers from "../modules/getDevelopers";
import { Container, Row, Col } from "reactstrap";

const DevList = ({ project_id, bug_id, reload, setNumDevs }) => {
    const [devList, setDevList] = useState([]);

    useEffect(() => {
        getDevelopers(project_id, bug_id)
            .then(devs => {
                // console.log("Devs:", devs);
                let i = 0;
                setDevList(devs.map(dev => {
                    i++;
                    return (
                        <Row key={i} style={{ position: "relative", marginBottom: "0.5vw" }}>
                            <Col id="dev-list-col-1" xs="auto">{dev.fullname}</Col>
                            <Col id="dev-list-col-2" xs="auto">{dev.email}</Col>
                        </Row>
                    );
                }));
                setNumDevs(devs.length);
            });

    }, [project_id, bug_id, reload, setNumDevs]);

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
        <div id="dev-list">
            <Container xs="auto" style={containerStyle}>
                <Row style={titleRowStyle}>
                    <Col style={titleColStyle1} xs="auto">Name</Col>
                    <Col style={titleColStyle2} xs="auto">Email</Col>
                </Row>
                {devList}
            </Container>
        </div>
    );
}

export default DevList;