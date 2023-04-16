console.log('May Node be with you')

const express = require('express')
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const app = express()
require("dotenv").config()

MongoClient.connect(process.env.DB_STRING, (err, client) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
});

    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server running on Port 8000...`);
    });

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post("/quotes", (req, res) => {
    console.log(req.body);
});