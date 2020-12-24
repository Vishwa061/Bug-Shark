import React, { Fragment } from "react";
import create_project from "../assets/images/create_project.png";
import report_bug from "../assets/images/report_bug.png";
import track_bug from "../assets/images/track_bug.png";
import Arrow from "../components/Arrow"

class Landing extends React.Component {
    render() {
        return (
            <Fragment>
                <h3 id="landing-info">
                    Bug Shark - "A bug tracking system software developers can use to prioritize work and divide workloads"
                </h3>
                <br />
                <h2>Create/join a project</h2>
                <img src={create_project} alt="Create/join a project" id="landing-img1" />
                <Arrow />
                <h2>Submit a bug report</h2>
                <img src={report_bug} alt="Submit a bug report" id="landing-img2" />
                <Arrow />
                <h2>Keep track of progress made on the bug</h2>
                <img src={track_bug} alt="Keep track of the bug" id="landing-img3" />
            </Fragment>
        );
    }
}

export default Landing;