import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "./views/Landing";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Footer from "./components/Footer";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;