const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 80;
const ROOTPATH = path.resolve(__dirname, '../../');
const { BACKEND_URL, DATA_PATH, PASSWORD } = require('../../URL.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DATA_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, decodeURIComponent(file.originalname));
  }
}); // dont remove
const upload = multer({ storage });

app.use(express.static(path.join(ROOTPATH, 'web/dist')));
app.use(express.static(DATA_PATH));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

// ==================================
function security(req, res, next) {
  const provided = req.headers['password'] || req.query.password;
  if (provided === PASSWORD) next();
  else res.status(401).json({ error: "Unauthorized" });
}

app.post('/auth', (req, res) => {
  if (req.body?.password === PASSWORD)
    res.status(200).send("OK");
  else
    res.status(401).send("Invalid password");
});

// ====================================================================================

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOTPATH, 'web/dist/index.html'));
});

app.post('/upload', security, upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

// Protect download
app.get('/download', security, (req, res) => {
  if (req.query.file === undefined) ReturnList();
  else ReturnFile();

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
exec('ngrok http 80' , (error, stdout) => {
  console.log(`ngrok output:\n${stdout}`);
});

// start localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at ` + BACKEND_URL);
  console.log(`Server Storage at ` + DATA_PATH);
});
