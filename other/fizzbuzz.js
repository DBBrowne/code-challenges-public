function fizzbuzzSensible(n){
  let out = ''
  if(!(n%3)) out += 'fizz'
  if(!(n%5)) out += 'buzz'
  
  if(!out.length) return String(n)
  return out
}
function fizzbuzzSensibleWrapper(n){
  let out = []
  for (let i=1;i<=n;i++){
    out.push(fizzbuzzSensible(i))
  }
  return out
}

const fizzout = {
  0 : 'fizzbuzz',
  10: 'buzz',
  20: 'buzz',
  1 : 'fizz',
  2 : 'fizz',
  3 : 'fizz',
  4 : 'fizz',
  // 100: '0',
  // get 11() {
  //   return this[100]
  // },
  // get 12() {
  //   return this[100]
  // },
  // get 13() {
  //   return this[100]
  // },
  // get 14() {
  //   return this[100]
  // },
  // get 21() {
  //   return this[100]
  // },
  // get 22() {
  //   return this[100]
  // },
  // get 23() {
  //   return this[100]
  // },
  // get 24() {
  //   return this[100]
  // },
}

// console.log(n%3*10 + n%5,fizzout[
//   n%3*10 + n%5
// ])
function fizzbuzzDubious(n){   
  return fizzout[
    n%3*10 + n%5
  ] || String(n)
}
function fizzbuzzDubiousWrapper(n){//}, _fizzout=fizzout){
  let out = []
  for (let i=1;i<=n;i++){
    // _fizzout[100] = String(i)
    out.push(fizzbuzzDubious(i))
  }
  return out
}

// ******************
// *** Test
const test  = require('../lib/test')

const testCases = [
  // [
  //   15,
  //   fizzbuzzSensibleWrapper(15)
  // ],
  [
    1_000_000,
    fizzbuzzSensibleWrapper(1_000_000)
  ],
]

const functionsToTest = [
  fizzbuzzSensibleWrapper,
  fizzbuzzDubiousWrapper,
  fizzbuzzSensibleWrapper,
  fizzbuzzSensibleWrapper,
  fizzbuzzDubiousWrapper,
  fizzbuzzDubiousWrapper,
]


test.byFunction(functionsToTest, testCases)