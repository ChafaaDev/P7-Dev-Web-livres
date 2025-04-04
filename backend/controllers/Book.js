const Book = require('../models/Book')

exports.getAllBooks = (req, res)=>{
 Book.find()
 .then(books=>res.status(200).json(books))
 .catch(error => res.status(400).json({error}));
};

exports.createBook = (req,res)=>{
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id
    delete bookObject.userId
    const book = new Book({
        ...bookObject,
        userId:req.auth.userId,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    book.save()
    .then(()=>res.status(201).json({message: 'Book added with success', book}))
    .catch(error =>res.status(400).json({error}))
};

exports.getOneBook = (req, res)=>{
    Book.findOne({_id:req.params.id})
    .then((book) => res.status(200).json(book))
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
};

exports.getBesRatedBooks = (req, res) =>{
    Book.find({'ratings.grade':{$gt:3}})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({error, message:'No suck book found'}))
}