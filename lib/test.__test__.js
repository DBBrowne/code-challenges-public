const test  = require('../lib/test')

function productFibElegant(prod){
  let [a, b] = [0, 1]
  while (a * b < prod) [a, b] = [b, a + b]
  return { a: a, b: b, c: a * b === prod }
}


const productFibTestCases = [
  [714, { a: 21,b: 34,c: true }],
  [800, { a: 34,b: 55,c: false }],
  [800, { a: 34,b: 55,c: false, d: 1 }]
]

test.byFunction(productFibElegant, productFibTestCases, true)