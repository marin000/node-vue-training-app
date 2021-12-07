// index.js

/**
 * Required External Modules
 */
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config()

/**
 * App Variables
 */
 const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "To-do app API",
			version: "1.0.0",
			description: "A simple to-do app API",
		},
		servers: [
			{
				url: "http://localhost:4101",
			},
		],
	},
	apis: ["./server/docs/**/*.yaml"],
};
const specs = swaggerJsDoc(options);

const app = express();
const port = process.env.PORT || 4101;
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
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