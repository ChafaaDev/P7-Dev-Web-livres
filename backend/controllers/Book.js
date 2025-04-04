const Book = require('../models/Book')

exports.getAllBooks = (req, res)=>{
 Book.find()
 .then(books=>res.status(200).json(books))
 .catch(error => res.status(400).json({error}));
};
exports.getBestRatedBooks = (req, res) =>{
    Book.find({})
    .sort({averageRating:-1})
    .limit(3)
    .then(topBooks => res.status(200).json(topBooks))
    .catch(error => res.status(400).json({error, message:'No such book found'}))
};
exports.createBook = (req,res)=>{
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._ObjectId
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

exports.rateOneBook = (req, res)=>{
    Book.updateOne({_id:req.params.id})
    const newRate = new Book.averageRating({
        userId:req.auth.userId,
        averageRating:req.body.averageRating
    })
    newRate.save()
    .then(rating => res.status.json({rating}))
    .catch(error => res.status(400).json({error}))
}

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

