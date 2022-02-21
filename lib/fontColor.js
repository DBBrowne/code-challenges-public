var fontColor = module.exports

const escape = '\x1b'
const fontReset = '\x1b[0m'

const fontGreen = '[32;1m'
const fontRed = '[31;1m'

fontColor.color = function (string, ansicode) {
  return escape + ansicode + string + fontReset
}
fontColor.colorFn = function(ansicode){
  return function (string) {
    return fontColor.color( string, ansicode)
  }
}

fontColor.green = fontColor.colorFn(fontGreen)
fontColor.red = fontColor.colorFn(fontRed)
