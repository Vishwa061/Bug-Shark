import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { BrowserRouter as Router } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import "./styles/home.css";
import "./styles/landing.css";
import "./styles/projects.css";
import "./styles/projectView.css";
import "./styles/bug.css";
import "./styles/projectSettings.css";
import "./styles/projectParticipants.css";
import "./styles/account.css";

ReactDOM.render(
    <Router>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </Router>,
    document.getElementById("root")
);