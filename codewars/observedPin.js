// https://www.codewars.com/kata/5263c6999e0f40dee200059d/train/javascript
// qn. is based on node v8.1.3, therefore:
function flattenPolyfill(array){
  return [].concat.apply([], array)
}

// const pinpad = [[1,2,3],[4,5,6],[7,8,9],[null,0,null]]
// hacky
const potentials = {
  '0': ['0','8'],
  '1': ['1','2','4'],
  '2': ['1','2','3','5'],
  '3': ['2','3','6'],
  '4': ['1','4','5','7'],
  '5': ['2','4','5','6','8'],
  '6': ['3','5','6','9'],
  '7': ['4','7','8'],
  '8': ['5','7','8','9','0'],
  '9': ['6','8','9'],
}
function getPotentialsFromDigit(digit){
  return potentials[digit]
}


function getAllPotentials(observed){
  const cache = {}
  const allPotentials = observed.split('').map(digit=>{
    let cached = cache[digit]
    if (cached) return cached

    cached = getPotentialsFromDigit(digit)
    cache[digit] = cached
    return cached
  })
  return allPotentials
}
// function getPermutations(options){
//   // console.log(options)
//   if (1 >= options.length) return options


//   // for each option
//   // for each case
//   // each case of each other option
//   return options[0].map((option, i)=>{
//     return options[options.length - 1].map(leaf=>option + leaf)
//   })
// }

function getPermutationsTwo(options){
  // step back through potential entires, multiplying each array by potentials for previous button
  let returnArray = options[options.length - 1]
  
  for (var i = options.length - 2;i >= 0;i--){
    returnArray = flattenPolyfill(
      options[i].map(item=>{
        return returnArray.map(previous=>{
          return item + previous
        })
      })
    )
  }
  return returnArray
}

function getPINs(observed) {
  const potentialDigits = getAllPotentials(observed)
  return flattenPolyfill(getPermutationsTwo(potentialDigits))
}

// WIP
// eslint-disable-next-line no-unused-vars
function getPermutationsRecursive(options){
  // console.log(options)
  if (1 >= options.length) return options


  // for each option
  // for each case
  // each case of each other option
  // WIP
  // eslint-disable-next-line no-unused-vars
  return options.map((option, i)=>{
    const perms = getPermutationsRecursive(options[options.length - 1])
    // options[options.length - 1].map(leaf=>option + leaf)
    return perms.map(leaf=>option + leaf)
  })
}

// **************************************************************
// Testing

var test = require('../lib/test')
const potentialDigitsTestCases = [
  [5, ['2','4','5','6','8']],
  [1, ['1','2','4']],
  [6, ['3','5','6','9']],
  [8, ['5','7','8','9','0']]
]
test.byFunction(getPotentialsFromDigit, potentialDigitsTestCases)

const fnsToTst = [
  getPINs
]
const testCases = [
  ['8', ['5', '7', '8', '9', '0']],
  ['11', ['11','12','14','21','22','24','41','42','44']],
  ['369', ['236','238','239','256','258','259','266','268','269','296','298','299','336','338','339','356','358','359','366','368','369','396','398','399','636','638','639','656','658','659','666','668','669','696','698','699']]
]
test.byFunction(fnsToTst, testCases)