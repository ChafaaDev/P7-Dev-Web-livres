const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: String,
  title: String,
  author: String,
  year: Number,
  genre: String,
  ratings: [
    {
      userId: String,
      grade: Number,
    },
  ],
  averageRating: { type: Number, default: 0 },
  imageUrl: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
