import { fork, all, takeEvery, takeLatest, call } from "redux-saga/effects";
import { message } from "antd";
import { watchApi, watchCron, isFailure } from "@36node/redux";
import { watchXlsx } from "@36node/redux-xlsx";
import { makeSessionWatcher, history } from "@36node/redux-session";

import { auth } from "../actions/api";
import { Domain, LOGIN_URL } from "../constants";
import { LOGIN, REFRESH, LOGOUT } from "../actions/types";

const refresh = auth.session.makeRefresh(Domain.session);
const watchSession = makeSessionWatcher({
  refresh,
  loginSuccessTypes: [LOGIN.SUCCESS, REFRESH.SUCCESS],
  logoutSuccessTypes: [LOGOUT.SUCCESS],
});

function onApiFailure(action) {
  const { error = {} } = action || {};
  message.error(error.message || "api error");
}

function* refreshFailure() {
  // 登录失败，跳转到登录页面
  yield call(history.push, LOGIN_URL);
}

export default function* root() {
  yield all([
    fork(watchApi),
    fork(watchCron),
    fork(watchXlsx),
    fork(watchSession),
    takeEvery(isFailure, onApiFailure),
    takeLatest([REFRESH.FAILURE], refreshFailure),
  ]);
}
