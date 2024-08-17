const _config = {
  DB_URI: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as string,
  ISDEVELOPMENT_ENVIRONMENT: true as boolean,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET as string,
  SERVER_MAIL_PASS: process.env.SERVER_MAIL_PASS as string,
  SERVER_MAIL: process.env.SERVER_MAIL as string,
};
export const {
  DB_URI,
  PORT,
  ISDEVELOPMENT_ENVIRONMENT,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  JWT_SECRET_KEY,
  SERVER_MAIL,
  SERVER_MAIL_PASS,
} = _config;
