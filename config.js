import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const databaseName = process.env.DATABASE_NAME;
const databaseUsername = process.env.DATABASE_USERNAME;
const databaseHost = process.env.DATABASE_HOST;
const databasePassword = process.env.DATABASE_PASSWORD;

export {
  databaseUrl,
  databaseName,
  databaseUsername,
  databaseHost,
  databasePassword,
};
