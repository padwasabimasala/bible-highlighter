function getChapter(ref) {
  return ref.split(":").shift().split(/^0/).pop().split(/^0/).pop()
}

function getVerse (ref) {
  return ref.split(":").pop().split(/^0/).pop().split(/^0/).pop()
}

function oncePerValue(func) {
  var values = new Set()
  return function(v) {
    if (!values.has(v)) {
      values.add(v)
      return func(v)
    }
  }
}

function doEach(/* func1, [func2, [etc */) {
  var funcs = Object.values(arguments)
  return function(v) {
    return funcs.map(function(f) { return f(v) })
  }
}

function chapterStr(num) {
  return `<span class="chapterNum">${num}</span>`
}

function verseStr(num) {
  return `<span class="verseNum">${ num}</span>`
}

function chapterOnce() {
  var func = oncePerValue(chapterStr)
  return function(v) {
    return func(getChapter(v.slice(0).shift()))
  }
}
