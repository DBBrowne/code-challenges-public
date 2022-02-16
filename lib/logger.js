var fontColor = require('./fontColor')

function green (string){
  console.log(fontColor.green(string))
}
function red (string){
  console.log(fontColor.red(string))
}

module.exports = {
  green,
  red,
}