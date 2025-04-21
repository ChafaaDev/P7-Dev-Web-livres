const Book = require("../models/Book");
const User = require("../models/User");
const auth = require("../controllers/middleware/auth");
exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
exports.getBestRatedBooks = (req, res) => {
  Book.find({})
    .sort({ averageRating: -1 })
    .limit(3)
    .then((topBooks) => res.status(200).json(topBooks))
    .catch((error) =>
      res.status(400).json({ error, message: "No such book found" })
    );
};
exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() =>
      res.status(201).json({ message: "Book added with success", book })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneBook = async (req, res) => {
  const { id } = req.params;
  await Book.findOne({ _id: id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

exports.rateOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth.userId;
    const grade = req.body.rating;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if user has already rated
    const existingRating = book.ratings.find(
      (r) => r.userId.toString() === userId
    );

    if (existingRating) {
      existingRating.grade = grade;
    } else {
      book.ratings.push({ userId, grade });
    }

    // Calculate new average
    const calculateAverageRating = (ratings) => {
      if (ratings.length === 0) return 0;
      const total = ratings.reduce((sum, r) => sum + Number(r.grade), 0);
      return Number(total / ratings.length).toFixed(1);
    };

    book.averageRating = calculateAverageRating(book.ratings);

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error("Error rating", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };
    const update = req.body;
    const bookObject = JSON.parse(req.body.book);
    let book = await Book.updateOne(filter, {
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });

    return res.status(201).json({ message: "Book updated with success!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.deleteBook = (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Book deleted with success" }))
    .catch((error) => res.status(500).json({ error }));
};
