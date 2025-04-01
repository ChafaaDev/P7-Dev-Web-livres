const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const mongoPw = process.env.mongo_pw;

mongoose
  .connect(
    `mongodb+srv://Chafaa:${mongoPw}@cluster0.edbuqhj.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => console.log("Connected to Mongodb successfully!"))
  .catch(() => console.log("Failed to connect to Mongodb"));
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });  

app.use('/', (req, res, next)=>{
    res.status(200).json({message:'that is the response'})
})

app.use(express.json());

module.exports = app