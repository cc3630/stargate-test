import { fork, all, takeEvery, takeLatest } from "redux-saga/effects";
import { message } from "antd";
import { watchApi, watchCron, isFailure } from "@36node/redux";
import { watchXlsx } from "@36node/redux-xlsx";
import { makeSessionWatcher } from "@36node/redux-session";

import { auth } from "../actions/api";
import { Domain, SESSION_ID, TOKEN } from "../constants";
import { LOGIN, REFRESH, LOGOUT } from "../actions/types";
import { AUTH_LOGIN_URL, APP_ID } from "../config";

const refresh = auth.session.makeRefresh(Domain.session);
const watchSession = makeSessionWatcher({
  refresh,
  loginSuccessTypes: [LOGIN.SUCCESS, REFRESH.SUCCESS],
});

function onApiFailure(action) {
  const { error = {} } = action || {};
  message.error(error.message || "api error");
}

function logout() {
  // 登录失败，跳转到登录页面
  localStorage.removeItem(SESSION_ID);
  sessionStorage.removeItem(SESSION_ID);
  sessionStorage.removeItem(TOKEN);
  window.location.href = `${AUTH_LOGIN_URL}?appId=${APP_ID}`;
}

export default function* root() {
  yield all([
    fork(watchApi),
    fork(watchCron),
    fork(watchXlsx),
    fork(watchSession),
    takeEvery(isFailure, onApiFailure),
    takeLatest([LOGOUT.SUCCESS, LOGOUT.FAILURE, REFRESH.FAILURE], logout),
  ]);
}
