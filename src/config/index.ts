const _config = {
  DB_URI: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as string,
  ISDEVELOPMENT_ENVIRONMENT: true as boolean,
};
export const { DB_URI, PORT, ISDEVELOPMENT_ENVIRONMENT } = _config;
