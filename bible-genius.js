//https://gist.github.com/dciccale/4087856
var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}

DOMReady(function () {
  main()
})

var main = function() {
  var searchForm = document.getElementById("searchForm")

  searchForm.onsubmit = function() {
    var value = document.getElementById("searchBox").value
    var results = search(value, bible.matthew)
    clearResults()
    display(results)
    return false
  }
}

function search(needle, haystack) {
  var regex = new RegExp(needle, 'i')
  var results = []
  var keys = Object.keys(haystack)
  console.log("searching for " + needle)
  for (i=0; i < keys.length; i++) {
    var key = keys[i]
    var line = haystack[key]
    if (regex.test(line)) {
      console.log("matched " + line)
      results.push(line)
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
  for (i = 0; i < results.length; i++) {
    var p = document.createElement("p")
    var txt = document.createTextNode(results[i])
    p.appendChild(txt)
    searchResults.appendChild(p)
    console.log(results[i])
  }
}
