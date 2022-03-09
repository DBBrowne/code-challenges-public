var fontColor = require('./fontColor')

var Test = module.exports
function deepAssert(expected, actual){
  const directComparison = expected === actual
  if (directComparison) return true
  if (
    ['number', 'boolean', 'string'].some((type =>{
      return type === typeof expected || type === typeof actual
    })) ||
    null === expected || null === actual ||
    undefined === expected || undefined === actual
  ){
    return directComparison // Must be false, but need to eliminate non-enumerables before continuing.
  }


  const expectedKeys = Object.keys(expected)
  if (
    expectedKeys.length !== Object.keys(actual).length
  ) {
    return false
  }

  return expectedKeys.every((key) => {
    return deepAssert(expected[key], actual[key])
  })
}

function testFn(fnToTest, testCase, repeats = 1, showPass){
  const fnReturn = fnToTest(testCase[0])

  const assert = deepAssert(testCase[1], fnReturn)
  repeats--
  if (assert && repeats){
    for (let i = 0; i <= repeats; i++){
      fnToTest(testCase[0])
    }
  }

  const outputString = JSON.stringify(fnReturn)
  if (showPass){ 
    const testStatus = assert ? '✅' : `❌ ${outputString}`
    return [
      testCase,
      testStatus
    ]
  }
  if (!showPass && !assert){
    return [
      testCase,
      `❌ ${outputString}`
    ]
  }
}

Test.functionAgainstArray = function (fnToTest, testCaseArray, repeats = 1, showPasses){
  console.time(`testing ${fnToTest.name}`)
  
  testCaseArray.forEach(testCase =>{
    const test = testFn(fnToTest, testCase, repeats, showPasses)
    test && console.info(test[0], fontColor.red(test[1]))
  })

  console.timeEnd(`testing ${fnToTest.name}`)
}
Test.byFunction = function (functionArray, testCaseArray, repeats = 1, showPasses){
  if (!Array.isArray(functionArray)) {
    functionArray = [functionArray]
  }
  console.group(fontColor.green(`No. test cases: ${testCaseArray.length}`))
  functionArray.forEach(testFuncElement=>{
    Test.functionAgainstArray(testFuncElement, testCaseArray, repeats, showPasses)
  })
  console.groupEnd()
}
Test.byCase = function (fnsToTest, testCaseArray, repeats = 1 , showPasses){
  if (!Array.isArray(fnsToTest)){
    fnsToTest = [fnsToTest]
  }
  testCaseArray.forEach(testCase=>{
    console.group(fontColor.green(`Test case: Input: ${testCase[0]} Out: ${testCase[1]}`))
    fnsToTest.forEach(fnToTest=>{
      Test.functionAgainstArray(fnToTest, [testCase], repeats, showPasses)
    })
    console.groupEnd()
  })
}
