import express from "express";
import dotenv from "dotenv";
dotenv.config();

import router from '../routes/route.js'

const PORT = process.env.PORT || 5000;
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/', router)


//server connection
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
  });