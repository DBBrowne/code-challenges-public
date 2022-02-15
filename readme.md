# Code Challenges

A place to store and discuss code challenges


# lib/test.js
A super-simple testing lib that does not have any dependencies, to make it easier to verify success and learn a little more about the performance of various solutions.

Currently includes some operations outside of the functionToBeTested in the reported execution time, so can only be used for comparisons between functions, not absolutes (which would depend on hardware anyway).

On execution time:
  Writing to the console is expensive, so using `showPasses = true` slows execution.
  Failing a test cases causes a console write, which slows execution.

## Usage:
Within the code challenge file:
```
const test  = require('../lib/test')

function fnOne (n) {
  return n
}
function fnTwo(n) {
  return n+1
}

// Array of test cases, with each case in the format [input for test function, expected return from test function]

testCases = [
  [1,1],
  [2,2]
]
fnsToTest = [
  fnOne,
  fnTwo
]
```


## Test a function:
Executes functionToBeTested against each of the testCases, prints failures and total execution time:
```
test.functionAgainstArray(fnOne, testCases) 
```
-->
```
# node <pathToFile>
testing fnOne: 0.093ms
```

## Test several functions to compare failures and execution time across the array of inputs:
For each function in the fnsToTest argument, runs the function with each of the specified test cases, prints any failures to the console, reports the total execution time each function to complete ALL test cases:
```
test.byFunction(fnsToTest,testCases)
```
-->
```
No. test cases: 2
  testing fnOne: 0.008ms
  [ 1, 1 ] ❌ 2
  [ 2, 2 ] ❌ 3
  testing fnTwo: 0.167ms
```

## Test several functions and test cases to compare failures and execution time on a per-case basis
For each test case in the testCases array, execute each function against the specified test case and report the execution time for each function, grouped by test case:
```
test.byCase(fnsTotest, testCases)
```
-->
```
Test case: Input: 1 Out: 1
  testing fnOne: 0.004ms
  [ 1, 1 ] ❌ 2
  testing fnTwo: 0.1ms
Test case: Input: 2 Out: 2
  testing fnOne: 0.008ms
  [ 2, 2 ] ❌ 3
  testing fnTwo: 0.067ms
```


### Observe passing cases:
Each method also accepts an optional flag to report output from functions when successfully passing the test.
```
test.functionAgainstArray(fnOne, testCases, true)
test.byFunction(fnsToTest,testCases, true)
test.byCase(fnsToTest,testCases, true)
```
-->
```
```


## TODO
 - Best practices for  showing fn output in this readme?
 - Move these to GH Issues
 - automate updating this readme with a tree to make locating completed challenges easier? (bash script? incorporate Tree? commit hook?) 
 - Examine stdout vs console.log?  May help with testing the testing lib.
 - refactor tests of the testing library to give a pass/fail on expected behaviour rather than user observing for known outcomes.
 - refactor showPasses to {options} parameter in testFn
 - implement NOT flag in test suite