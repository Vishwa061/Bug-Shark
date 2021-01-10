import React, { useState } from "react";
import Modal from "./Modal";
import { parseReportedDate, parseDateToTime } from "../utils/parseFunctions";
import updateBug from "../modules/updateBug";
import createLog from "../modules/createLog";

const EditBugModal = ({ type, user_id, project_id, bug_id, prompt, prevValue, submitBtnCallback, exitCallback }) => {
    const [input, setInput] = useState(prevValue);

    const editBug = () => {
        if (input === prevValue) {
            exitCallback();
            return;
        }

        updateBug(project_id, bug_id, type, input)
            .then(() => {
                const changeMsg = (type === "reproduce") ? "Steps to reproduce" : type.charAt(0).toUpperCase() + type.slice(1);
                const change = `${parseReportedDate(new Date())} ${parseDateToTime(new Date())}\n${changeMsg} changed`;

                createLog(user_id, project_id, bug_id, change)
                    .then(() => {
                        submitBtnCallback();
                        exitCallback();
                    });
            });
    }

    const containerStyle = {
        position: "relative",
        marginLeft: "2vw",
        marginRight: "2vw",
        marginBottom: "2vw"
    }

    const promptStyle = {
        position: "relative",
        color: "white",
        fontSize: "1.6vw",
        whiteSpace: "pre-wrap"
    }

    return (
        <Modal
            title="Editing Bug"
            submitBtnText="Save"
            submitBtnCallback={editBug}
            exitCallback={exitCallback}
        >
            <div style={containerStyle}>
                <h2 style={promptStyle}>{prompt}</h2>
                <textarea
                    id="report-bug-modal-textarea"
                    defaultValue={prevValue}
                    onInput={e => setInput(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default EditBugModal;