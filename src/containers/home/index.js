import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { get } from "lodash";
import { useSession } from "@36node/redux-session";

import { auth } from "../../actions/api";
import { Domain } from "../../constants";
import Container from "../../components/layout/container";

const logout = auth.session.makeLogout(Domain.session);

export default function Home() {
  const dispatch = useDispatch();
  const session = useSession(Domain.session);

  const onLogout = () => {
    const sessionId = get(session, "result.id");
    if (sessionId) {
      dispatch(logout({ sessionId }));
    }
  };

  return (
    <Container>
      <div>登录成功，这里是主页</div>
      <div>
        <Button type="primary" onClick={onLogout}>
          退出登录
        </Button>
      </div>
    </Container>
  );
}
