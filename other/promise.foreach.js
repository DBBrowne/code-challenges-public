// https://github.com/coolaj86/AJScript/issues/10

// Promise._forEach = async function (arr, fn) {
//   await arr.reduce(async function (promise, el, i) {
//     await promise
//     await fn(el, i, arr)
//   }, Promise.resolve())
// }

// question: how does this pass back to the acc?
// question: why does this do anything other than resolve the initial Promise.protoype.resolve(), and then sit quietly?

// let w = Promise.resolve()
// console.log(w)



Promise._forEach = async function (arr, fn) {
  await arr.reduce(async function (promise, el, i) {
    console.log('inside Promise._forEach', promise)
    await promise
    await fn(el, i, arr)
  }, Promise.resolve())
}

async function sleep(n) {
  await new Promise(function(resolve){
    setTimeout(resolve, n)
  })
}

[1000,30,500,3000].reduce(async function (promise, n, i){
  await promise
  await sleep(n)
  console.log(i, 'Done with initial resolve')
}, Promise.resolve());

[1000,30,500,3000].reduce(async function (promise, n, i){
  await promise
  await sleep(n)
  console.log(i, 'Done with initial 1')
}, 1);

[1000,30,500,3000].reduce(async function (promise, n, i){
  await promise
  await sleep(n)
  console.log(i, 'Done with initial undeclared')
})




/**
 * dbb experimenting to attempt to understand how the Promise._forEach loop passes each function/promise to the next iteration.
 * 
 * 
 * 
 */




// let count = 0
// function fnmaker(_label){
//   return function (resolve, reject){
//     console.log('label in fn',_label)
//     count++
//     resolve(console.log('label in fn resolve', _label, count, resolve))
//   }
// }
// console.log('declare x')
// const x = new Promise(fnmaker('x'))
// console.log('declare y')
// const y = new Promise(fnmaker('x'))
// console.log('declare z')
// const z = new Promise(fnmaker('x'))

// console.log('before _forEach')
// Promise._forEach([x,y,z], console.log).then();

// [x,y,z].forEach(function (e) {
//   console.log('after _forEach', e)
// })




// Promise._forEach = async function (arr, fn) {
//   await arr.reduce(async function (promise, el, i) {
//     console.log('inside Promise._forEach', promise)
//     await promise
//     await fn(el, i, arr)
//   }, 1)
// }


// console.log('before _forEach 2')
// Promise._forEach([x,y,z], console.log);
// [x,y,z].forEach(function (e) {
//   console.log('after _forEach', e)
// })






/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#running_promises_in_sequence
 * Runs promises from array of functions that can return promises
 * in chained manner
 *
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  )
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5)
  })
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2)
  })
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4)
  })
}

const promiseArr = [p1, p2, f3, p4]
// runPromiseInSequence(promiseArr, 10).then(console.log)   // 1200
