const express = require("express");
const router = express.Router();
const auth = require('../controllers/middleware/auth');
const multer = require('../controllers/middleware/multer-config')


const bookCtrl = require("../controllers/Book");

router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
// router.get('/bestrating', bookCtrl.getBesRatedBooks);
router.post("/",auth, multer, bookCtrl.createBook);
router.delete("/:id",  bookCtrl.deleteBook);
router.put("/:id", bookCtrl.updateBook);

module.exports = router;
