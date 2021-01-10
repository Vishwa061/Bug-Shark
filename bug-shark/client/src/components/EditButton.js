import React from "react";
import edit_icon from "../assets/icons/edit_icon.png";

const EditButton = ({ id, size, onClick }) => {
    return (
        <img id={id} src={edit_icon} alt="" onClick={onClick} style={{ width: size, height: size }} />
    );
}

export default EditButton;