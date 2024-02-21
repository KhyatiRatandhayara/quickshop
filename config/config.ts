import dotenv from "dotenv";
dotenv.config();

const config  = {   
  development: {
    username: "postgres",
    password: "admin",
    database: "quickshop",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5434
  },
  test: {
    username: "postgres",
    password: "admin",
    database: "quickshop",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "admin",
    database: "quickshop",
    host: "127.0.0.1",
    dialect: "postgres"
  }  
  };

  export default config;