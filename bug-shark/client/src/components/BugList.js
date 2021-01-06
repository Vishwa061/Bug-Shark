import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import getBugs from "../modules/getBugs";
import { filterBugs, parseBugStatus, parseReportedDate } from "../utils/filterBugs";
import getCompareFunction from "../utils/getCompareFunction";
import { Link } from "react-router-dom";

const BugList = ({ project_id, bugType, filter, sortMethod, setNumTotalBugs, setNumFilteredBugs, reloadBugList }) => {
    const [bugs, setBugs] = useState([]);
    const [filteredBugs, setFilteredBugs] = useState([]);
    const [bugList, setBugList] = useState([]);

    useEffect(() => {
        getBugs(project_id, bugType)
            .then(bugs => {
                setBugs(bugs);
                setNumTotalBugs(bugs.length);
            });

    }, [project_id, bugType, setNumTotalBugs, reloadBugList]);

    useEffect(() => {
        const filteredBugs = filterBugs(bugs, filter);
        setFilteredBugs(filteredBugs);
        setNumFilteredBugs(filteredBugs.length);

    }, [bugs, filter, setNumFilteredBugs]);

    useEffect(() => {
        filteredBugs.sort(getCompareFunction(sortMethod));
        const bugList = filteredBugs.map(bug => {
            return (
                <Link to={`/projects/${project_id}/bugs/${bug.bug_id}`} key={bug.bug_id}>
                    <Row id="project-view-bug-rows">
                        <Col id="project-view-bug-cols">
                            {bug.bug_id}
                        </Col>
                        <Col id="project-view-bug-cols">
                            {bug.severity}
                        </Col>
                        <Col id="project-view-bug-cols">
                            {parseBugStatus(bug.bug_status)}
                        </Col>
                        <Col id="project-view-bug-cols">
                            {parseReportedDate(bug.reported)}
                        </Col>
                        <Col id="project-view-bug-cols">
                            {bug.reporter}
                        </Col>
                    </Row>
                </Link>
            );
        });
        setBugList(bugList);

    }, [project_id, filteredBugs, sortMethod]);

    const bugContainerStyle = {
        position: "relative",
        width: "max-content"
    }

    const titleRowStyle = {
        position: "relative",
        backgroundColor: "#0D68A9",
        padding: "1vw",
        color: "white",
        fontSize: "1.8vw",
        textAlign: "center",
        marginBottom: "1.5vw",
        width: "max-content"
    }

    const titleColStyle = {
        position: "relative",
        width: "16vw"
    }

    return (
        <Container style={bugContainerStyle}>
            <Row style={titleRowStyle}>
                <Col style={titleColStyle}>BugID</Col>
                <Col style={titleColStyle}>Severity</Col>
                <Col style={titleColStyle}>Status</Col>
                <Col style={titleColStyle}>Reported</Col>
                <Col style={titleColStyle}>Reporter</Col>
            </Row>
            {bugList}
        </Container>
    );
}

export default BugList;