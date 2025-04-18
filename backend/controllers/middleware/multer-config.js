const multer = require('multer');
const MIME_TYPES = {
    'image/jpeg': 'jpg',
    'image/jpg':'jpg',
    'image/png':'png'
}
const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null, 'images')
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + name + '.' + extension)
    }
})

module.exports = multer({storage:storage}).single('image');