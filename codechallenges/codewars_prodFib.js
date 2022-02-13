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

function fib (n) {
  if (n <= 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}

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



function testFn(fnToTest, testCase, showPass){
  const output = fnToTest(testCase[0])
  const assert = output === testCase[1]
  if (showPass){ 
    const testStatus = assert ? '✅' : `❌ ${output}`
    return [
      testCase,
      testStatus
    ]
  }
  if (!showPass && !assert){
    return [
      testCase,
      `❌ ${output}`
    ]
  }
}

function testFnAgainstCaseArray (fnToTest, testCaseArray, showPasses){
  const badUUID = Math.random()
  console._times.clear()
  console.time(`testing ${fnToTest.name} - ${badUUID}`)
  
  testCaseArray.forEach(testCase =>{
    const test = testFn(fnToTest, testCase, showPasses)
    test && console.log(test)
  }
  )

  console.timeEnd(`testing ${fnToTest.name} - ${badUUID}`)
  console._times.clear()
}
function testFunctionsAgainstArrayByFunction(functionArray, testCaseArray, showPasses){
  if (!Array.isArray(functionArray)) {
    functionArray = [functionArray]
  }
  console.log(`No. test cases: ${testCaseArray.length}`)
  functionArray.forEach(testFuncElement=>{
    console._times.clear()
    testFnAgainstCaseArray(testFuncElement, testCaseArray, showPasses)
    console._times.clear()
  })
}
function testFunctionsAgainstArrayByTestCase(fnsToTest, testCaseArray, showPasses){
  if (!Array.isArray(fnsToTest)){
    fnsToTest = [fnsToTest]
  }
  testCaseArray.forEach(testCase=>{
    console.log(testCase)
    fnsToTest.forEach(fnToTest=>{
      testFnAgainstCaseArray(fnToTest, [testCase], showPasses)
    })
  })
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
  [40,102334155],
  [50, 12586269025],
  [60, 1548008755920],
  [100, 354224848179262000000],
  [1000, 4.346655768693743e+208],
  [1476, 1.3069892237633987e+308]
]

const functionsToTest = [
  fibTwo,
  fibTwoMemo,
  // fib,
  fibMemo
]

testFunctionsAgainstArrayByFunction(functionsToTest, baseFibTestArray)
testFunctionsAgainstArrayByTestCase(functionsToTest, [baseFibTestArray[baseFibTestArray.length - 1]])



// https://www.codewars.com/kata/5541f58a944b85ce6d00006a/train/javascript

// function productFib(prod){
//   return basefib(prod)
// }

// ;[
// [4895, [55, 89, true]],
// [5895, [89, 144, false]],
// [74049690, [6765, 10946, true]],
// [84049690, [10946, 17711, false]],
// [193864606, [10946, 17711, true]],
// [447577, [610, 987, false]],
// [602070, [610, 987, true]]
// ].forEach(testCase =>{
//   const output = productFib(testCase[0])
//   output.forEach((result, index) =>{
//     const assert = result === testCase[1][index]
//     console.log(
//       testCase,
//       assert ? '✅' : `❌ ${output}`
//     )
//   })
// })