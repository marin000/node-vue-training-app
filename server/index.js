// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const url = `mongodb+srv://marin:marin@cluster0.6sk15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const Item = require("./Models/Item");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "4101";
app.use(express.json())
/**
 *  db Configuration
 */

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
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.status(200).send("NodeJS server response");
});

app.route('/item')
  .get(function (req, res) {
    Item.find({}, function (err, data) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.json(data);
      }
    });
  })
  .post(function (req, res) {
    var newItem = Item(req.body);
    newItem.save(function (err, data) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.status(201).send(data);
      }
    });
  });

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});