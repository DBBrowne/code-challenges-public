/* eslint-disable indent */
// phase one: establish a test that works. (time: 1542)
// eslint-disable-next-line no-unused-vars
function countsPhaseOne(listA, listB){
  return [2,3]
}


const countsOutputPhaseOne = countsPhaseOne([1,2,3], [2,4]) // get output
console.assert(
  countsOutputPhaseOne[0] === 2 &&    // check both are true
  countsOutputPhaseOne[1] === 3
  ,  
  `FAIL: ${countsOutputPhaseOne}` // if assert fails, print this.
)

// Two: ask questions and investigate any edge cases 
//      criteria is LESS THAN OR EQUAL
// Three: Lay out solution
// function countsTwo(listA, listB){

  // for each element in listB, 
  //  count members of listA with 
  //    value < element
  // How to count?  Either increment an external counter, or .filter.length, or reduce with a counter.


  // return scores
// }

// Four ; lay out problem
function counts(listA, listB){

  // for each element in listB, count members of listA with value < element

  const matches = listB.map(scoreB=>{
    return (
      listA.filter(scoreA=>{
        return scoreA <= scoreB
      }).length
    )
  })

  return matches
}

// Five: Refactor if time left after other Qn(time: 1600)

const countsOutput = counts([1,2,3], [2,4]) // get output
console.assert(
  countsOutput[0] === 2 &&    // check both are true
  countsOutput[1] === 3
  ,  
  `FAIL: ${countsOutput}` // if assert fails, print this.
)