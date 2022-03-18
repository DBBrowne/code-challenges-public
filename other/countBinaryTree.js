const _sum = (arr) => arr.reduce((prev, x)=>prev + x,0)

function sumBranches(arr, depth = 0, left = 0, right = 0, endOfLastDepth = 0){
  if (endOfLastDepth >= arr.length) return [left, right]
  // console.log(depth)
  if (0 === depth) return sumBranches(arr, depth + 1, left, right, 1)
    
  const sideLength = Math.pow(2, depth - 1)
  const thisDepthMaxI = endOfLastDepth + sideLength + sideLength
  // console.log('depth + length', depth, sideLength)
  const leftArray = []
  const rightArray = []
    
  for (let i = 0;i < sideLength;i++){
    let thisValue = arr[endOfLastDepth + i]
    if (-1 === thisValue || undefined === thisValue) thisValue = 0
    leftArray.push(thisValue)
  }
  // console.log('end + startright', endOfLastDepth, sideLength, endOfLastDepth + sideLength)
  // console.log('this max', thisDepthMaxI,(endOfLastDepth + sideLength) < thisDepthMaxI,((endOfLastDepth + (endOfLastDepth + sideLength)) < arr.length))
  for (let i = endOfLastDepth + sideLength;
    i < thisDepthMaxI && 
        i < arr.length;
    i++
  ){
    // console.log('pushing into right:', arr[i])
    let thisValue = arr[i]
    if (-1 === thisValue || undefined === thisValue) thisValue = 0
    rightArray.push(thisValue)
  }
  // console.log('before Sum:', depth, leftArray, rightArray)
  left = left + _sum(leftArray)
  right = right + _sum(rightArray)
    
  return sumBranches(arr, depth + 1, left, right, thisDepthMaxI)
}


const largestBranch = (arr) => {
  const sums = sumBranches(arr)
  // console.log(sums)
  if (sums[0] > sums[1]) return 'Left'
  if (sums[0] < sums[1]) return 'Right'
  return ''
}


// [3,6,2,9,-1,10]
// 3                      0  0
// 6 2                    1  1
// 9 -1 10                2  2
//                        3  4
//                        4  8

// [1, 10, 5, 1, 0, 6]
// 1
// 10 5
// 1 0 6

// [ 1, 4, 100, 5 ] 
// 1
// 4 100
// 5

// [3, 6, 2, 9, -1, 10, -1, 1]

console.log('OUTPUT:                            ',largestBranch([3, 6, 2, 9, -1, 10, -1, 1]), ' LEFT')
console.log('OUTPUT:                            ',largestBranch([3,6,2,9,-1,10]), ' LEFT')
console.log('OUTPUT:                            ',largestBranch([ 1, 4, 100, 5 ]), 'RIGHT')
console.log('OUTPUT:                            ',largestBranch([1, 10, 5, 1, 0, 6]), '     Empty String')