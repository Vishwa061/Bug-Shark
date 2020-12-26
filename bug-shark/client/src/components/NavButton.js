import React from "react";
import { Link } from "react-router-dom"

class NavButton extends React.Component {
    render() {
        return (
            <Link className="nav-button" to={this.props.to} >
                {this.props.text}
            </Link>
        );
    }
}

export default NavButton;