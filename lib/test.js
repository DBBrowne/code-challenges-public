var fontColor = require('./fontColor')

var Test = module.exports

function testFn(fnToTest, testCase, showPass){
  const fnReturn = fnToTest(testCase[0])

  let assert 
  if (typeof fnReturn === 'object' && fnReturn !== null ) {
    // todo: consider strict assert mode  / assert.deepStrictEqual() / https://nodejs.org/api/assert.html
    const testKeys = Object.assign({}, Object.keys(testCase[1]), Object.keys(fnReturn))
    assert = Object.keys(testKeys).every(function (key) {
      return fnReturn[testKeys[key]] === testCase[1][testKeys[key]]
    })
  } else {
    assert = fnReturn === testCase[1]
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
