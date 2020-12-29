import React, { Fragment, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useTodaysActiveBugsRequest } from "./hooks";

const TodaysActiveBugsList = (props) => {
    useEffect(() => {
        // console.log(props.project_name);
    }, [props.project_name])

    const todaysActiveBugs = useTodaysActiveBugsRequest(props.user_id);
    const todaysActiveBugsList = [];
    let numBugs = 0; // number of bugs without filters
    todaysActiveBugs.forEach(bugs => {
        bugs.forEach(bug => {
            numBugs++;
            if (props.project_name === "" || bug.project_name.toUpperCase() === props.project_name.toUpperCase()) {
                todaysActiveBugsList.push(
                    <Row key={bug.bug_id} id="home-bugs">
                        <Col><h4>{bug.project_name}</h4></Col>
                        <Col><h4>{bug.severity}</h4></Col>
                        <Col><h4>{bug.bug_id}</h4></Col>
                    </Row>
                )
            }
        })
    })

    const noBugsToday = numBugs === 0;
    const noBugsAfterFilter = todaysActiveBugsList.length === 0;
    const noNameFilter = props.project_name === "";
    const noBugsMsg = (noNameFilter || noBugsToday) ?
        "No new bugs today . . ." : // only if theres no bugs today
        "No matching results . . ."; // only if there are bugs but theyve been filtered out

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