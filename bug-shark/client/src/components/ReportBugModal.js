import React, { useState } from "react";
import DropDown from "./DropDown";
import Modal from "./Modal";
import createBug from "../modules/createBug";

const ReportBugModal = ({ user_id, project_id, submitBtnCallback, exitCallback }) => {
    const [severity, setSeverity] = useState("LOW");
    const [error, setError] = useState("");
    const [reproduce, setReproduce] = useState("");

    const createNewBug = () => {
        createBug(project_id, severity, error, user_id, reproduce)
            .then(() => {
                submitBtnCallback();
                exitCallback();
            });
    }

    const containerStyle1 = {
        position: "relative",
        marginLeft: "4vw",
        marginBottom: "2vw"
    }

    const containerStyle2 = {
        position: "relative",
        marginLeft: "4vw",
        marginBottom: "2vw"
    }

    const containerStyle3 = {
        position: "relative",
        marginLeft: "4vw"
    }

    const promptStyle = {
        position: "relative",
        color: "white",
        fontSize: "1.6vw"
    }

    return (
        <Modal
            title="Reporting a Bug"
            submitBtnText="Report Bug"
            submitBtnCallback={createNewBug}
            exitCallback={exitCallback}
        >
            <div style={containerStyle1}>
                <div style={{ display: "inline-block" }}>
                    <h2 style={{ ...promptStyle, float: "left" }}>Severity: </h2>
                    <DropDown
                        text=""
                        defaultOption="LOW"
                        options={["LOW", "MINOR", "MAJOR", "CRTICAL"]}
                        callback={severity => setSeverity(severity)}
                    />
                </div>
            </div>

            <div style={containerStyle2}>
                <h2 style={promptStyle}>What went wrong?</h2>
                <textarea
                    id="report-bug-modal-textarea"
                    placeholder="Write here..."
                    onInput={e => setError(e.target.value)}
                />
            </div>
            <div style={containerStyle3}>
                <h2 style={promptStyle}>What are the steps to reproduce it?</h2>
                <textarea
                    id="report-bug-modal-textarea"
                    placeholder="Write here..."
                    onInput={e => setReproduce(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default ReportBugModal;