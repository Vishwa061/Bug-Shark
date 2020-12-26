import React, { Fragment } from "react";
import AuthButton from "../components/AuthButton";
import NavButton from "./NavButton";
import { useAuth0 } from "@auth0/auth0-react";
import authLogic from "../modules/authLogic";
import NavProfile from "./NavProfile";

const NavBar = () => {
    const { isAuthenticated, user } = useAuth0();
    if (isAuthenticated) {
        authLogic(user);
    }

    return (
        <nav id="nav-bar">
            <h1 id="title">Bug Shark</h1>
            {isAuthenticated &&
                <NavProfile />
            }
            <AuthButton />
            {isAuthenticated &&
                <Fragment>
                    <NavButton text="Account" to="/account" />
                    <NavButton text="Projects" to="/projects" />
                    <NavButton text="Home" to="/home" />
                </Fragment>
            }
        </nav>
    );
}

export default NavBar;