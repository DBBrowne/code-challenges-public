// unnecessary path length for clarity.
const test  = require('../lib/test')

function fnOne (n) {
  return n
}
function fnTwo(n) {
  return n + 1
}

// Array of test cases, with each case in the format [input for test function, expected return from test function]

const testCases = [
  [1,1],
  [2,2]
]
const fnsToTest = [
  fnOne,
  fnTwo
]

test.functionAgainstArray(fnOne, testCases) 

test.byFunction(fnsToTest,testCases)

test.byCase(fnsToTest, testCases)

console.info('\n\nWith \'showPasses\' = true :')
test.functionAgainstArray(fnOne, testCases, true)
test.byFunction(fnsToTest,testCases, true)
test.byCase(fnsToTest,testCases, true)