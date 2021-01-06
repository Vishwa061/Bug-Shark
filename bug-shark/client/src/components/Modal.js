import React from "react";
import Button from "./Button";
import close_icon from "../assets/icons/close_icon.png";

const Modal = ({ children, title, submitBtnCallback, submitBtnText, exitCallback }) => {
    const modalContainerStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 10000,
        backdropFilter: "blur(7px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        overflowY: "scroll"
    }

    const modalStyle = {
        position: "relative",
        margin: "auto",
        marginTop: "8vw",
        width: "max-content",
        height: "max-content",
        backgroundColor: "#0D68A9",
        borderTopLeftRadius: "2vw",
        borderTopRightRadius: "2vw",
        borderBottomLeftRadius: "2vw",
        borderBottomRightRadius: "2vw"
    }

    const titleStyle = {
        position: "relative",
        textAlign: "center",
        color: "white",
        backgroundColor: "#083c61",
        padding: "1vw",
        paddingLeft: "5vw",
        paddingRight: "5vw",
        borderTopLeftRadius: "2vw",
        borderTopRightRadius: "2vw",
        marginBottom: "0",
        fontSize: "3.3vw"
    }

    const contentStyle = {
        position: "relative",
        padding: "1vw",
        paddingBottom: "2vw",
        marginTop: "2vw"
    }

    const btnWrapperStyle = {
        position: "relative",
        paddingBottom: "2vw",
        display: "flex",
        justifyContent: "center",
    }

    const closeBtnStyle = {
        position: "relative",
        float: "right",
        width: "2vw",
        height: "2vw",
        left: "4vw",
        cursor: "pointer"
    }

    return (
        <div style={modalContainerStyle}>
            <div style={modalStyle}>
                <h1 style={titleStyle}>
                    {title}
                    <img
                        src={close_icon}
                        alt=""
                        style={closeBtnStyle}
                        onClick={exitCallback}
                    />
                </h1>
                <div style={contentStyle}>
                    {children}
                </div>
                <div style={btnWrapperStyle}>
                    <Button
                        buttonText={submitBtnText}
                        onClick={submitBtnCallback}
                    />
                </div>
            </div>
        </div>
    );
}

export default Modal;