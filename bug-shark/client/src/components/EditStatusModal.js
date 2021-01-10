import React, { useState } from "react";
import DropDown from "./DropDown";
import Modal from "./Modal";
import { parseReportedDate, parseDateToTime } from "../utils/parseFunctions";
import updateBug from "../modules/updateBug";
import createLog from "../modules/createLog";
import { parseBugStatus, reverseParseBugStatus } from "../utils/parseFunctions";

const EditStatusModal = ({ user_id, project_id, bug_id, prevValue, submitBtnCallback, exitCallback }) => {
    const [status, setStatus] = useState(prevValue);

    const editStatus = () => {
        if (status === parseBugStatus(prevValue)) {
            exitCallback();
            return;
        }

        updateBug(project_id, bug_id, "status", reverseParseBugStatus(status))
            .then(() => {
                const changeMsg = `Status changed to ${status}`;
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
            submitBtnCallback={editStatus}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <div style={{ display: "inline-block" }}>
                    <h2 style={{ ...promptStyle, float: "left" }}>Status: </h2>
                    <DropDown
                        text=""
                        defaultOption={parseBugStatus(prevValue)}
                        options={["OPEN", "IN PROGRESS", "CLOSED"]}
                        callback={status => setStatus(status)}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default EditStatusModal;