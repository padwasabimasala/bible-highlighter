require('./util')
var express = require('express');
var app = express();
var bible = require('./bible.mod').bible
var port = process.env['PORT'] || '3000'

exports.app = app

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/:book', function (req, res) {
  text = getText(req.params)
  res.send(text)
});

app.get('/:book/:chapter', function (req, res) {
  text = getText(req.params)
  res.send(text)
});

app.get('/:book/:chapter/:verse', function (req, res) {
  text = getText(req.params)
  res.send(text)
});

app.listen(port, function () {
  console.log('Example app listening on port ', port);
});

function getText(params) {
	var book = bible[params.book.capitalize()]
	var chapter = params.chapter
	var verse = params.verse
  if (chapter && verse) {
    chapter = String("000" + chapter).slice(-3)
    verse = String("000" + verse).slice(-3)
    ref = chapter + ":" + verse
    return book[ref]
  }
  text = ""
  Object.keys(book).map(function(value, index) {
    if (chapter) {
      chapter = String("000" + chapter).slice(-3)
      regex = new RegExp("^" + chapter + ":")
      if (value.match(regex))
        text += book[value] + " "
    } else {
      text += book[value]
    }
  })
  return text
}
