import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  "development": {
    "username": process.env.POSTGRESDB_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": "db",
    "dialect": process.env.DB_DIALECT,
    "port": process.env.POSTGRESDB_LOCAL_PORT
  },
  "test": {
    "username": process.env.POSTGRESDB_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": "db",
    "dialect":  process.env.DB_DIALECT,
    "port": process.env.POSTGRESDB_LOCAL_PORT
  },
  "production": {
    "username": process.env.POSTGRESDB_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": "db",
    "dialect":  process.env.DB_DIALECT,
    "port": process.env.POSTGRESDB_LOCAL_PORT
  }
}
export default dbConfig;