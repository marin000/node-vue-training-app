// index.js

/**
 * Required External Modules
 */
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "4101";
const router = require('./router');
app.use(express.json());
app.use(router);

/**
 * DB connection
 */
const url = process.env.DB_URL;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});