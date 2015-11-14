
function searchBook(needle, haystack) {
  var regex = new RegExp(needle, 'i')
  var results = []
  var keys = Object.keys(haystack)
  console.log("searching for " + needle)
  for (i=0; i < keys.length; i++) {
    var key = keys[i]
    var lineOfText = haystack[key]

    if (regex.test(lineOfText)) {
      var result = {}
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
    var txt = document.createTextNode(result.location + " " + result.text )
    p.appendChild(txt)
    searchResults.appendChild(p)
    console.log(results[i])
  }
}

//https://gist.github.com/dciccale/4087856
function domReady(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}
