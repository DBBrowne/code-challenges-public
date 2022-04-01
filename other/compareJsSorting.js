// eslint global setup does not accept ES2020, so no BigInt
/* eslint-disable no-undef */
// @ts-nocheck

const maxValueForTesting = 1e4

function compAsc(a,b) {
  return a - b
}
function compDesc(a,b) {
  return b - a
}
Array.prototype._sortNums = function(compFn = compAsc){
  this.sort(compFn)
}
Array.prototype._sortNumsDesc = function(compFn = compDesc){
  this.sort(compFn)
}
Array.prototype._sortNumsReverse = function(compFn = compAsc){
  this.sort(compFn).reverse()
}

const functionsToTime = [
  function sortAscProto (arr) {
    arr._sortNums()
  },
  function sortDescProto (arr) {
    arr._sortNumsDesc()
  },
  function sortAscReverseProto (arr) {
    arr._sortNumsReverse()
  }
  // function sortAsc (arr) {
  //   arr.sort(compAsc)
  // },
  // function sortDesc (arr) {
  //   arr.sort(compDesc)
  // },
  // function sortAscReverse (arr) {
  //   arr.sort(compAsc).reverse()
  // }
]

// *******************************************
// *** Helpers

function generateValues(size) {
  const returnArray = []

  for (let i = 0; i < size; i += 1) {
    returnArray.push(Math.floor(Math.random() * maxValueForTesting))
  }

  return returnArray
}

function execStats (arr){
  var nsToMs = 1e6
  var maxBigInt = BigInt(Math.pow(2, 63))
  var i,j = 0, diffSqredArr = []
  var max = BigInt(0)
  var mean, total = BigInt(0)
  var min = maxBigInt
  for (i = 0;i < arr.length;i += 1){
    var val = BigInt(arr[i])
    total += val
    if (val > max) max = val
    if (val < min) min = val
  }
  mean = total / BigInt(arr.length)
  for (j = 0;j < arr.length;j += 1){
    diffSqredArr.push(Math.pow(Number(arr[j] - mean),2))
  }
  const stdDev = Math.sqrt(
    diffSqredArr.reduce(function(firstEl, nextEl){
      return firstEl + nextEl
    }) / arr.length
  )
  return {
    total: Number(Number((total)).toPrecision(3)) / nsToMs,
    mean: Number(Number((mean)).toPrecision(3)) / nsToMs,
    min: Number(Number((min)).toPrecision(3)) / nsToMs,
    max: Number(Number((max)).toPrecision(3)) / nsToMs,
    stdDev: Number(stdDev.toPrecision(3)) / nsToMs,
  }
}

// *********************************
// *** Testing

const process = require('process')

const repetitions = 10

function consoleGreen (string) {
  return `\x1b[32;1m${string}\x1b[0m`
}
function consoleRed (string) {
  return `\x1b[31;1m${string}\x1b[0m`
}

const bench = [
  1e2,
  1e3,
  1e4,
  1e5,
  1e6,
  1e7
  // 1e8 // node OOM on arr.reverse()
  // 1e9,
  // 1e10,
  // 1e11,
  // 1e12,
  // 1e13
]
bench.forEach(function (size){
  const metaTimes = []
  
  console.info('')
  console.info(size, 'Completely random (worst case)')
  const arr = generateValues(size)
  functionsToTime.forEach(function(fn){
    const times = []
    for (let i = 0;i < repetitions; i++){
      const _arr = arr.slice(0)
      const timeStart = process.hrtime.bigint()
      fn(_arr)
      times.push((process.hrtime.bigint() - timeStart))
    }
    const stats = execStats(times)
    metaTimes.push(BigInt(Math.round(stats.mean * 1e6)))
    console.info(`${fn.name}, ${repetitions} reps :`, stats,  '(all in ms, 3s.f.)')
  })

  const metaStats = execStats(metaTimes)
  const minAsBigInt = metaTimes.reduce((acc, curr)=>{
    if (curr < acc) return curr
    return acc
  }, BigInt(Math.pow(2, 63)))
  const fastest = functionsToTime[metaTimes.indexOf(minAsBigInt)].name
  console.info('\t', consoleGreen(`Fastest: ${fastest}`), metaStats)
  
})

bench.forEach(function (size){
  const metaTimes = []

  console.info('')
  console.info(size, 'pre sorted Ascending (best case)')
  const arr = generateValues(size).sort(compAsc)
  functionsToTime.forEach(function(fn){
    const times = []
    for (let i = 0;i < repetitions; i++){
      const _arr = arr.slice(0)
      const timeStart = process.hrtime.bigint()
      fn(_arr)
      times.push((process.hrtime.bigint() - timeStart))
    }
    const stats = execStats(times)
    metaTimes.push(BigInt(Math.round(stats.mean * 1e6)))
    console.info(`${fn.name}, ${repetitions} reps :`, stats,  '(all in ms, 3s.f.)')
  })

  const metaStats = execStats(metaTimes)
  const minAsBigInt = metaTimes.reduce((acc, curr)=>{
    if (curr < acc) return curr
    return acc
  }, BigInt(Math.pow(2, 63)))
  const fastest = functionsToTime[metaTimes.indexOf(minAsBigInt)].name
  console.info('\t', consoleRed(`Fastest: ${fastest}`), metaStats)
})

bench.forEach(function (size){
  const metaTimes = []

  console.info('')
  console.info(size, 'pre sorted Descending (best case)')
  const arr = generateValues(size).sort(compDesc)
  functionsToTime.forEach(function(fn){
    const times = []
    for (let i = 0;i < repetitions; i++){
      const _arr = arr.slice(0)
      const timeStart = process.hrtime.bigint()
      fn(_arr)
      times.push((process.hrtime.bigint() - timeStart))
    }
    const stats = execStats(times)
    metaTimes.push(BigInt(Math.round(stats.mean * 1e6)))
    console.info(`${fn.name}, ${repetitions} reps :`, stats,  '(all in ms, 3s.f.)')
  })

  const metaStats = execStats(metaTimes)
  const minAsBigInt = metaTimes.reduce((acc, curr)=>{
    if (curr < acc) return curr
    return acc
  }, BigInt(Math.pow(2, 63)))
  const fastest = functionsToTime[metaTimes.indexOf(minAsBigInt)].name
  console.info('\t', consoleGreen(`Fastest: ${fastest}`), metaStats)
})