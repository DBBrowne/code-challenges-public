'use strict'

function compareAscending(a, b) {
  return a - b
}

function ajCount(inputs, refs) {
  const outputs = []

  // starts just a little to the right
  const m = Math.floor(inputs.length / 2)
  inputs.sort(function (a, b) {
    return a - b
  })
  refs.forEach(function (ref) {
    let i = m
    let left = 0
    let right = inputs.length - 1

    for (;;) {
      const v = inputs[i]
      if (v > ref) {
        right = i //- 1;
        const j = left + Math.floor((i - left) / 2)
        if (i === j) {
          break
        }
        i = j
        continue
      }

      if (v <= ref) {
        left = i
        const j = i + Math.floor((right - i) / 2)
        if (i === j) {
          break
        }
        i = j
        continue
      }
    }
    while (inputs[i] === inputs[i + 1] && i < inputs.length) {
      i += 1
    }
    outputs.push(i + 1)
  })

  return outputs
}

function ajCountLeftAlloc(inputs, refs) {
  const outputs = []
  // starts just a little to the right
  inputs.sort(compareAscending)

  refs.forEach(function (ref) {
    let left = 0
    let right = inputs.length - 1
    let i = left

    for (;;) {
      const v = inputs[i]
      // Move to the left
      // (guarantee that i will move left if it can)
      if (v > ref) {
        right = i //- 1;
        const j = left + Math.floor((i - left) / 2)
        if (i === j) {
          break
        }
        i = j
        continue
      }

      if (v <= ref) {
        left = i
        const j = i + Math.floor((right - i) / 2)
        if (i === j) {
          break
        }
        i = j
        continue
      }
    }
    while (inputs[i] === inputs[i + 1] && i < inputs.length) {
      i += 1
    }
    outputs.push(i + 1)
  })
  return outputs
}

function binarySearchThenWalk(arr, x){
  let left = 0
  let right = arr.length
  // let mid = left + Math.floor((right - left) / 2)

  while (left <= right){
    let mid = left + Math.floor((right - left) / 2)
    
    // Standard binary search would return mid here, if arr[mid] === x, 
    // As we want to find the rightmost index if multiple equal values are sorted together, walk right from a  matching value until a non-matching is found.
    if (x === arr[mid]) {
      while (x === arr[mid + 1]){
        mid++
      }
      return mid + 1
    }
    // If we're at the insert point for our target, return the next index
    if (arr[mid] < x && arr[mid + 1] > x){
      return mid + 1
    }

    if (arr[mid] < x){
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  // target is greater than greatest value in arr, so return arr.length
  return right + 1
}

function ajCount2(inputs, refs){
  const outputs = []
  inputs.sort(compareAscending)

  refs.forEach(function(ref){
    outputs.push(
      binarySearchThenWalk(inputs, ref)
    )
  })
  return outputs
}
function binaryFindOrInsert(arr, target, compareFn = (t, el) => t - el) {
  // Returns 0 if target found at arr[0].  
  // Returns -(indexToInsert) if target is not found
  var left = 0
  var right = arr.length - 1
  while (left <= right) {
    var mid = (right + left) >> 1
    var cmp = compareFn(target, arr[mid])
    if (cmp > 0) {
      left = mid + 1
    } else if (cmp < 0) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -right - 1
}
function binaryFindThenWalk(arr, x){
  let index = binaryFindOrInsert(arr, x)
  if (index < 0) return -index

  while (x === arr[index]) index++
  return index
}
function ajCount3(inputs, refs){
  const outputs = []
  inputs.sort(compareAscending)

  refs.forEach(function(ref){
    outputs.push(
      binaryFindThenWalk(inputs, ref)
    )
  })
  return outputs
}

function duncanCount(teamA, teamB) {
  // shallow copy teamB:
  const _teamB = [...teamB]

  // sort numerically
  teamA.sort(compareAscending)
  _teamB.sort(compareAscending)

  const cache = {}
  let previousAIndex = 0

  _teamB.reduce((previousMatches, score) => {
    while (teamA[previousAIndex] <= score) {
      previousMatches++
      previousAIndex++
    }
    cache[score] = previousMatches
    return previousMatches
  }, 0)

  teamB.forEach((score, i) => {
    teamB[i] = cache[score]
  })
  return teamB
}

function eachCount(teamA, teamB) {
  // shallow copy teamB:
  const _teamB = teamB.slice(0)

  // sort numerically
  teamA.sort(compareAscending)
  _teamB.sort(compareAscending)

  const cache = {}
  let previousAIndex = 0

  _teamB.forEach((score) => {
    while (teamA[previousAIndex] <= score) {
      previousAIndex++
    }
    cache[score] = previousAIndex
  })

  teamB.forEach((score, i) => {
    teamB[i] = cache[score]
  })
  return teamB
}

function forCount(teamA, teamB) {
  // shallow copy teamB:
  const _teamB = teamB.slice(0)

  // sort numerically
  teamA.sort(compareAscending)
  _teamB.sort(compareAscending)

  const cache = {}
  let previousAIndex = 0

  _teamB.forEach((score) => {
    while (teamA[previousAIndex] <= score) {
      previousAIndex++
    }
    cache[score] = previousAIndex
  })

  return teamB.map(score => cache[score])
}


// * Binary Bound
// https://stackoverflow.com/a/41956372/15995918
function binarySearch(array, pred) {
  let lo = -1, hi = array.length
  while ((1 + lo) < hi) {
    // Bitwise version of Math.floor((hi-lo) / 2)
    const mi = lo + ((hi - lo) >> 1)
    if (pred(array[mi])) {
      hi = mi
    } else {
      lo = mi
    }
  }
  return hi
}
function upperBound(array, item) {
  return binarySearch(array, j => item < j)
}

function binarySearchBounds(inputs, refs){
  inputs.sort(compareAscending)

  return refs.map(function(ref){
    return upperBound(inputs, ref)
  })
}

// * BinaryBoundsDirect
function binaryUpperBound(arr, x){
  let left = -1
  let right = arr.length

  while ((1 + left) < right){
    const mid = left + ((right - left) >> 1)
    if (x < arr[mid]){
      right = mid
    } else {
      left = mid
    }
  }
  return right
}
function binaryBoundMap(inputs, refs){
  inputs.sort(compareAscending)

  return refs.map(function(ref){
    return binaryUpperBound(inputs, ref)
  })
}

// ***************************************
// *** Tests

const tests = [
  {
    inputs: [1, 4, 2, 4],
    refs: [3, 5],
    expected: [2, 4],
  },
  {
    inputs: [1, 2, 3],
    refs: [2, 4],
    expected: [2, 3],
  },
  {
    inputs: [2, 16, 6000000, 5, 1, 79, 250, 3],
    // [1, 2, 3, 5, 16, 79, 250, 6000000];
    refs: [5, 100],
    expected: [4, 6],
  },
  {
    inputs: [5, 100],
    // [1, 2, 3, 5, 16, 79, 250, 6000000];
    refs: [2, 16, 6000000, 5, 1, 79, 250, 3],
    expected: [0,1,2,1,0,1,2,0],
  }
]

const functions = [
  duncanCount,
  forCount,
  eachCount,
  ajCount,
  ajCount2,
  ajCount3,
  binarySearchBounds,
  binaryBoundMap
]

functions.forEach(function(fn){
  console.info(fn.name)
  tests.forEach(function (test) {
    const a = test.inputs.slice(0)
    const b = test.refs.slice(0)
    const answer = fn(a, b)
    if (test.expected.toString() !== answer.toString()) {
      console.info('Fail', test.expected.toString(), answer.toString())
      return
    }
    console.info('Pass')
  })
})

const maxLength = 1e5
const bench = [
  {
    inputs: 10_000,
    refs: 10_000,
  },
  {
    inputs: 100_000,
    refs: 100_000,
  },
  {
    inputs: 1_000_000,
    refs: 1_000_000,
  },
  {
    inputs: 10_000_000,
    refs: 10_000_000,
  },
  {
    inputs: Math.floor(Math.random() * maxLength),
    refs: Math.floor(Math.random() * maxLength),
  },
  {
    inputs: Math.floor(Math.random() * maxLength),
    refs: Math.floor(Math.random() * maxLength),
  }
]

const maxScores = 1e9
function scoresGenerator(size) {
  const returnArray = []

  for (let i = 0; i < size; i += 1) {
    returnArray.push(Math.floor(Math.random() * maxScores))
  }

  return returnArray
}

const functionsToTime = [
  ajCount,
  ajCountLeftAlloc,
  ajCount2,
  ajCount3,
  duncanCount,
  eachCount,
  forCount,
  binarySearchBounds,
  binaryBoundMap
]

bench.forEach(function (sizes) {
  console.info()
  console.info(sizes)
  const oinputs = scoresGenerator(sizes.inputs)
  const orefs = scoresGenerator(sizes.refs)
  let inputs
  let refs

  functionsToTime.forEach(function (fn){
    inputs = oinputs.slice(0)
    refs = orefs.slice(0)
    console.time(fn.name)
    fn(refs, inputs)
    console.timeEnd(fn.name)
  })
})
