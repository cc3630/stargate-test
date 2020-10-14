import React from "react";
import { connect } from "react-redux";

import { auth } from "../../actions/api";
import { domain } from "../../constants";
import Container from "../../components/layout/container";

const logout = auth.makeLogout(domain.session);
const unAuth = auth.makeUnAuth(domain.session);

@connect(state => ({}))
export default class extends React.PureComponent {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  handleUnauth = () => {
    this.props.dispatch(unAuth());
  };

  render() {
    return <Container>登录成功，这里是主页</Container>;
  }
}
