require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let urlDatabase = [];
// Your first API endpoint
app.post('/api/shorturl/', (req, res) => {
  if (!req.body.url.includes('http')) {
    res.json({ error: 'invalid url'})
    return
  }
  
  urlPair = {
    original_url: req.body.url,
    short_url: urlDatabase.length 
  }

  urlDatabase.push(urlPair)

  res.json(urlPair)
})

app.get('/api/shorturl/:shortUrlId', (req, res) => {
  let urlPair = urlDatabase.find(urlPair => urlPair.short_url === Number(req.params.shortUrlId))
  res.redirect(urlPair.original_url)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
