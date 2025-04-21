const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png'
};

// Multer config: store in memory
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

// Middleware chain: upload first, then sharp
const processImage = async (req, res, next) => {
  if (!req.file) return next(); // No image uploaded

  const extension = MIME_TYPES[req.file.mimetype];
  if (!extension) return res.status(400).send('Unsupported file type');

  const filename = `${Date.now()}_${req.file.originalname.split(' ').join('_')}`;
  const outputDir = path.join(__dirname, '..','..','images');
  const outputPath = path.join(outputDir, filename);

  try {
    // if (!fs.existsSync(outputDir)) {
    //     fs.mkdirSync(outputDir, { recursive: true });
    // }
    await sharp(req.file.buffer)
      .resize(800) // Resize to width 800px, adjust as needed
      .toFormat(extension, { quality: 80 }) // Compression quality
      .toFile(outputPath);

    req.file.optimizedFilename = filename; // Optionally pass filename down the chain
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
