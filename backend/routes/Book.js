const express = require('express');
const router = express.Router();

const Book = require('../models/Book')

router.get('/', (req, res, next)=>{
   Book.find()
   .then(books =>{
    res.status(200).json({books})
   })
})