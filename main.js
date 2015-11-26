function Bible(text) {
  this.text = text
  this.search = function(searchText) {
    var regex = new RegExp(searchText, 'i')
    if (regex.test(searchText)) {
      return this.text
    } else {
      return []
    }
  }
}

function search(searchText, bible) {
  var results = []
  var allResults = []

  var keys = Object.keys(bible)
  for (i=0; i < keys.length; i++) {
    var bookName = keys[i]
    console.log("searching book " + i + " " + bookName)
  }
  bookName = "Matthew"
  results = searchBook(searchText, bible[bookName], bookName)
  console.log("returning " + results.length + " results")
  return results
}

function searchBook(needle, haystack, bookName) {
  var regex = new RegExp(needle, 'i')
  var results = []
  var keys = Object.keys(haystack)

  console.log("searching for " + needle)
  for (i=0; i < keys.length; i++) {
    var key = keys[i]
    var lineOfText = haystack[key]

    if (regex.test(lineOfText)) {
      var result = {}
      result.bookName = bookName
      result.location = key
      result.text = lineOfText
      results.push(result)
    }
  }

  console.log(results)
  return results
}

function clearResults() {
  var searchResults = document.getElementById("searchResults")
  while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
  }
}

function display(results) {
  var searchResults = document.getElementById("searchResults")
  for (i = 0; i < results.length; i++) {
    var result = results[i]
    var p = document.createElement("p")
    var txt = document.createTextNode(result.bookName + " " + result.location + " " + result.text )
    p.appendChild(txt)
    searchResults.appendChild(p)
    console.log(results[i])
  }
}

//https://gist.github.com/dciccale/4087856
function domReady(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}
