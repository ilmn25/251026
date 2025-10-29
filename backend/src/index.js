const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 80;
const ROOTPATH = path.resolve(__dirname, '../../');
const { BACKEND_URL, DATA_PATH } = require('../../URL.js');

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, DATA_PATH);
  // },
  // filename: (req, file, cb) => {
  //   cb(null, decodeURIComponent(file.originalname));
  // }
});

const upload = multer({ storage });

app.use(express.static(path.join(ROOTPATH, 'web/dist')));
app.use(express.static(DATA_PATH));

app.use(cors({
  origin: 'http://localhost:5174', // your frontend origin
  methods: ['GET', 'POST'],
}));

// ====================================================================================

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOTPATH, 'web/dist/index.html'));
});

app.get('/download', (req, res) => {
  if (req.query.file === undefined) {
    ReturnList();
  }
  else {
    ReturnFile();
  }

  function ReturnList(){
    const uploadsDir = path.join(DATA_PATH);
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        res.status(500).send('Error reading upload directory');
      } else {
        res.json({ files });
      }
    });
  }

  function ReturnFile() {
    const filePath = path.join(DATA_PATH, req.query.file);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).send('File not found: ' + filePath);
      } else {
        res.download(filePath);
      }
    });
  }
});

// ====================================================================================

// start ngrok tunnel
const { exec } = require('child_process');
exec('ngrok http 80', (error, stdout, stderr) => {
  console.log(`ngrok output:\n${stdout}`);
});

// start localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at ` + BACKEND_URL);
  console.log(`Server Storage at ` + DATA_PATH);
});
