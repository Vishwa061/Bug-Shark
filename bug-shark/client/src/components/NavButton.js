import React from "react";

class NavButton extends React.Component {
    render() {
        return (
            <button className="nav-button" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default NavButton;