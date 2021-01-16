import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropDown = ({ callback, id, text, options, defaultOption }) => {
    const dropDownContainerStyle = {
        position: "relative",
        display: "inline-block"
    }

    const textStyle = {
        position: "relative",
        float: "left",
        color: "rgba(0, 0, 0, 0.8)",
        fontSize: "1.8vw"
    }

    const dropDownStyle = {
        float: "left",
        marginLeft: "0.5vw",
        width: "max-content",
        bottom: "0.3vw",
        fontSize: "1.3vw"
    }

    const dropDownToggleStyle = {
        color: "rgba(0, 0, 0, 0.85)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        fontSize: "1.3vw",
        border: "none"
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => {
        setDropdownOpen(prevState => !prevState);
    }

    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const onSelectOption = (option) => {
        callback(option);
        setSelectedOption(option);
    }

    const dropdownItems = options.map(option => {
        return <DropdownItem key={option} onClick={() => onSelectOption(option)}>{option}</DropdownItem>
    });

    return (
        <div id={id} style={dropDownContainerStyle}>
            <h4 style={textStyle}>{text}</h4>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} style={dropDownStyle}>
                <DropdownToggle caret style={dropDownToggleStyle}>
                    {selectedOption}
                </DropdownToggle>
                <DropdownMenu>
                    {dropdownItems}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default DropDown;