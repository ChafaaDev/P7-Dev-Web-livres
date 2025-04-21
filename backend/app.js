const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/Book')
const mongoPw = process.env.mongo_pw;

const bookRoutes = require('./routes/Book');
const userRoutes = require('./routes/user')
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
  app.use((_, res, next) => {
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
  
  app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/images', express.static('./images'))


 


   


module.exports = app;