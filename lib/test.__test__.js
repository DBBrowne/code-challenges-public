const test  = require('../lib/test')

function productFibElegant(prod){
  if (901 === prod) return { a: 34, b: 55 , c: [1,2] }
  let [a, b] = [0, 1]
  while (a * b < prod) [a, b] = [b, a + b]
  return { a: a, b: b, c: a * b === prod }
}


const productFibTestCases = [
  [714, { a: 21,b: 34,c: true }],
  [800, { a: 34,b: 55,c: false }],
  [800, { a: 34,b: 55,c: false, d: 1 }], // should fail - extra prop with primative value
  [900, { a: 34,b: 55,c: false, d: [1, 2] }], // should fail - extra prop with complex value
  [901, { a: 34,b: 55 }] // should fail - extra prop on actual
]

console.log('final three cases should fail.')
test.byFunction(productFibElegant, productFibTestCases, 1, true)