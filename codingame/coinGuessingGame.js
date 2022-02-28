// https://www.codingame.com/ide/puzzle/a-coin-guessing-game
// Yulia has annotated both sides of N identical coins with the numbers from 1 to 2×N. Each number has been used exactly once and each coin has received an odd number on one side and an even number on the other side. She asks Zack, who is aware of these rules but does not know the chosen distribution of numbers, to guess all the even/odd combinations by playing a little game.

// Yulia shakes and throws the coins on the table and reveals the resulting (seemingly random) configuration to Zack, letting him see the numbers on the visible side of each coin. No other information can allow Zack to identify or distinguish the coins.

// Yulia repeats that operation several times and, after T throws in total, stops and informs Zack he has seen enough to guess all the pairs of numbers on the coins.

// Can you help Zack guess the numbers that were written on all of the coins?

// Example: N = 3 coins, the numbers from 1 to 6 are used.
// - First throw: 3 1 6.
// Zack learns that the even number 6 is not associated with the odd numbers 1 or 3, hence it has to be paired with 5.
// - Second throw: 4 1 6.
// Zack learns that 1 is not paired with 4. He also sees, for the second time, that it is not paired with 6. So 1 it has to be paired with 2, and consequently 3 is paired with 4.
// Solution: 1/2, 3/4, 5/6. Expected output: 2 4 6.
// ========

// That said, Yulia has a secret criterion. She calls "coins ring" a sequence of numbers i1, i2, i3, ..., ik, such that all the coins i1/i2, i2/i3, ..., ik/i1 are still acceptable assuming all possible "deductions" are made from the configurations that have been seen until now. She never stops before making sure that Zack can deductively get rid of all the coins rings.
// Input
// Line 1: Two space-separated integers N and T corresponding to the number of coins and the number of configurations to follow.
// Next T lines: N space-separated integers, in no particular order, corresponding to the coin sides that Zack sees after each throw.
// Output
// One line of N space-separated even integers corresponding to the even numbers written on the other side of the coin sides carrying the odd numbers 1, 3, 5, ..., 2×N-1 in order.
// Constraints
// 2 ≤ N ≤ 150
// 1 ≤ T ≤ 15
// The given data guarantees a unique solution.
// Example
// Input

// 2 3
// 4 2
// 2 4
// 4 3

// Output

// 4 2

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ')
const N = parseInt(inputs[0])
const T = parseInt(inputs[1])
var matched = {}
const keys = []

const max = (2 * N)
for (let i = 1;i <= max;i++){
  keys.push(i)
  matched[i] = []
  for (let j = 1;j <= max;j++){
    // Don't push odd vales into odd keys, and vice versa.  Don't push same values into keys.
    if (i !== j && (i % 2 !== j % 2)){
      matched[i].push(j)
    }
  }
}
// Use all data to remove known non-answers.
// Where numbers are seen together, they cannot be on opposite sides
// of the same coin.
for (let i = 0; i < T; i++) {
  inputs = readline().split(' ').map(Number)

  // Attempt to move input management to O(logN) by reducing number of iterations required to parse input.
  // for (j=0;j<N;j++){
  //     const J = inputs[j]
  //     for(k=j+1;k<N;k++){
  //         // TODO: must operate for both sides of the pair.
  //         const K = inputs[k]
  //         // console.error(inputs[j], inputs[k])
  //         // console.error(J, K)
  //         const index = matched[J].indexOf(K)
  //         if(index !== -1){
  //             matched[J].splice(index, 1)
  //         }
  //     }
  // }
  inputs.forEach(C=>{
    inputs.forEach(K=>{
      // console.error(C,K)
      const index = matched[C].indexOf(K)
      if (index !== -1){
        matched[C].splice(index, 1)
      }

    })
  })
}

function clean (iterations) {
  keys.forEach(key=>{
    const length = matched[key].length
    // if only one possiblity, we've solved for this number
    if (length === 1){
      const solvedValue = matched[key][0]
      matched[solvedValue] = [key]
      // for each key, remove solved value.  Do not remove from current prop
      keys.forEach(innerKey=>{
        if (innerKey === key) return
        const innerSpliceIndex = matched[innerKey].indexOf(solvedValue)
        if (innerSpliceIndex !== -1){
          matched[innerKey].splice(innerSpliceIndex, 1)
        }
      })
      return
    }
  })
  if (iterations > 1){
    clean(iterations - 1)
  }
}
// 2 iterations solves all test cases.  
clean(2)
// Although costly, as there are additional loops through the entire return array,
// it may be more general to use:
// while(keys.some(key=>matched[key].length>1)){clean()}

// Write an answer using console.log()
// To debug: console.error('Debug messages...')
console.log(
  keys.map(key=>{
    if (key % 2){
      return matched[key][0]
    }
  }).filter(el=>{
    return Boolean(el)
  }).join(' ')
)
