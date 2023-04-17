console.log('May Node be with you')

const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config()
const port = 3000
const connectionString =
  "mongodb+srv://chrisrenshaw79:fdgByzMtYtALwH4H@star-wars-cluster.dsexylg.mongodb.net/?retryWrites=true&w=majority";

        app.set("view engine", "ejs");

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database")
    const db = client.db("star-wars-db")
    const quotesCollection = db.collection("quotes")

        app.use(bodyParser.urlencoded({ extended: true }))
        app.post("/quotes", (req, res) => {
        quotesCollection.insertOne(req.body).then((res) => {
          res.redirect("/")
        })
         .catch(error => console.error(error))
})

        app.get("/", (req, res) => {
          res.sendFile(__dirname + "/index.html");
        })
        app.listen(port, () => {
          console.log(`listening on ${port}`);
        })
      })
          .catch((error) => console.error(error))