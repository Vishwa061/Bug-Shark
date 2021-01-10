import React, { useState } from "react";
import DropDown from "./DropDown";
import Modal from "./Modal";
import { parseReportedDate, parseDateToTime } from "../utils/parseFunctions";
import updateBug from "../modules/updateBug";
import createLog from "../modules/createLog";

const EditSeverityModal = ({ user_id, project_id, bug_id, prevValue, submitBtnCallback, exitCallback }) => {
    const [severity, setSeverity] = useState(prevValue);

    const editSeverity = () => {
        if (severity === prevValue) {
            exitCallback();
            return;
        }

        updateBug(project_id, bug_id, "severity", severity)
            .then(() => {
                const changeMsg = `Severity changed to ${severity}`;
                const change = `${parseReportedDate(new Date())} ${parseDateToTime(new Date())}\n${changeMsg}`;

                createLog(user_id, project_id, bug_id, change)
                    .then(() => {
                        submitBtnCallback();
                        exitCallback();
                    });
            });
    }

    const containerStyle = {
        position: "relative",
        marginLeft: "4vw",
        marginRight: "4vw"
    }

    const promptStyle = {
        position: "relative",
        color: "white",
        fontSize: "1.6vw"
    }

    return (
        <Modal
            title="Editing Bug"
            submitBtnText="Save"
            submitBtnCallback={editSeverity}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <div style={{ display: "inline-block" }}>
                    <h2 style={{ ...promptStyle, float: "left" }}>Severity: </h2>
                    <DropDown
                        text=""
                        defaultOption={prevValue}
                        options={["LOW", "MINOR", "MAJOR", "CRITICAL"]}
                        callback={severity => setSeverity(severity)}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default EditSeverityModal;