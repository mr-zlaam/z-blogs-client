export const SITE_VERSION = 1;
// pagination stuff
export const DELAY = 500;
export const LIMIT = 20;
export const PAGE = 2;
export const REVALIDATE = 600; //28800 = 8hours
export const SITE_URL = "https://zlaam.vercel.app";
export const IS_NOT_DEV_ENV = false; // check if it is in development environment
// ******************* expiration date of token
export const expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60 * 1000);
// ***********************************************
