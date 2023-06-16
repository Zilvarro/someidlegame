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
    case "exp":
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
    case "exp":
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

export const describe = (stack=[], token)=>{
  if (typeof(token) === "number") {
    stack.push(token.toString())
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
      stack.push("-" + first)
      break;
    case "log2":
      first = stack.pop()
      stack.push("log2(" + first + ")")
      break;
    case "sqrt":
      first = stack.pop()
      stack.push("sqrt(" + first + ")")
      break;
    case "exp":
      second = stack.pop()
      first = stack.pop()
      stack.push(first + "^" + second)
      break;
    case "bracket":
      first = stack.pop()
      stack.push("(" + first + ")")
      break;
    default:
      stack.push(token)
      break;
  }
  return stack
}

export const describeFormula = (tokens)=>{
  const remainingStack = tokens.reduce(describe, [])
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