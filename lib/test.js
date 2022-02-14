const fontColor = {
  fontGreen: '\x1b[32;1m',
  fontRed: '\x1b[31;1m',
  fontReset: '\x1b[0m',
  green: function (string){
    return this.fontGreen + string + this.fontReset
  },
  red: function (string){
    return this.fontRed + string + this.fontReset
  },
}

// const logger = {
//   green: function (string){
//     console.log(fontColor.green(string))
//   },
//   red: function (string){
//     console.log(fontColor.red(string))
//   },
// }


function testFn(fnToTest, testCase, showPass){
  const output = fnToTest(testCase[0])
  let assert 
  if (typeof output === 'object' && output !== null ) {
    const testKeys = Object.assign({}, Object.keys(testCase[1]), Object.keys(output))
    assert = Object.keys(testKeys).every(function (key) {
      return output[testKeys[key]] === testCase[1][testKeys[key]]
    })
  } else {
    assert = output === testCase[1]
  }
  
  if (showPass){ 
    const testStatus = assert ? '✅' : `❌ ${JSON.stringify(output)}`
    return [
      testCase,
      testStatus
    ]
  }
  if (!showPass && !assert){
    return [
      testCase,
      `❌ ${JSON.stringify(output)}`
    ]
  }
}

function testFnAgainstCaseArray (fnToTest, testCaseArray, showPasses){
  console.time(`testing ${fnToTest.name}`)
  
  testCaseArray.forEach(testCase =>{
    const test = testFn(fnToTest, testCase, showPasses)
    test && console.log(test[0], fontColor.red(test[1]))
  }
  )

  console.timeEnd(`testing ${fnToTest.name}`)
}
function testFunctionsAgainstArrayByFunction(functionArray, testCaseArray, showPasses){
  if (!Array.isArray(functionArray)) {
    functionArray = [functionArray]
  }
  console.group(fontColor.green(`No. test cases: ${testCaseArray.length}`))
  functionArray.forEach(testFuncElement=>{
    testFnAgainstCaseArray(testFuncElement, testCaseArray, showPasses)
  })
  console.groupEnd()
}
function testFunctionsAgainstArrayByTestCase(fnsToTest, testCaseArray, showPasses){
  if (!Array.isArray(fnsToTest)){
    fnsToTest = [fnsToTest]
  }
  testCaseArray.forEach(testCase=>{
    console.group(fontColor.green(`Test case: Input: ${testCase[0]} Out: ${testCase[1]}`))
    fnsToTest.forEach(fnToTest=>{
      testFnAgainstCaseArray(fnToTest, [testCase], showPasses)
    })
    console.groupEnd()
  })
}

module.exports =  {
  functionAgainstArray: testFnAgainstCaseArray,
  byFunction: testFunctionsAgainstArrayByFunction,
  byCase: testFunctionsAgainstArrayByTestCase,
}