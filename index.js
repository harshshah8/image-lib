const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});