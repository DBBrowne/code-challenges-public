// https://www.codewars.com/kata/551f23362ff852e2ab000037/train/javascript

// recurse pyramid, but only for index of next layer within +0/+1 of current layer

// function calcRouteValues(pyramid) {
//   let previousLayer = []
//   pyramid.forEach((layer, i)=>{
//     if (0 === i) {
//       previousLayer = layer
//       return
//     }
//     // console.log('previouslayer', previousLayer)
//     previousLayer = layer.map((node, j)=>{
//       // console.log('index:', j)
//       const previousIndeces = [
//         j === 0 ? 0 : Math.min(j - 1    , previousLayer.length - 1),
//         j === 0 ? 0 : Math.min(j , previousLayer.length - 1)
//       ]
//       const previousNodes = [
//         previousLayer[previousIndeces[0]] || 0,
//         previousLayer[previousIndeces[1]] || 0
//       ]

//       // console.log('previousNodes:', previousIndeces, previousNodes, node, Math.max(...previousNodes.map(n=>n + node)))
//       return Math.max(...previousNodes.map(n=>n + node))
//     })
//   })
//   return previousLayer
// }
function calcRouteValues(pyramid) {
  return pyramid.reduce((previous, layer)=>{
    return layer.map((node, j)=>{
      const previousIndices = [
        j === 0 ? 0 : j - 1,
        j
      ]
      return node + Math.max(
        previous[previousIndices[0]],
        (previous[previousIndices[1]] || 0)
      )
    })
  })
}

function longestSlideDown (pyramid) {
  return Math.max(...calcRouteValues(pyramid))
}

function longestSlideDownRecurse(pyramid) {
  if (1 >= pyramid.length) return pyramid[0][0]
  
  const lastlayer = pyramid.pop()
  pyramid[pyramid.length - 1] = 
  pyramid[pyramid.length - 1].map((node, i)=>{
    return node + Math.max(
      lastlayer[i],
      lastlayer[i + 1]
    )
  })

  return longestSlideDownRecurse(pyramid)
}


const test = require('../lib/test')
const fnsToTest = [
  longestSlideDown,
  longestSlideDown,
  longestSlideDownRecurse,
  longestSlideDownRecurse 
]
const testCases = [
  [
    [[3]],
    3
  ],
  [
    [[3],
      [7, 4]],
    10
  ],
  [
    [[3],
      [7, 4],
      [2, 4, 6]],
    14
  ],
  [
    [[3],
      [7, 4],
      [2, 4, 6],
      [8, 5, 9, 3]],
    23
  ],
  [
    [[75],
      [95, 64],
      [17, 47, 82],
      [18, 35, 87, 10],
      [20,  4, 82, 47, 65],
      [19,  1, 23, 75,  3, 34],
      [88,  2, 77, 73,  7, 63, 67],
      [99, 65,  4, 28,  6, 16, 70, 92],
      [41, 41, 26, 56, 83, 40, 80, 70, 33],
      [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
      [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
      [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
      [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
      [63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
      [ 4, 62, 98, 27, 23,  9, 70, 98, 73, 93, 38, 53, 60,  4, 23]
    ],
    1074
  ]
]
test.byFunction(fnsToTest, testCases)
