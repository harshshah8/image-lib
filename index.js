const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.static('uploads'));


const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const images = [];

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  
let lastImageId = 0;

app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = req.file.filename;
  const newImage = { id: ++lastImageId, url: imageUrl, title: '', isFavorite: false };
  images.push(newImage);
  res.json({ message: 'Image uploaded successfully', image: newImage });
});

app.put('/images/:id', (req, res) => {
  const imageId = parseInt(req.params.id);
  const { action, title } = req.body;

  const image = images.find(img => img.id === imageId);
  if (!image) {
    return res.status(404).json({ message: 'Image not found' });
  }

  if (action === 'favorite') {
    image.isFavorite = true;
  } else if (action === 'unfavorite') {
    image.isFavorite = false;
  } else if (action === 'title') {
    image.title = title;
  }

  res.json({ message: 'Image updated successfully' });
});

app.delete('/images/:id', (req, res) => {
  const imageId = parseInt(req.params.id);
  const imageIndex = images.findIndex(img => img.id === imageId);
  if (imageIndex === -1) {
    return res.status(404).json({ message: 'Image not found' });
  }
  images.splice(imageIndex, 1);
  res.json({ message: 'Image deleted successfully' });
});

app.get('/images', (req, res) => {
    res.json(images);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
