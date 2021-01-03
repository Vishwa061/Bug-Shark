import React from "react";
import create_project from "../assets/images/create_project.png";
import report_bug from "../assets/images/report_bug.png";
import track_bug from "../assets/images/track_bug.png";
import Arrow from "../components/Arrow"

const Landing = () => {
    return (
        <div id="landing">
            <p id="landing-info">
                A bug tracking system software developers can use to prioritize work and divide workloads
                </p>
            <h2 id="landing-img-info">Create/join a project</h2>
            <img src={create_project} alt="Create/join a project" id="landing-img" />
            <Arrow />
            <h2 id="landing-img-info">Submit a bug report</h2>
            <img src={report_bug} alt="Submit a bug report" id="landing-img" />
            <Arrow />
            <h2 id="landing-img-info">Keep track of progress made on the bug</h2>
            <img src={track_bug} alt="Keep track of the bug" id="landing-img" />
        </div>
    );
}

export default Landing;