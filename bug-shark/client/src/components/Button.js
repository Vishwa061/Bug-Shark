import React from "react";

const Button = ({ id, buttonText, buttonID, icon, onClick }) => {
    const btnContainerStyle = {
        position: "relative",
        backgroundColor: "#083c61",
        width: "max-content",
        borderRadius: "1vw"
    };

    const btnStyle = {
        position: "relative",
        display: "inline-block",
        backgroundColor: "#083c61",
        border: "none",
        textAlign: "center",
        borderStyle: "none",
        padding: "1vw",
        color: "white",
        borderRadius: "1vw"
    };

    const iconStyle = {
        position: "relative",
        float: "left",
        width: "2vw",
        height: "2vw",
        paddingRight: "1vw",
        objectFit: "cover"
    };

    const btnTextStyle = {
        position: "relative",
        float: "right",
        fontSize: "2vw",
        marginBottom: "0"
    };

    const noIcon = icon !== undefined;

    return (
        <div id={id} style={btnContainerStyle}>
            <button id={buttonID} style={btnStyle} onClick={onClick}>
                {noIcon &&
                    <img src={icon} alt="" style={iconStyle} />
                }
                <h3 style={btnTextStyle}>{buttonText}</h3>
            </button>
        </div>
    );
}

export default Button;