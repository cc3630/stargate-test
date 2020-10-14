import React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { history, ProtectedRoute } from "@36node/redux-session";

import Logo from "./components/logo";
import Home from "./containers/home";
import Login from "./containers/login";

const { Content, Footer, Header } = Layout;

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute redirect="/login" component={Main} />
    </Switch>
  </Router>
);

const Main = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header>
      <Logo />
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Template-CRA-Redux ©2019 Created by 36node
    </Footer>
  </Layout>
);

const HotApp = process.env.NODE_ENV === "development" ? hot(App) : App;
export default HotApp;
