/**
 * init dotenv
 *
 * .env: Default.
 * .env.local: Local overrides. This file is loaded for all environments except test.
 * .env.development, .env.test, .env.production: Environment-specific settings.
 * .env.development.local, .env.test.local, .env.production.local: Local overrides of environment-specific settings.
 *
 * Available settings
 *
 * APP_PORT=9527
 * APP_BASE_PATH=/v1
 * APP_JWT_PUBLIC_KEY=`a public key string`
 */

/**
 *
 * @param {string} name envrionment name
 * @param {object} opt option with { required, default }
 * @returns {*} value
 */

function env(name, init) {
  const key = `REACT_APP_${name.toUpperCase()}`;
  const buildtimeValue = process && process.env && process.env[key];
  const runtimeValue = window && window._36node && window._36node[key];

  const value = runtimeValue || buildtimeValue || init;
  if (value === undefined) {
    throw new Error(`environment ${name} is missing`);
  }

  return value;
}

/**
 * chore
 */
export const VERSION = env("VERSION");
export const BUILD = env("BUILD", "19730101-000000");

/**
 * login
 */
export const AUTH_LOGIN_URL = env(
  "AUTH_LOGIN_URL",
  "https://stargatetest.account-uat.stargate.36node.com/auth"
);
export const APP_ID = env("APP_ID", "5f86c7397f1cb50011672b5b");

/**
 * sdk
 */
export const AUTH_BASE = env(
  "AUTH_BASE",
  "https://api.stargate.36node.com/auth/uat"
);

/* eslint-disable */
console.log(`VERSION:${VERSION}`);
console.log(`BUILD:${BUILD}`);
/* eslint-disable */
