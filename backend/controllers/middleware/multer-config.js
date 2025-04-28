const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/avif':'avif',
  'image/webp':'webp'
};


const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');


const processImage = async (req, res, next) => {
  if (!req.file) return next(); 

  const extension = MIME_TYPES[req.file.mimetype];
  if (!extension) return res.status(400).send('Unsupported file type');

  const filename = `${Date.now()}_${req.file.originalname.split(' ').join('_')}`;
  const outputDir = path.join(__dirname, '..','..','images');
  const outputPath = path.join(outputDir, filename);

  try {
    await sharp(req.file.buffer)
      .resize(800)
      .toFormat(extension, { quality: 80 }) 
      .toFile(outputPath);

    req.file.optimizedFilename = filename; 
    next();
  } catch (err) {
    console.error('Sharp error:', err);
    res.status(500).send('Image processing failed');
  }
};

module.exports = {
  upload,
  processImage
};
