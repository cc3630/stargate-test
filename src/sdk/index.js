import Auth from "@36node/auth-sdk";
import { getToken } from "@36node/redux-session";

import { AUTH_BASE } from "../config";

export const auth = new Auth({
  base: AUTH_BASE,
  token: getToken,
});
