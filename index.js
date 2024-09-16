require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dns = require('dns');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
/* Important Notes for self understanding
  These are the steps that are being followed in this task:
  1. To parse the URL in POST function, using body-parser package. The body-parser needs to be installed in the root directory, if 
  it is not installed earlier. 'npm install body-parser' is the command for installation of body-parser package.
  2. validate the url and return a short url using dns.lookup method. The dns package needs to be installed in the root directory, if
  it is not installed earlier. 'npm install dns' is the command for installation of dns package.
*/
app.use(cors());
      
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({extended: false}));
//let urlEncodedBody = bodyParser.urlencoded({extended: false});
//console.log('urlEncodedBody = ' + urlEncodedBody);

app.post('/api/shorturl',function(req,res){
  let host = Object.values(req.body);
  let originalURL = host;
  //  console.log('body parser (req._body) = '+ Object.values(req.body));
  console.log('host[0] before dns.lookup = ' + host[0]);
  console.log('host[1] before dns.lookup = ' + host[1]);
  console.log('host[2] before dns.lookup = ' + host[2]);
  console.log('host[3] before dns.lookup = ' + host[3]);
  
  host = host.toString();
  dns.lookup(host,function(err, address, family){
     console.log('host (inside dns.lookup) = ' + host);
     if (err)
       res.json({'error': 'invalid url'});
     else {
      let shortURL = Math.floor(Math.random() * 100000).toString();
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
