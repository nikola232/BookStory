import { config } from 'dotenv';
config({ path: '.env.local' });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
