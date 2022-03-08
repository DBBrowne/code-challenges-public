// https://www.codewars.com/kata/5254ca2719453dcc0b00027d/train/javascript

function permutationsSln(string) {
  
  if (1 >= string.length) return [string]
  
  const letters = string.split('')
  const lettersCount = letters.length
  
  const permutationsArray = []
  
  letters.forEach((letter, index)=>{
    const remainingLetters = letters.slice(0, index).concat(letters.slice(index + 1, lettersCount))
    const childPermutations = permutationsSln(remainingLetters.join(''))
    childPermutations.forEach(perm=>{
      if (Array.isArray(perm)){
        perm = perm.join('')
      }
      if (!permutationsArray.includes(`${letter}${perm}`)){
        permutationsArray.push([letter].concat(perm).join(''))
      }
    })
  })
  return permutationsArray
}

function permutationsReduce(string) {
  
  if (1 >= string.length) return [string]
  
  const letters = string.split('')
  const lettersCount = letters.length
  
  return letters.reduce((previous, letter, index)=>{
    const remainingLetters = letters.slice(0, index).concat(letters.slice(index + 1, lettersCount))
    const childPermutations = permutationsReduce(remainingLetters.join(''))
    childPermutations.forEach(perm=>{
      if (Array.isArray(perm)){
        perm = perm.join('')
      }
      if (!previous.includes(`${letter}${perm}`)){
        previous.push([letter].concat(perm).join(''))
      }
    })
    return previous
  }, [])
}

function permutationsObject(string) {
  
  if (1 >= string.length) return [string]
  
  const letters = string.split('')
  const lettersCount = letters.length
  
  const permutationsOutput = {}
  
  letters.forEach((letter, index)=>{
    const remainingLetters = letters.slice(0, index).concat(letters.slice(index + 1, lettersCount))
    const childPermutations = permutationsObject(remainingLetters.join(''))
    childPermutations.forEach(perm=>{
      if (Array.isArray(perm)){
        perm = perm.join('')
      }
      permutationsOutput[`${letter}${perm}`] = true
    })
  })
  return Object.keys(permutationsOutput)
}

// cut out all the split + join
function permutationsKeepString(string) {
  const stringLength = string.length
  if (1 >= string.length) return [string]
  
  const permutationsReturn = {}
  
  for (let i = 0;i < stringLength; i++){
    const letter = string.substr(i,1)
    const remaining = string.substr(0, i) + string.substr(i + 1, stringLength - (i + 1))
    const childPermutations = permutationsKeepString(remaining)
    childPermutations.forEach(perm=>{
      permutationsReturn[letter + perm] = true
    })
  }
  return Object.keys(permutationsReturn)
}
function permutationsKeepStringUglified(string) {
  const stringLength = string.length
  if (1 >= string.length) return [string]
  
  const permutationsReturn = {}
  
  for (let i = 0;i < stringLength; i++){
    permutationsKeepStringUglified(
      string.substr(0, i) + string.substr(i + 1, stringLength - (i + 1))
    ).forEach(perm=>{
      permutationsReturn[`${string.substr(i,1)}${perm}`] = true
    })
  }
  return Object.keys(permutationsReturn)
}

function codeWarsSln(str) {
  return (str.length <= 1) ? [str] :
    Array.from(new Set(
      str.split('')
        .map((char, i) => codeWarsSln(str.substr(0, i) + str.substr(i + 1)).map(p => char + p))
        .reduce((r, x) => r.concat(x), [])
    ))
}

// functional
const unique = xs => [ ...new Set(xs) ]
const concat = (a, b) => [ ...a, ...b ] 
const drop = i => xs => [ ...xs.slice(0, i), ...xs.slice(i + 1) ]

const permute = (x, i, xs) => 
  combinations(drop(i)(xs)).map(y => x + y)

const combinations = s =>
  s.length === 1 ? [ s ] : [ ...s ].map(permute).reduce(concat)

const permutationsFunctional = s => unique(combinations(s))

var test = require('../lib/test')
const fnsToTst = [
  permutationsSln,
  permutationsReduce,
  permutationsObject,
  permutationsKeepString,
  permutationsKeepStringUglified,
  permutationsFunctional,
  codeWarsSln
]
const testCases = [
  [ 'ab', [ 'ab', 'ba' ] ],
  [ 'abc', [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ] ],
  [ 'abcd', [ 'abcd', 'abdc', 'acbd', 'acdb', 'adbc', 'adcb', 'bacd', 'badc', 'bcad', 'bcda', 'bdac', 'bdca', 'cabd', 'cadb', 'cbad', 'cbda', 'cdab', 'cdba', 'dabc', 'dacb', 'dbac', 'dbca', 'dcab', 'dcba' ] ],
  [ 'bcad', [ 'bcad', 'bcda', 'bacd', 'badc', 'bdca', 'bdac', 'cbad', 'cbda', 'cabd', 'cadb', 'cdba', 'cdab', 'abcd', 'abdc', 'acbd', 'acdb', 'adbc', 'adcb', 'dbca', 'dbac', 'dcba', 'dcab', 'dabc', 'dacb' ] ],
  [ 'dcba', [ 'dcba', 'dcab', 'dbca', 'dbac', 'dacb', 'dabc', 'cdba', 'cdab', 'cbda', 'cbad', 'cadb', 'cabd', 'bdca', 'bdac', 'bcda', 'bcad', 'badc', 'bacd', 'adcb', 'adbc', 'acdb', 'acbd', 'abdc', 'abcd'] ]
]
test.byFunction(fnsToTst, testCases)