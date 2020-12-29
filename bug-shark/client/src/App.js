import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "./views/Landing";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Projects from "./views/Projects";
import Account from "./views/Account";
import Footer from "./components/Footer";
import { useAuthLogic } from "./components/hooks";

const App = () => {
  const { isLoading, user } = useAuth0();
  const user_id = useAuthLogic(user);

  if (isLoading) {
    return null;
  }

  return (
    <Fragment>
      <NavBar user_id={user_id} />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" render={() => <Home user_id={user_id} />} />
        <Route path="/projects" component={Projects} />
        <Route path="/account" component={Account} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default App;