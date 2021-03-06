import React, { Fragment } from "react";
import AuthButton from "../components/AuthButton";
import NavButton from "./NavButton";
import { useAuth0 } from "@auth0/auth0-react";
import NavProfile from "./NavProfile";

const NavBar = (props) => {
    const { isAuthenticated } = useAuth0();

    return (
        <nav id="nav-bar">
            <h1 id="title">Bug Shark</h1>
            {isAuthenticated &&
                <NavProfile user_id={props.user_id} />
            }
            <div id="nav-button-container">
                <AuthButton />
                {isAuthenticated &&
                    <Fragment>
                        <NavButton text="Account" to="/account" />
                        <NavButton text="Projects" to="/projects" />
                        <NavButton text="Home" to="/home" />
                    </Fragment>
                }
            </div>
        </nav>
    );
}

export default NavBar;