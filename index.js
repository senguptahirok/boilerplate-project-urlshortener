require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const URL = require('url').URL;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
      
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl',function(req,res){
 let originalURL = req.body.url;
 let urlObj = new URL(originalURL);
 
 dns.lookup(urlObj.hostname, function(err, address, family){
   if (err) res.json({error: "invalid URL"});
   else{
     let shortURL = Math.floor(Math.random() * 100000).toString();
     let data = new Model({'original_url': originalURL, 'short_url': shortURL});
     data.save(function(err,data){
      if (err) return console.error(err);
     });
     res.json({'original_url': originalURL, 'short_url': shortURL});
   }
 }); 
});

// Your first API endpoint 
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
