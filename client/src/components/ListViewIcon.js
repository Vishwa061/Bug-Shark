import React from "react";

const InnerBlock = ({ margin, width }) => {
    const innerBlockStyle = {
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        width: width || "0.7vw",
        height: "0.7vw",
        marginBottom: `${margin}` || "0"
    }

    return (
        <div style={innerBlockStyle}></div>
    );
}

const ListViewIcon = ({ id, onClick, isSelected }) => {
    const blockDivStyle = {
        position: "relative",
        display: "block",
        float: "right",
    }

    const inlineBlockDivStyle = {
        position: "relative",
        display: "inline-block",
        padding: "0.5vw",
        bottom: "0.6vw",
        marginLeft: "1vw",
        border: "none",
        borderRadius: "0.5vw",
        backgroundColor: isSelected ? "rgba(0, 0, 0, 0.22)" : "white"
    }

    return (
        <button id={id} style={inlineBlockDivStyle} onClick={() => onClick("list")}>
            <div style={{ blockDivStyle, float: "left", marginRight: "0.25vw" }}>
                <InnerBlock margin="0.25vw" /><InnerBlock margin="0.25vw" /><InnerBlock />
            </div>
            <div style={{ blockDivStyle, float: "right" }}>
                <InnerBlock margin="0.25vw" width="2vw" /><InnerBlock margin="0.25vw" width="2vw" /><InnerBlock width="2vw" />
            </div>
        </button>
    );
}

export default ListViewIcon;