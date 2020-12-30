import React, { useState } from "react";

const HomeCheckbox = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const onCheckBoxChange = () => {
        setIsChecked(!isChecked);
        props.onCheck(props.checkboxName, !isChecked);
    }

    return (
        <div id="refine-search-panel-checkbox">
            <input
                id="refine-search-panel-checkbox-box"
                type="checkbox"
                onChange={onCheckBoxChange}
            />
            <h5 id="refine-search-panel-checkbox-title">{props.checkboxName}</h5>
        </div>
    );
}

export default HomeCheckbox;