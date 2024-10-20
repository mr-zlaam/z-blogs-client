let ENVIRONMENT_DEV = true;

const _config = {
  BACKEND_URI: ENVIRONMENT_DEV &&
    (process.env.NEXT_PUBLIC_BACKEND_URI_DEV as string),
  SECRET: process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string,
};
export const { BACKEND_URI, SECRET } = _config;
