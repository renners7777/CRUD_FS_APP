console.log('May Node be with you')

const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config()
const port = 3000
const connectionString =
  "mongodb+srv://chrisrenshaw79:fdgByzMtYtALwH4H@star-wars-cluster.dsexylg.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database")
    const db = client.db("star-wars-db")
    const quotesCollection = db.collection("quotes")

        app.set("view engine", "ejs");

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.get("/", (req, res) => {
          quotesCollection.find().toArray()
          .then(quotes => {
            res.render('index.ejs', { quotes: quotes })
          })
          .catch(error => console.error(error)) 
        })

        app.post('/quotes', (req, res) => {
          quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {
          quotesCollection.findOneAndUpdate(
            {name: "Yoda"},
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote
              },
            },
            {
              upsert: true
            }
          )
            .then(result => {
              res.json('Success')
            })
            .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
          quotesCollection
            .deleteOne({ name: req.body.name })
            .then(result => {
              if (result.deletedCount === 0) {
                return res.json('No quote to delete')
              }
              res.json("Deleted Darth Vader's quote")
            })
            .catch(error => console.error(error))
        })

  
        app.listen(port, () => {
          console.log(`listening on port ${port}`);
        })   
  })
  .catch(error => console.error(error))