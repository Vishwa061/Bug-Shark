import React from "react";
import HomeCheckbox from "./HomeCheckbox";

const RefineSearchPanel = (props) => {
    return (
        <div id="refine-search-panel">
            <div id="refine-search-panel-top">
                <h2 id="refine-search-panel-top-title" >Refine Your Search</h2>
            </div>
            <div id="refine-search-panel-bot">
                <h2 id="refine-search-panel-bot-title" >Severity</h2>
                <HomeCheckbox checkboxName="Low" onCheck={props.onCheck} />
                <HomeCheckbox checkboxName="Minor" onCheck={props.onCheck} />
                <HomeCheckbox checkboxName="Major" onCheck={props.onCheck} />
                <HomeCheckbox checkboxName="Critical" onCheck={props.onCheck} />
            </div>
        </div>
    );
}

export default RefineSearchPanel;