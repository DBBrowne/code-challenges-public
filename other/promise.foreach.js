// https://github.com/coolaj86/AJScript/issues/10

// Promise._forEach = async function (arr, fn) {
//   await arr.reduce(async function (promise, el, i) {
//     await promise
//     await fn(el, i, arr)
//   }, Promise.resolve())
// }

// Question: How does this pass back to the `acc`? Why does this do anything other than resolve the initial `Promise.protoype.resolve()`, and then sit quietly?
// Answer:
// The function used as a reducer is async. By definition this returns a promise, which becomes the accumulator (better thought of as `previous` here) in the reducer.
// In fact, THERE IS NO ACCUMULATOR IN REDUCE.  
// The definition is `Array.prototype.reduce(function reducer (prev, current, index, array){}, initialValueForPrev)`.
// Sometimes we `return prev + current` from the reducer to make an accumulator, but that's an implementation.
// I couldn't get over the lack of a `return` inside `reducer`, and could not get how the promise from  `await fn(el)` was getting into `prev`.
// It doesn't.  A different promise is returned from the reducer function into the `prev` (the one from the reducer function), and that promise is waiting for the `fn(el)` promise to resolve.


// Question: How does each iteration get passed into the initial Promise.resolve()?
// Answer:
// It doesn't.
// Reduce's default behaviour, with no second argument, is to use the first element of the array as the initial value.
// In this case, that would mean that the first `await promise` would `await arr[0]`, rather than `await fn(arr[0])`.  `fn(arr[0])` would never run.
// The `initial` argument is only there to prevent Reduce using the first value in the array as the initial, and thereby failing to evaluate the passed `fn` for that value.  The initial value could be anything other than `not defined`, including null or undefined.
// Promise.resolve() is chosen as the initial to indicate to the author that 'prev' is a promise, and to ensure that the type of `prev` does not change between the first and subsequent iterations.

const w = Promise.resolve()
console.log('won\'t be resolved yet: ',w)



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

const timeouts = [1000,30,500,3000]

timeouts.reduce(async function (promise, n, i){
  await promise
  await sleep(n)
  console.log(i, 'Done with initial resolve')
}, Promise.resolve())

timeouts.reduce(async function (promise, n, i){
  await promise
  await sleep(n)
  console.log(i, 'Done with initial undefined')
}, undefined)

timeouts.reduce(async function (promise, n, i){
  await promise
  await sleep(n)
  console.log(i, 'Done with initial undeclared')
})

// async function sleepForP_fE(n) {
//   await new Promise(function(resolve){
//     setTimeout(resolve, n)
//   })
//   return (`in sleepForP_fE ${n}`)
// }
// async function fnForP_FE(promise, i, arr){
//   console.warn('fnForP_FE',promise, i, arr)
//   await promise
//   console.warn('fnForP_FE',promise, i, arr)
// }
// Promise._forEach(
//   timeouts.map(e=>sleepForP_fE(e))
//   , fnForP_FE
// )


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
// function runPromiseInSequence(arr, input) {
//   return arr.reduce(
//     (promiseChain, currentFunction) => promiseChain.then(currentFunction),
//     Promise.resolve(input)
//   )
// }

// // promise function 1
// function p1(a) {
//   return new Promise((resolve, reject) => {
//     resolve(a * 5)
//   })
// }

// // promise function 2
// function p2(a) {
//   return new Promise((resolve, reject) => {
//     resolve(a * 2)
//   })
// }

// // function 3  - will be wrapped in a resolved promise by .then()
// function f3(a) {
//   return a * 3
// }

// // promise function 4
// function p4(a) {
//   return new Promise((resolve, reject) => {
//     resolve(a * 4)
//   })
// }

// const promiseArr = [p1, p2, f3, p4]
// runPromiseInSequence(promiseArr, 10).then(console.log)   // 1200
