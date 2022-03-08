var fontColor = require('./fontColor')

var Test = module.exports

function deepAssert(expected, actual){
  if (
    ['number', 'boolean', 'string'].some((type =>{
      return type === typeof expected
    })) ||
    null === expected ||
    undefined === expected 
  ){
    return expected === actual
  }
  const expectedKeys = Object.keys(expected)
  if (
    expectedKeys.length && 
    Object.keys(actual).length && 
    (expectedKeys.length !== Object.keys(actual).length)
  ) {
    return false
  }

  if (expectedKeys){
    return expectedKeys.every((key) => {
      return deepAssert(expected[key], actual[key])
    })
  }
}

function testFn(fnToTest, testCase, showPass){
  const fnReturn = fnToTest(testCase[0])

  const assert = deepAssert(testCase[1], fnReturn)

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

Test.functionAgainstArray = function (fnToTest, testCaseArray, showPasses){
  console.time(`testing ${fnToTest.name}`)
  
  testCaseArray.forEach(testCase =>{
    const test = testFn(fnToTest, testCase, showPasses)
    test && console.info(test[0], fontColor.red(test[1]))
  })

  console.timeEnd(`testing ${fnToTest.name}`)
}
Test.byFunction = function (functionArray, testCaseArray, showPasses){
  if (!Array.isArray(functionArray)) {
    functionArray = [functionArray]
  }
  console.group(fontColor.green(`No. test cases: ${testCaseArray.length}`))
  functionArray.forEach(testFuncElement=>{
    Test.functionAgainstArray(testFuncElement, testCaseArray, showPasses)
  })
  console.groupEnd()
}
Test.byCase = function (fnsToTest, testCaseArray, showPasses){
  if (!Array.isArray(fnsToTest)){
    fnsToTest = [fnsToTest]
  }
  testCaseArray.forEach(testCase=>{
    console.group(fontColor.green(`Test case: Input: ${testCase[0]} Out: ${testCase[1]}`))
    fnsToTest.forEach(fnToTest=>{
      Test.functionAgainstArray(fnToTest, [testCase], showPasses)
    })
    console.groupEnd()
  })
}
