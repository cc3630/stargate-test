import React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Route, Switch, useLocation } from "react-router-dom";
import { Layout, Spin } from "antd";
import { isEmpty } from "lodash";
import { history, ProtectedRoute, withSession } from "@36node/redux-session";

import Home from "./containers/home";
import Login from "./containers/login";

const { Header } = Layout;

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute redirect="/login" component={Main} />
    </Switch>
  </Router>
);

const Main = withSession("session")(props => {
  const location = useLocation();

  const { result = {} } = props.session;

  if (isEmpty(result.provider)) {
    return <Spin />;
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Header />

      <Switch location={location}>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
});

const HotApp = process.env.NODE_ENV === "development" ? hot(App) : App;
export default HotApp;
