



function codeReader(code){
  const befunge = [[]]
  let y = 0
  code.split('').forEach(command=>{
    if ('\n' === command){
      befunge.push([])
      y++
    } else {
      befunge[y].push(command) 
    }
  })
  return befunge
}
function nextPosition(i, max, direction, numMoves){
  if (0 === numMoves) return i
  const cursorMovement = direction
  i = [i[0] + cursorMovement[0], i[1] + cursorMovement[1]]
  i = i.map((axis,j)=>{
    if (axis > max[j]){
      return 0
    } else if (-1 === axis) {
      return max[j]
    } else {
      return axis
    }
  })
  //   console.log('direction',i, direction, max)
  return nextPosition(i, max, direction, numMoves - 1)
}


function interpreter(code) {
  console.log(code)
  let output = ''
  // TODO: investigate more performant stacks.  LinkedList?
  const stack = []
  const befunge = codeReader(code)
  
  let endProgram = false
  let i = [0,0]
  let direction = [0,1]
  let skip = 0
  let stringMode = false
  
  //     console.log(befunge)
  while (!endProgram){
    const command = befunge[i[0]][i[1]]
    //     console.log('command:',command)
    const commandParseInt = parseInt(command)
    
    if ('"' === command){
      // Toggle string mode
      stringMode = !stringMode      
    } else if (stringMode){
      // If stringmode, push ascii to stack
      stack.push(command.charCodeAt(0))
    } else if (!isNaN(commandParseInt)){
      // if number, push to stack
      stack.push(commandParseInt)
    } else if ('.' === command){
      // append 
      output += stack.pop() || 0
    } else if ('@' === command){
      endProgram = true
    } else if (' ' === command) {
      // ignore Space
    } else if ('#' === command) {
      // skip next command in direction
      skip = 1
    } else if ('<' === command) {
      // set cursor direction right-to-left
      direction = [0,-1]
    } else if ('>' === command) {
      // set cursor direction left-to-right
      direction = [0, 1]
    } else if ('v' === command) {
      // set cursor direction top-to-bottom
      direction = [1, 0]
    } else if ('^' === command) {
      // set cursor direction bottom-to-top
      direction = [-1, 0]
    } else if ('_' === command) {
      // set cursor direction conditionally left/right
      //       console.log('_ stack:', stack)
      const popped = stack.pop() || 0
      //       console.log('_ popped, output:', popped, ' : ',  output, ':', 0 === popped)
      if (0 === popped){
        direction = [0, 1]
      } else {
        direction = [0,-1]
      }
    } else if ('|' === command) {
      // set cursor direction conditionally up/down
      const popped = stack.pop() || 0
      if (0 === popped){
        direction = [1, 0]
      } else {
        direction = [-1,0]
      }
    } else if ('?' === command) {
      // set cursor direction randomly
      direction = [
        [1,0],[-1,0],[0,1],[0,-1]
      ][
        Math.floor(Math.random() * 4)
      ]
    } else if ('$' === command) {
      // discard top of stack
      stack.pop()
    } else if (':' === command) {
      // duplicate top of stack
      stack.push(stack[stack.length - 1])
    } else if ('!' === command) {
      // !Boolean(stack[last])
      if (stack.pop()){
        stack.push(0)
      } else {
        stack.push(1)
      }
    } else if ('\\' === command) {
      // switch top two stack members
      const last = (stack.length - 1)
      if (0 === last){
        stack.push(0)
      } else {
        [stack[last], stack[last - 1]] = [stack[last - 1], stack[last]] 
      }
    } else if ('+' === command) {
      // sum top two of stack
      stack.push(stack.pop() + stack.pop())
    } else if ('*' === command) {
      // multiply top two of stack
      stack.push(stack.pop() * stack.pop())
    } else if ('-' === command) {
      // Difference last two of stack
      const first = stack.pop()
      const last = Math.max(stack.length - 1, 0)
      const second = stack[last]
      
      stack[last] = second - first
    } else if ('/' === command) {
      // Ratio last two of stack
      const first = stack.pop()
      const last = Math.max(stack.length - 1, 0)
      const second = stack[last]
      
      stack[last] = Math.trunc(second / first)
    } else if ('%' === command) {
      // Modulo last two of stack
      const first = stack.pop()
      const last = Math.max(stack.length - 1, 0)
      const second = stack[last]
      
      stack[last] = Math.trunc(second % first)
    } else if ('`' === command) {
      // Second-of-stack greater than Top-of-stack
      const first = stack.pop()
      const last = Math.max(stack.length - 1, 0)
      const second = stack[last]
      
      stack[last] = first < second ? 1 : 0
    } else if ('g' === command) {
      // add ascii command to stack
      const first = stack.pop() || 0
      const last = Math.max(stack.length - 1, 0)
      const second = stack[last] || 0
      stack[last] = befunge[first][second].charCodeAt(0)
    } else if ('p' === command) {
      // Replace command within code
      const first = stack.pop() || 0
      const second = stack.pop() || 0
      const third = stack.pop() || 0
      befunge[first][second] = String.fromCharCode(third)
    } else if (',' === command) {
      // add character of ascii code to stack
      output += String.fromCharCode(stack.pop())
    } else {
      output += 'ERROR'
      endProgram = true      
    }
    //     console.log(befunge.length - 1)
    //     console.log(i[0], befunge[i[0]].length - 1)
    i = nextPosition(i, [befunge.length - 1, befunge[i[0]].length - 1], direction, skip + 1)
    //     console.log(i)
    skip = 0
    //         console.log('stack:',stack, 'nexti:', i)
    //         console.log('Next i:',i)
  }
  return output
}
console.log(interpreter)