const test  = require('../lib/test')

// https://www.codewars.com/kata/550f22f4d758534c1100025a
const opposites = {
  NORTH: 'SOUTH',
  SOUTH: 'NORTH',
  EAST: 'WEST',
  WEST: 'EAST',
}


function dirReduc (array) {
  let recurse = 0
  let _array = [...array]
  _array.forEach((e,i) => {
    if (e === opposites[_array[i + 1]]){
      _array.splice(i,2)
      recurse = 1
    }
  })
  if (recurse) {
    _array = dirReduc(_array)
  }
  return _array
}

function dirReducRegex(arr) {
  var str = arr.join(''), pattern = /NORTHSOUTH|EASTWEST|SOUTHNORTH|WESTEAST/
  while (pattern.test(str)) str = str.replace(pattern,'')
  return str.match(/(NORTH|SOUTH|EAST|WEST)/g) || []
}

function dirReducReduce(arr){
  return arr.reduce(function (acc, curr) {
    opposites[acc.slice(-1)] === curr ? acc.pop() : acc.push(curr)
    return acc
  }, [])
}


const testCases = [
  [['NORTH', 'SOUTH', 'SOUTH', 'EAST', 'WEST', 'NORTH', 'WEST'], ['WEST']],
  [['NORTH', 'WEST', 'SOUTH', 'EAST'], ['NORTH', 'WEST', 'SOUTH', 'EAST']],
  [['NORTH', 'SOUTH', 'EAST', 'WEST', 'EAST', 'WEST'], []]
]
const fnsToTest = [
  dirReduc,
  dirReducRegex,
  dirReducReduce
]

test.byFunction(fnsToTest, testCases)