import React, { Fragment } from "react";
import AuthButton from "../components/AuthButton";
import NavButton from "./NavButton";
import { useAuth0 } from "@auth0/auth0-react";
import authLogic from "../utils/authLogic";

const NavBar = () => {
    const { isAuthenticated, user } = useAuth0();
    if (isAuthenticated) {
        authLogic(user);
    }

    return (
        <nav id="nav-bar">
            <h1 id="title">Bug Shark</h1>
            <AuthButton />
            {isAuthenticated &&
                <Fragment>
                    <NavButton text="Account" />
                    <NavButton text="Projects" />
                    <NavButton text="Home" />
                </Fragment>
            }
        </nav>
    );
}

export default NavBar;