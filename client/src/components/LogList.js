import React, { useEffect, useState } from "react";
import getLogs from "../modules/getLogs";

const LogList = ({ project_id, bug_id, reload }) => {
    const [logList, setLogList] = useState([]);

    useEffect(() => {
        getLogs(project_id, bug_id)
            .then(logs => {
                // console.log("Logs:", logs[0]?.change);
                let i = 0;
                setLogList(logs.map(log => {
                    i++;
                    return (
                        <p
                            key={i}
                            id="log"
                            style={{
                                backgroundColor: (i % 2 === 0) ? "white" : "rgba(0, 0, 0, 0.25)"
                            }}
                        >
                            {log.change}
                        </p>
                    );
                }));
            });

    }, [project_id, bug_id, reload]);

    return (
        <div id="log-list">
            {logList}
        </div>
    );
}

export default LogList;