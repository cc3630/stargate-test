import { createApiMaker } from "@36node/redux";

import * as types from "./types";
import * as sdk from "../sdk";

export const auth = {
  makeLogin: createApiMaker(types.LOGIN, sdk.auth.session.createSession),
  makeLogout: createApiMaker(types.LOGOUT, sdk.auth.session.deleteSession),
  makeRefresh: createApiMaker(types.REFRESH, sdk.auth.session.getSession),
  makeUnAuth: createApiMaker(types.UN_AUTH, sdk.auth.session.unauth),
};
