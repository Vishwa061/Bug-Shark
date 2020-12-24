import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { BrowserRouter as Router } from "react-router-dom"
import "./styles/style.css";

ReactDOM.render(
    <Router>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </Router>,
    document.getElementById("root")
);