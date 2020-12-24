import React from "react";
import NavButton from "./NavButton";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <NavButton onClick={() => loginWithRedirect()} text="Login" />
    );
}

export default LoginButton;