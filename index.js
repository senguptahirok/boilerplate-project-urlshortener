require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
//const url = require('url').URL;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
      
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//app.use(url());

app.post('/api/shorturl',function(req,res){
  let originalURL = ' ';
  let shortURL = ' ';
  res.json({'original_url': originalURL, 'short_url': shortURL});
});

// Your first API endpoint 
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
