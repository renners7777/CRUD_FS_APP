console.log('May Node be with you')

const express = require('express')
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const app = express()
require("dotenv").config()
const port = 3000

MongoClient.connect("mongodb+srv://chrisrenshaw79:UaNPEv2veOWDufPG@stars-wars-db.wpj9yud.mongodb.net/?retryWrites=true&w=majority", (err, client) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
});

    app.listen(port, () => {
      console.log(`Server running on Port ${port}...`);
    });

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post("/quotes", (req, res) => {
    console.log(req.body);
});