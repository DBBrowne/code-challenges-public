# Code Challenges

A place to store and discuss code challenges


# lib/test.js
A super-simple testing lib with 0 dependencies, to make it easier to verify success and learn a little more about the performance of various solutions.

Currently includes some operations outside of the functionToBeTested in the reported execution time, so can only be used for comparisons between functions, not absolutes (which would depend on hardware anyway).

On execution time:
- Writing to the console is expensive, so using `showPasses = true` slows execution.
- Failing a test case causes a console write, which slows execution.

## Usage:
See [lib/demo.js](https://github.com/DBBrowne/code-challenges-public/blob/main/lib/demo.js). Or run the demo with 
```console
$ node <repo-root>/lib/demo.js
```

Within the code challenge file:
```javascript
const test  = require('../lib/test')

function fnOne (n) {
  return n
}
function fnTwo(n) {
  return n+1
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
```


## Test a function:
Executes functionToBeTested against each of the testCases, prints failures and total execution time:
```javascript
test.functionAgainstArray(fnOne, testCases) 
```
-->
```console
$ node <pathToFile>
testing fnOne: 0.093ms
```

## Test several functions to compare failures and execution time across the array of inputs:
For each function in the fnsToTest argument, runs the function with each of the specified test cases, prints any failures to the console, reports the total execution time each function to complete ALL test cases:
```javascript
test.byFunction(fnsToTest,testCases)
```
-->
```console
$ node <pathToFile>
No. test cases: 2
  testing fnOne: 0.008ms
  [ 1, 1 ] ❌ 2
  [ 2, 2 ] ❌ 3
  testing fnTwo: 0.167ms
```

## Test several functions and test cases to compare failures and execution time on a per-case basis
For each test case in the testCases array, execute each function against the specified test case and report the execution time for each function, grouped by test case:
```javascript
test.byCase(fnsTotest, testCases)
```
-->
```console
$ node <pathToFile>
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
```javascript
test.functionAgainstArray(fnOne, testCases, true)
test.byFunction(fnsToTest,testCases, true)
test.byCase(fnsToTest,testCases, true)
```
-->
```console
$ node <pathToFile>
[ 1, 1 ] ✅
[ 2, 2 ] ✅
testing fnOne: 0.139ms
No. test cases: 2
  [ 1, 1 ] ✅
  [ 2, 2 ] ✅
  testing fnOne: 0.107ms
  [ 1, 1 ] ❌ 2
  [ 2, 2 ] ❌ 3
  testing fnTwo: 0.803ms
Test case: Input: 1 Out: 1
  [ 1, 1 ] ✅
  testing fnOne: 0.055ms
  [ 1, 1 ] ❌ 2
  testing fnTwo: 0.051ms
Test case: Input: 2 Out: 2
  [ 2, 2 ] ✅
  testing fnOne: 0.05ms
  [ 2, 2 ] ❌ 3
  testing fnTwo: 0.051ms
```


## TODO
  - fix circular reference induced by testing directionsreduction.js
 - jsdoc docstrings
 - Survive circular references.
 - Move these to GH Issues
 - Automate updating this readme with a tree to make locating completed challenges easier? (bash script? incorporate Tree? commit hook?) 
 - Examine stdout vs console.info?  May help with testing the testing lib.
 - Refactor tests of the testing library to give a pass/fail on expected behaviour rather than user observing for known outcomes.
 - Refactor showPasses to {options} parameter in testFn
 - Implement NOT flag in test suite
 - Implement option for gathering performance data without printing failures to console