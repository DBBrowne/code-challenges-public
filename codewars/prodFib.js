const test  = require('../lib/test')

// fibonacci implementations

function memo(fnToMemo){
  var cache = {}

  return function (n){
    if (cache[n] !== undefined) {
      return cache[n]
    } else {
      const result = fnToMemo(n)
    
      cache[n] = result
      return result
    }
  }
  
  // memoizedFn[`${fnToMemo.name}Memo`].name = `${fnToMemo.name}Memo`
  // Object.defineProperty(memoizedFn[`${fnToMemo.name}Memo`], name, `memoized${fnToMemo.name}`)
  
  // return memoizedFn

}

// Untenably slow without memoization.  2minutes to calculate fib(50), vs 0.002ms for fibTwoMemo
// function fib (n) {
//   if (n <= 0) return 0
//   if (n === 1) return 1
//   return fib(n - 1) + fib(n - 2)
// }

//TODO: better memoization implementation for recursive functions
function basefibForMemo (n) {
  if (n <= 0) return 0
  if (n === 1) return 1
  return fibMemo(n - 1) + fibMemo(n - 2)
}
const fibMemo = memo(basefibForMemo)

function fibTwo (n) {
  let result = 0
  let prevResult = 0
  let prevPrevResult = 0
  for (let i = 0; i <= n;i++){
    prevPrevResult = prevResult
    prevResult = result
    result = prevResult + prevPrevResult
    if (i <= 0) result = 0
    if (i === 1) result = 1
  }
  return result
}

const fibTwoMemo = memo(fibTwo)

function fibElegantFromCodewars(n){
  let [a, b] = [0, 1]
  let i = 0
  while (i < n) {
    i++
    [a, b] = [b, a + b]
  }
  return a
}


const baseFibTestArray = [
  [0, 0],
  [1, 1],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 5],
  [6, 8],
  [7, 13],
  [8, 21],
  [19,4181],
  [22,17711],
  [30,832040],
  [21, 10946],
  [34, 5702887],
  [40,102334155],
  [50, 12586269025],
  // [60, 1548008755920],
  // [100, 354224848179262000000],
  // [1000, 4.346655768693743e+208],
  // [1476, 1.3069892237633987e+308]
]

const functionsToTest = [
  fibTwo,
  fibTwoMemo,
  // fib,
  fibMemo,
  fibElegantFromCodewars
]

test.byFunction(functionsToTest, baseFibTestArray)
test.byCase(functionsToTest, [baseFibTestArray[baseFibTestArray.length - 1]])



// https://www.codewars.com/kata/5541f58a944b85ce6d00006a/train/javascript

function productFib(targetProd){
  var prod = 0
  var fibIndex = -1
  var lowFibNumber = 0
  var hiFibNumber = 0
  var verified = false
  while (prod < targetProd) {
    fibIndex++
    lowFibNumber = hiFibNumber
    hiFibNumber = fibMemo(fibIndex + 1)
    prod = lowFibNumber * hiFibNumber
    if (prod === targetProd){
      verified = true
    }
  }
  return [lowFibNumber, hiFibNumber, verified]
}

function productFibElegant(prod){
  let [a, b] = [0, 1]
  while (a * b < prod) [a, b] = [b, a + b]
  return [a, b, a * b === prod]
}


const productFibTestCases = [
  [714, [21,34,true]],
  [800, [34,55,false]],
  [4895, [55, 89, true]],
  [5895, [89, 144, false]],
  [74049690, [6765, 10946, true]],
  [84049690, [10946, 17711, false]],
  [193864606, [10946, 17711, true]],
  [447577, [610, 987, false]],
  [602070, [610, 987, true]]
]

// test.byFunction(productFib, productFibTestCases, true)
// test.byFunction(productFibElegant, productFibTestCases, true)