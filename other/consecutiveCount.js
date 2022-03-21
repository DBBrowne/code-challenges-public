const consecutiveCount = (numbers) => {
  var largestSum = 0
  var sum = 0
  var duplicates = {}
  while (numbers.length > 0) {
    var previousNumber = numbers.shift()
    console.log(previousNumber, sum)
    
    if (1 > previousNumber) {
      return -1
    }

    if (!duplicates[previousNumber]) sum += previousNumber
    duplicates[previousNumber] = true
    if (previousNumber > numbers[0]){
      1
    }
    if (previousNumber < numbers[0]){
      largestSum = Math.max(largestSum, sum)
      sum = previousNumber
      duplicates = {}
    }
  }
  largestSum = Math.max(largestSum, sum)
  return largestSum
}

// eslint-disable-next-line no-unused-vars
const _consecutiveCount = (numbers) => {
  var largestSum = 0
  
  while (numbers.length > 0) {
    var previousNumber = numbers.shift()
    if (1 > previousNumber) {
      return -1
    }

    var sum = previousNumber
    for (const num of numbers) {
      if (previousNumber > num){
        sum += num
      }

      previousNumber = num
    }

    largestSum = Math.max(largestSum, sum)
  }
  largestSum = Math.max(largestSum, sum)
  return largestSum
}

console.log(consecutiveCount([9,5,12,6,5,5,4]))