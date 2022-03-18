const moves = [[-1, 0], [0, 1], [1, 0], [0, -1]]
let visitedNodes = {}

function sum (arr) {
  return arr.reduce((p, c)=>p + c,0)
}

function findRoute(pot, prev){
  if (prev[0] === pot.length - 1) return true
    
  if (!visitedNodes[prev[0]]){
    visitedNodes[prev[0]] = {}
  }
  if (visitedNodes[prev[0]][prev[1]]){
    return false
  } else {
    visitedNodes[prev[0]][prev[1]] = true
  }
    
  return moves.some(move=>{
    const nextLocation = [prev[0] + move[0], prev[1] + move[1]]
        
    const outOfRange = nextLocation.some(cell=>{
      return (
        0 > cell ||
        pot.length <= cell
      )
    })

    if (outOfRange) return false
    if (0 === pot[nextLocation[0]][nextLocation[1]]){
      return findRoute(pot, nextLocation)
    }
  })
}

const solution = (pot) => {
  const blockedRow = pot.some(row=> sum(row) === row.length)
  if (blockedRow) return false

  visitedNodes = {}
    
  let route = false
  for (let i = 0;i < pot[0].length;i++){

    if (0 === pot[0][i]){
      route = findRoute(pot, [0, i])
    }
    if (route) break
    
  }
  return route
}

console.log(
  solution([[1]]), // false - no route
  solution(        // true - route
    [
      [1, 0, 0, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 1, 1, 0],
      [1, 0, 0, 0, 0]
    ]
  ),
  solution(        // true - route
    [
      [1, 0, 0, 1, 1],
      [1, 1, 0, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0]
    ]
  )
)