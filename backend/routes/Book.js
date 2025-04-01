const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const bookCtrl = require("../controllers/Book");
router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.post("/:id", bookCtrl.createBook);
router.delete("/:id", bookCtrl.deleteBook);
router.put("/:id", bookCtrl.updateBook);

module.exports = router;
