function testFn(fnToTest, testCase, showPass){
  const output = fnToTest(testCase[0])
  // TODO: fix array (and object?) output comparisons
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
  console.time(`testing ${fnToTest.name}`)
  
  testCaseArray.forEach(testCase =>{
    const test = testFn(fnToTest, testCase, showPasses)
    test && console.log(test)
  }
  )

  console.timeEnd(`testing ${fnToTest.name}`)
}
function testFunctionsAgainstArrayByFunction(functionArray, testCaseArray, showPasses){
  if (!Array.isArray(functionArray)) {
    functionArray = [functionArray]
  }
  console.log(`No. test cases: ${testCaseArray.length}`)
  functionArray.forEach(testFuncElement=>{
    testFnAgainstCaseArray(testFuncElement, testCaseArray, showPasses)
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

module.exports =  {
  functionAgainstArray: testFnAgainstCaseArray,
  byFunction: testFunctionsAgainstArrayByFunction,
  byCase: testFunctionsAgainstArrayByTestCase,
}