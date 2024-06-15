const _config = {
  DB_URI: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as string,
  ISDEVELOPMENT_ENVIRONMENT: true as boolean,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
};
export const {
  DB_URI,
  PORT,
  ISDEVELOPMENT_ENVIRONMENT,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = _config;
