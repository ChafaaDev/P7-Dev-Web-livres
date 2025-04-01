const Book = require('../models/Book')

exports.getAllBooks = (req, res)=>{
 Book.find()
 .then(books=>res.status(200).json({books}))
 .catch(error => res.status(400).json({error}));
};

exports.createBook = (req,res)=>{
    delete req.body._id
    const book = new Book({
        ...req.body
    })
    book.save()
    .then(()=>res.status(201).json({message: 'Book added with success'}))
    .catch(error =>res.status(400).json({error}))
};

exports.getOneBook = (req, res)=>{
    Book.findOne({_id:req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({error}))
};

exports.updateBook = (req, res) => {
    Book.updateOne({...req.body ,_id:req.params.id})
    .then(()=>res.status(201).json({message:'Book updated successfully'}))
    .catch(error => res.status(500).json({error}))
};

exports.deleteBook = (req, res)=>{
    Book.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'Book deleted with success'}))
    .catch(error => res.status(500).json({error}))
}