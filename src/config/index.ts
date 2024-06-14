const _config = {
  DB_URI: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as string,
};
export const { DB_URI, PORT } = _config;
