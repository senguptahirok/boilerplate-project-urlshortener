require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dns = require('dns');
require('url');
// const parseURI = require('parse-uri');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
/* Important Notes for self understanding
  These are the steps that are being followed in this task:
  1. To parse the URL in POST function, using body-parser package. The body-parser needs to be installed in the root directory, if 
  it is not installed earlier. 'npm install body-parser' is the command for installation of body-parser package.
  2. The hostname was parsed out from the full URL. This was done with the assistance of the package url. It was installed in the 
  root directory 'npm install url' and then used in the source code.
  3. validate the url and return a short url using dns.lookup method. The dns package needs to be installed in the root directory, if
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

// let urlmap = {};
let shortURL = '';
let host01 = '';
app.post('/api/shorturl',function(req,res){
  host01 = Object.values(req.body);
  //  let originalURL = host;
  //  console.log('body parser (req._body) = '+ Object.values(req.body));
  //  console.log('type of host 1 = ' + typeof(host));
  /* host01 = host01.toString().valueOf(); */
  host01 = host01.toString();
  // console.log('host01 = ' + host01);
  let url01 = new URL(host01);
  console.log('hostname = ' + url01.hostname);
  console.log('typeOf hostname = ' + typeof(url01.hostname));
  //  let uri = parseURI(host01);
  // console.log('uri.hostname = ' + uri.hostname);
  // let url = new URL(host);
  // let hostName = url.hostname;
  // let { hostName } = new URL(host);
  // let hostName = host.hostname;
  // console.log('hostName = ' + hostName);
  // host = host.valueOf();
  // console.log('type of host 2 = ' + typeof(host));
  // console.log('host before lookup = ' + host);
  // console.log('host.hostname = ' + host.hostname);
  dns.lookup(url01.hostname,function(err, address, family){
  //     console.log('host (inside dns.lookup) = ' + host);
     if (err)
       res.json({'error': 'invalid url'});
     else {
       shortURL = Math.floor(Math.random() * 100000).toString();
  //     let urlmap = {host01: shortURL};
  //     res.json({'original_url': host01, 'short_url': shortURL}); 
  //     urlmap = {host01: shortURL};
       res.json({'original_url': host01, 'short_url': shortURL}); 
     }
  }); 
});

// let shortURLPath = __dirname + '/api/shorturl/' + shortURL;
/* app.get('/api/shorturl/' + shortURL,function(req,res){
  res.send(host01);
});*/
app.get('/api/shorturl/' + shortURL, function(req,res){
  res.sendFile(host01);
});


// Your first API endpoint 
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
