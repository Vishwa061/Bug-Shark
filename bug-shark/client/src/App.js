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
import ProjectView from "./views/ProjectView";
import PageNotFound from "./views/PageNotFound";
import ProjectSettings from "./views/ProjectSettings";
import Bug from "./views/Bug";
import ProjectParticipants from "./views/ProjectParticipants";

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
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" render={() => <Home user_id={user_id} />} />
        <Route exact path="/projects" render={() => <Projects user_id={user_id} />} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/projects/:project_id" children={<ProjectView user_id={user_id} />} />
        <Route exact path="/projects/:project_id/settings" children={<ProjectSettings user_id={user_id} />} />
        <Route exact path="/projects/:project_id/bugs/:bug_id" children={props => <Bug props={props} user_id={user_id} />} />
        <Route exact path="/projects/:project_id/participants" children={<ProjectParticipants user_id={user_id} />} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default App;