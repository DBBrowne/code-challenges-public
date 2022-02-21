var fontColor = require('./fontColor')

function green (string){
  console.info(fontColor.green(string))
}
function red (string){
  console.info(fontColor.red(string))
}

module.exports = {
  green,
  red,
}