require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
      
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({ extended: false}));
let urlEncodedBody = bodyParser.urlencoded({extended: false});
//console.log('urlEncodedBody = ' + urlEncodedBody);

app.post('/api/shorturl',function(req,res){
  let shortURL = 'empty';
  let originalURL = 'empty';
  console.log('body parser (req._body) = '+ Object.values(req.body));
/*    req.dns.lookup(host,function(req,res){
    originalURL = host; 
  }); */
  
  res.json({'original_url': originalURL, 'short_url': shortURL});
});

// Your first API endpoint 
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
