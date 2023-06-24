import { FormulaNumber } from "./FormulaNumber"

export const parse = (stack=[], token)=>{
  let first, second
  switch (token) {
    case "+":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.add(second))
      break;
    case "-":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.sub(second))
      break;
    case "*":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.mult(second))
      break;
    case "/":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.div(second))
      break;
    case "neg":
      first = stack.pop()
      stack.push(first.neg())
      break;
    case "log2":
      first = stack.pop()
      stack.push(first.logC(2))
      break;
    case "sqrt":
      first = stack.pop()
      stack.push(first.exp(0.5))
      break;
    case "^":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.exp(second.factor))
      break;
    case "bracket":
      //Nothing to do
      break;
    default:
      stack.push(token) //literal
      break;
  }
  return stack
}

export const evaluate = (stack=[], token, valueMap)=>{
  if (typeof(token) === "number") {
    stack.push(new FormulaNumber(token))
    return stack
  }

  let first, second
  switch (token) {
    case "+":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.add(second))
      break;
    case "-":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.sub(second))
      break;
    case "*":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.mult(second))
      break;
    case "/":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.div(second))
      break;
    case "neg":
      first = stack.pop()
      stack.push(first.neg())
      break;
    case "log2":
      first = stack.pop()
      stack.push(first.logC(2))
      break;
    case "sqrt":
      first = stack.pop()
      stack.push(first.exp(0.5))
      break;
    case "^":
      second = stack.pop()
      first = stack.pop()
      stack.push(first.exp(second.factor))
      break;
    case "bracket":
      //Nothing to do
      break;
    default:
      let value = valueMap[token]
      if (value === undefined) {
        console.error("Missing Value in Formula Evaluation for variable " + token)
        stack.push(new FormulaNumber(0))
      }
      stack.push(valueMap[token])
      break;
  }
  return stack
}

export const describe = (stack=[], token, numberFormatter)=>{
  if (typeof(token) === "number") {
    stack.push(numberFormatter(token.toString()))
    return stack
  }

  let first, second
  switch (token) {
    case "+":
      second = stack.pop()
      first = stack.pop()
      stack.push(<>{first} + {second}</>)
      break;
    case "-":
      second = stack.pop()
      first = stack.pop()
      stack.push(<>{first} - {second}</>)
      break;
    case "*":
      second = stack.pop()
      first = stack.pop()
      stack.push(<>{first} * {second}</>)
      break;
    case "/":
      second = stack.pop()
      first = stack.pop()
      stack.push(<>{first} / {second}</>)
      break;
    case "neg":
      first = stack.pop()
      stack.push(<>-{first}</>)
      break;
    case "log2":
      first = stack.pop()
      stack.push(<>log2{first}</>)
      break;
    case "sqrt":
      first = stack.pop()
      stack.push(<>sqrt{first}</>)
      break;
    case "^":
      second = stack.pop()
      first = stack.pop()
      stack.push(<>{first}<sup>{second}</sup></>)
      break;
    case "bracket":
      first = stack.pop()
      stack.push(<>({first})</>)
      break;
    default:
      stack.push(token)
      break;
  }
  return stack
}

export const describeFormula = (tokens, numberFormatter)=>{
  const remainingStack = tokens.reduce((stack,token)=>describe(stack,token,numberFormatter), [])
  if (remainingStack.length !== 1)
    console.error("Formula description stack has " + remainingStack.length + " elements.")
  return remainingStack[0]
}

export const evaluateFormula = (tokens, valueMap)=>{
  const remainingStack = tokens.reduce((stack, token)=>evaluate(stack, token, valueMap), [])
  if (remainingStack.length !== 1)
    console.error("Formula evaluation stack has " + remainingStack.length + " elements.")
  return remainingStack[0]
}

const tokenizeFormula = (tokenArray)=>{
  
  //Outer Bracket
  const firstBracket = tokenArray.indexOf("(")
  const lastBracket = tokenArray.lastIndexOf(")")
  if (firstBracket >= 0) {
    const beforeBracket = tokenArray.slice(0, firstBracket)
    const bracketContent = tokenArray.slice(firstBracket + 1, lastBracket)
    const afterBracket = tokenArray.slice(lastBracket + 1)
    return tokenizeFormula([...beforeBracket, tokenizeFormula(bracketContent).concat("bracket") , ...afterBracket])
  }

  //Infix Operators
  tokenArray = splitAtInfixOperator(tokenArray, "-")      //Subtraction
  tokenArray = splitAtInfixOperator(tokenArray, "+")      //Addition
  tokenArray = splitAtInfixOperator(tokenArray, "/")      //Division
  tokenArray = splitAtInfixOperator(tokenArray, "*")      //Multiplication
  tokenArray = splitAtInfixOperator(tokenArray, "^")      //Exponentiation

  //Function Operators
  tokenArray = splitAtFunction(tokenArray, "log2", "log2", true)  //Base-2-Logarithm
  tokenArray = splitAtFunction(tokenArray, "sqrt", "sqrt", true)  //Square Root

  return tokenArray
}

const splitAtInfixOperator = (tokenArray, token)=>{
  const firstOccurence = tokenArray.indexOf(token)
  if (firstOccurence >= 0) {
    const beforePivot = tokenizeFormula(tokenArray.slice(0, firstOccurence))
    const afterPivot = tokenizeFormula(tokenArray.slice(firstOccurence + 1))
    return [...beforePivot, ...afterPivot, token]
  } else {
    return tokenArray
  }
}

const splitAtFunction = (tokenArray, token, command)=>{
  const firstOccurence = tokenArray.indexOf(token)
  if (firstOccurence >= 0) {
    const beforePivot = tokenArray.slice(0, firstOccurence)
    const functionArgument = tokenArray[firstOccurence + 1]
    const afterPivot = tokenArray.slice(firstOccurence + 2)
    return tokenizeFormula([...beforePivot, functionArgument.concat(command), ...afterPivot])
  } else {
    return tokenArray
  }
}

export const tokenizeOuter = (inputString)=>{
  const tokenArray = inputString.split(" ").map((token)=>(Number(token) || token))
  const resultArray = tokenizeFormula(tokenArray)
  return resultArray.flat(50)
}