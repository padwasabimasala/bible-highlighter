require('./util')
var express = require('express');
var app = express();
var bible = require('./bible.mod').bible

exports.app = app

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/:book', function (req, res) {
  text = getText(req)
  res.send(text)
});

app.get('/:book/:chapter', function (req, res) {
  res.send('Your book and chapter is ' + req.params.book + ' ' + req.params.chapter)
});

app.get('/:book/:chapter/:verse', function (req, res) {
  res.send('Your book and chapter and verse is ' + req.params.book + ' ' + req.params.chapter + ' ' + req.params.verse)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function getText(req) {
	var book = bible[req.params.book.capitalize()]
  text = ""
  Object.keys(book).map(function(value, index) {
    text += book[value]
  })
  return text
}
