import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import TodaysActiveBugsList from "../components/TodaysActiveBugsList";
import Search from "../components/Search";
import RefineSearchPanel from "../components/RefineSearchPanel";

const Home = ({ user_id }) => {
    const [project_name, setProject_name] = useState("");
    const onSearch = (project_name) => {
        setProject_name(project_name);
    }

    const [isChecked, setIsChecked] = useState({
        isLow: false,
        isMinor: false,
        isMajor: false,
        isCritical: false
    });
    const onCheck = (box, boxCheckValue) => {
        setIsChecked({
            ...isChecked,
            [`is${box}`]: boxCheckValue
        });
    }

    const [numBugs, setNumBugs] = useState(0);
    const changeNumBugs = (numBugs) => {
        setNumBugs(numBugs);
    }

    const areBugsToday = numBugs !== 0;

    return (
        <div id="home" >
            <h1 id="today-title">Today's Bugs {areBugsToday && `(${numBugs})`}</h1>
            <div id="home-content">
                <div id="home-filters">
                    <Search id="home-search" onSearch={onSearch} input_id="home-search-input" />
                    <RefineSearchPanel onCheck={onCheck} />
                </div>
                <Container id="home-bugs-container">
                    <Row >
                        <Col id="home-bugs-cols-titles-1">
                            <h3 id="home-bugs-titles">Project</h3>
                        </Col>
                        <Col id="home-bugs-cols-titles-2">
                            <h3 id="home-bugs-titles">Severity</h3>
                        </Col>
                        <Col id="home-bugs-cols-titles-3">
                            <h3 id="home-bugs-titles">BugID</h3>
                        </Col>
                    </Row>
                    <TodaysActiveBugsList
                        user_id={user_id}
                        project_name={project_name}
                        isChecked={isChecked}
                        changeNumBugs={changeNumBugs}
                    />
                </Container>
            </div>
        </div>
    );
}

export default Home;