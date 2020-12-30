import React, { Fragment, useEffect } from "react";
import { Row } from "reactstrap";
import getTodaysActiveBugsList from "../modules/getTodaysActiveBugsList";
import { useTodaysActiveBugsRequest } from "./hooks";

const TodaysActiveBugsList = ({ user_id, project_name, isChecked }) => {
    useEffect(() => {
        // console.log(props.project_name);
        // console.log(props.isChecked);
    }, [project_name, isChecked]);

    const todaysActiveBugs = useTodaysActiveBugsRequest(user_id);
    const { todaysActiveBugsList, numBugs } = getTodaysActiveBugsList(todaysActiveBugs, project_name, isChecked);

    const noBugsToday = numBugs === 0;
    const noBugsAfterFilter = todaysActiveBugsList.length === 0;
    const noNameFilter = project_name === "";
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