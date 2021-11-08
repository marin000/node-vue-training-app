// index.js

/**
 * Required External Modules
 */
const express = require("express");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "4101";
const router = require('./router');
app.use(express.json());
app.use(router);

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});