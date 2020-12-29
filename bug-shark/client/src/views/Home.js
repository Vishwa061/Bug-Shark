import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import TodaysActiveBugsList from "../components/TodaysActiveBugsList";
import Search from "../components/Search";
import RefineSearchPanel from "../components/RefineSearchPanel";

const Home = (props) => {
    const [project_name, setProject_name] = useState("");
    const onSearch = (project_name) => {
        setProject_name(project_name);
    }

    return (
        <div id="home" >
            <h1 id="today-title">Today's Bugs</h1>
            <div id="home-content">
                <div id="home-filters">
                    <Search id="home-search" onSearch={onSearch} />
                    <RefineSearchPanel />
                </div>
                <Container id="home-bugs-container">
                    <Row >
                        <Col id="home-bugs-titles-1"><h3>Project</h3></Col>
                        <Col id="home-bugs-titles-2"><h3>Severity</h3></Col>
                        <Col id="home-bugs-titles-3"><h3>BugID</h3></Col>
                    </Row>
                    <TodaysActiveBugsList user_id={props.user_id} project_name={project_name} />
                </Container>
            </div>
        </div>
    );
}

export default Home;