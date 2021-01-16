import React, { useEffect, useState } from "react";
import getContributions from "../modules/getContributions";
import { Container, Row, Col } from "reactstrap";

const ContributionList = ({ user_id }) => {
    const [contributionList, setContributionList] = useState([]);

    useEffect(() => {
        getContributions(user_id)
            .then(contributions => {
                setContributionList(contributions.map((contribution, i) => {
                    return (
                        <Row key={i} style={{ position: "relative", marginBottom: "1vw", backgroundColor: "#0D68A9" }}>
                            <Col id="c-list-col-1" xs="auto">{contribution.project_name}</Col>
                            <Col id="c-list-col-2" xs="auto">{`(${contribution.num_bugs_reported})`}</Col>
                        </Row>
                    );
                }));
            });

    }, [user_id]);

    const titleColStyle1 = {
        position: "relative",
        backgroundColor: "#0D68A9",
        padding: "0.5vw",
        fontSize: "2vw",
        color: "white",
        marginRight: "1vw",
        textAlign: "center",
        width: "25vw"
    }

    const titleColStyle2 = {
        position: "relative",
        backgroundColor: "#0D68A9",
        padding: "0.5vw",
        fontSize: "2vw",
        color: "white",
        marginRight: "1vw",
        textAlign: "center",
        width: "17vw"
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
        <div id="c-list">
            <Container xs="auto" style={containerStyle}>
                <Row style={titleRowStyle}>
                    <Col style={titleColStyle1} xs="auto">Project</Col>
                    <Col style={titleColStyle2} xs="auto">Bugs Reported</Col>
                </Row>
                {contributionList}
            </Container>
        </div>
    );
}

export default ContributionList;