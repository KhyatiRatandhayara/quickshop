import express from "express";
import dotenv from "dotenv";
dotenv.config();

import router from '../routes/route.js'
// import multer from "multer";
import path from "path";
// import bodyParser from "body-parser";

const PORT = process.env.PORT || 8080;
const app = express();
// const upload = multer();
const __dirname = path.resolve();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
//   );


// Middleware to parse multipart/form-data
// app.use(upload.any()); // This will handle any multipart/form-data

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(`${__dirname}/public`));
// app.use('/uploads',express.static('uploads'));


app.use('/', router)


//server connection
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
  });