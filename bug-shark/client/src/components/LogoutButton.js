import React from "react";
import NavButton from "./NavButton";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <NavButton onClick={() => logout()} text="Logout" />
    );
}

export default LogoutButton;