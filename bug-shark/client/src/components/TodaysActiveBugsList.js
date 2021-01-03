import React, { Fragment, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import filterTodaysActiveBugs from "../modules/filterTodaysActiveBugs";
import getTodaysActiveBugs from "../modules/getTodaysActiveBugs";

const TodaysActiveBugsList = ({ user_id, project_name, isChecked, changeNumBugs }) => {
    const [todaysActiveBugs, setTodaysActiveBugs] = useState([]);
    const [todaysActiveBugsList, setTodaysActiveBugsList] = useState([]);
    const [numBugs, setNumBugs] = useState(0);
    const [numFilteredBugs, setNumFilteredBugs] = useState(0);

    useEffect(() => {
        getTodaysActiveBugs(user_id)
            .then((todaysActiveBugs) => {
                setTodaysActiveBugs(todaysActiveBugs);
                setNumBugs(todaysActiveBugs.length);
            });

    }, [user_id]);

    useEffect(() => {
        const filteredBugs = filterTodaysActiveBugs(todaysActiveBugs, project_name, isChecked);
        const todaysActiveBugsList = filteredBugs.map(bug => {
            return (
                <Row key={bug.bug_id} id="home-bugs-rows">
                    <Col><h4 id="home-bugs">{bug.project_name}</h4></Col>
                    <Col><h4 id="home-bugs">{bug.severity}</h4></Col>
                    <Col><h4 id="home-bugs">{bug.bug_id}</h4></Col>
                </Row>
            );
        });

        setTodaysActiveBugsList(todaysActiveBugsList);
        setNumFilteredBugs(filteredBugs.length);
    }, [todaysActiveBugs, project_name, isChecked]);

    useEffect(() => {
        changeNumBugs(numBugs);
    }, [changeNumBugs, numBugs]);

    const noBugsToday = numBugs === 0;
    const noBugsAfterFilter = numFilteredBugs === 0;
    const noBugsMsg = noBugsToday ?
        "No new bugs today . . ." : // only if there's no bugs today
        "No matching results . . ."; // only if there are bugs but they've been filtered out

    return (
        <Fragment>
            {(noBugsToday || noBugsAfterFilter) ?
                <Row key="no-bugs-today" ><h3 id="no-bugs-msg">{noBugsMsg}</h3></Row> :
                todaysActiveBugsList
            }
        </Fragment>
    );
}

export default TodaysActiveBugsList;