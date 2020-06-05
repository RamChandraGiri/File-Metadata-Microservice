'use strict';

var express = require('express');
var cors = require('cors');
// Require and using Multer
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// https://www.npmjs.com/package/multer
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

//Required API endpoint...
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next){
  // Receiving the file name, and size in bytes within the JSON response
  res.json({"name": req.file.originalname,"type":req.file.mimetype,"size":req.file.size});
  // To know what file informations we get console.log(req.file);
  next();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
