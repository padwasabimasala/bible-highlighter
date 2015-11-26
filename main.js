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

  var keys = Object.keys(bible)
  for (var i=0; i < keys.length; i++) {
    console.log("searching book " + i + " " + bookName)
    var bookName = keys[i]
    var bookResults = searchBook(searchText, bible[bookName], bookName)
    results = results.concat(bookResults)
  }

  console.log("returning " + results.length + " results")
  return results
}

function searchBook(needle, haystack, bookName) {
  var regex = new RegExp(needle, 'i')
  var results = []
  var keys = Object.keys(haystack)

  console.log("searching book " + bookName + " for " + needle)
  for (var i=0; i < keys.length; i++) {
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
  for (var i = 0; i < results.length; i++) {
    var result = results[i]
    var container = document.createElement("div")
    var closeButton = createElementWithText("span", "x")
    closeButton.onclick = function() { this.parentNode.parentNode.removeChild(this.parentNode); console.log("click") }
    var p = createElementWithText("p", result.bookName + " " + result.location + " " + result.text)
    container.appendChild(closeButton)
    container.appendChild(p)
    searchResults.appendChild(container)
  }
}

function createElementWithText(tagName, text) {
    var elm = document.createElement(tagName)
    var txt = document.createTextNode(text)
    elm.appendChild(txt)
    return elm
}

//https://gist.github.com/dciccale/4087856
function domReady(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}
