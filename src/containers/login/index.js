import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { AUTH_URL, APP_ID } from "../../config";
import { Domain } from "../../constants";
import { auth } from "../../actions/api";

const refresh = auth.session.makeRefresh(Domain.session);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LoginPage() {
  const query = useQuery();
  const dispatch = useDispatch();
  const code = query.get("code");

  /**
   * 只在 component did mount 时执行 dispatch
   */
  useEffect(() => {
    if (code) {
      dispatch(refresh({ sessionId: code }, { from: "/" }));
    } else {
      // 跳转至登录验证页面
      window.location.href = `${AUTH_URL}?appId=${APP_ID}`;
    }
  }, []); // eslint-disable-line

  return <></>;
}
