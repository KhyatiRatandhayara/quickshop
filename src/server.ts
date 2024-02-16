import express from "express";
import dotenv from "dotenv";
dotenv.config();

import router from '../routes/route.js'

const PORT = process.env.PORT || 8080;
const app = express();


app.use(express.json());

app.use('/', router)


//server connection
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });