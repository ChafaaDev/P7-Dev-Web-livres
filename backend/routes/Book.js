const express = require("express");
const router = express.Router();
const auth = require('../controllers/middleware/auth');
const {upload, processImage } = require('../controllers/middleware/multer-config')

const bookCtrl = require("../controllers/Book");

router.get("/", bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBestRatedBooks);
router.get("/:id",bookCtrl.getOneBook);
router.post("/",auth, upload, processImage, bookCtrl.createBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post('/:id/rating',auth, bookCtrl.rateOneBook);
router.put("/:id",auth,upload,processImage, bookCtrl.updateBook);

module.exports = router;
