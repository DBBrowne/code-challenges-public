const escape = '\x1b'
const fontReset = '\x1b[0m'

const fontGreen = '[32;1m'
const fontRed = '[31;1m'

function color(string, ansicode) {
  return escape + ansicode + string + fontReset
}
function colorFn(ansicode){
  return function (string) {
    return color( string, ansicode)
  }
}

const green = colorFn(fontGreen)
const red = colorFn(fontRed)

module.exports = {
  color,
  colorFn,
  green,
  red,
}