const express = require("express");
const router = express.Router();
const auth = require('../controllers/middleware/auth');
const multer = require('../controllers/middleware/multer-config')
const Book = require("../models/Book");
const bookCtrl = require("../controllers/Book");

router.get("/",auth, bookCtrl.getAllBooks);
router.get("/:id",auth, bookCtrl.getOneBook);
router.post("/:id",auth,multer, bookCtrl.createBook);
router.delete("/:id",auth, bookCtrl.deleteBook);
router.put("/:id",auth, bookCtrl.updateBook);

module.exports = router;
