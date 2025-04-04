
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    id:{type:String},
    title:{type:String, required:true},
    author:{type:String, required:true},
    year:{type:Number, required:true},
    genre:{type:String, required:true},
    ratings:[{userId:{type:String}, grade:{type:Number}}],
    averageRating:{type:Number},
    imageUrl:{type:String, required:true}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;