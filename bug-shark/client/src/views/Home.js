import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
class Home extends React.Component {
    render() {
        return (
            <Fragment>
                <h1 id="today-title">Today's Bugs</h1>
                <br /><br /><br />
                <Container id="home-bugs">
                    <Row >
                        <Col id="home-bugs-titles"><h3>Project</h3></Col>
                        <Col></Col>
                        <Col id="home-bugs-titles"><h3>Severity</h3></Col>
                        <Col></Col>
                        <Col id="home-bugs-titles"><h3>BugID</h3></Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Home;