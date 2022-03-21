// https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7/train/javascript

// {length: number permitted}
const ships = {
  5: 0,
  4: 1,
  3: 2,
  2: 3,
  1: 4,
}
const validNeighbours = [[-1,0], [0,1], [1, 0], [0,-1]]
const invalidNeighbours = [[-1,1], [1,1], [1,-1], [-1,-1]]
let visitedbattleshipsCells = {}

function isNodeAlreadyVisited(y, x){
  if (!visitedbattleshipsCells[y]){
    visitedbattleshipsCells[y] = {}
  }
  if (visitedbattleshipsCells[y][x]){
    return true
  }
  visitedbattleshipsCells[y][x] = true
  return false
}

function checkNoDiagonalNeighbours(field, y, x){
  return invalidNeighbours.some(move=>{
    if (field[y + move[0]]){
      return field[y + move[0]][x + move[1]]
    }
  })
}

function findShipLength(field, y, x, length = 1){
  if (isNodeAlreadyVisited(y, x)) return 0
  if (!field[y][x]) return 0
  validNeighbours.forEach(move=>{
    const ny = y + move[0]
    const nx = x + move[1]
    if (
      field[ny] && 
      field[ny][nx]
    ){
      const next = findShipLength(field, ny, nx)
      length += next
    }
  })
  return length
}

function validateShipLength(shipLength){
  if (0 === ships[shipLength]) return false
  ships[shipLength]--
  return true
}

function validateBattlefield(field) {
  visitedbattleshipsCells = {}
  // for each element of each row
  // check that no diagonal cells = 1
  // walk around each '1', each step add one to counter, check that length is permitted as a ship
  for (let y = 0; y < field.length; y++){
    for (let x = 0; x < field.length; x++){
      
      if (
        field[y][x] && 
        checkNoDiagonalNeighbours(field, y, x)
      ) {
        return false
      }
      if (
        field[y][x]
      ){
        const shipLength = findShipLength(field, y, x)
        if (shipLength){
          const validLength = validateShipLength(shipLength)
          if (!validLength) return false 
        }
      }
      
    }
  }
  return Object.keys(ships).every(ship=> 0 === ships[ship])
}


// *************************************************
// *** Testing
const test = require('../lib/test')

const testCases = [[
  [ [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ], true
]]
test.byFunction(validateBattlefield, testCases)