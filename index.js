const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.di0ox.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()
const port = 5000;

app.get('/', (req, res) => {
 res.send('working')

})

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("freshValley").collection("products");

  app.get('/products', (req, res) => {
    productsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })

  })

  app.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    console.log(newProduct)
    productsCollection.insertOne(newProduct)
      .then(result => {
        console.log(result);
        res.send(result.insertedCount)
      })
  })


});


app.listen( process.env.PORT || port)