const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.json());

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
    });
    const upload = multer({ storage });

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
