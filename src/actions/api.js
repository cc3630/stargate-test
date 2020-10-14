import { createApiMaker } from "@36node/redux";

import * as types from "./types";
import * as sdk from "../sdk";

export const auth = {
  session: {
    makeLogout: createApiMaker(types.LOGOUT, sdk.auth.session.deleteSession),
    makeRefresh: createApiMaker(types.REFRESH, sdk.auth.session.getSession),
  },
};
