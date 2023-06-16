import { logB } from "../utilities"

const postprocess = (x)=>{
  if (x.isMax) return x
  if (x.error) return x
  if (x.order !== Math.floor(x.order)) { //Fractional Order Exponents
    const fraction = x.order - Math.floor(x.order)
    if (fraction > 0.99) {
      x.value = 1
      x.order = Math.floor(x.order) + 1
    } else if (fraction < 0.01) {
      x.order = Math.floor(x.order)
    } else {
      x.value *= Math.pow(10, fraction)
      x.order = Math.floor(x.order)
    }
  }
  if (x.value===Infinity) return {value: 1, order: x.order + 1}
  if (x.value===-Infinity) return {value: -1, order: x.order + 1}
  if (isNaN(x.value)) return {value: 0, order: 0, error: "infinite"}
  if (x.order<0) return {value: 0, order: 0}
  if (x.order===Infinity) return {value: x.value, order: x.order, isMax: true}
  return x
}

//eslint-disable-next-line no-unused-vars
const maths = {
  neg: (x)=>({value: -x.value}),
  add: (x,y)=>({value: x.value + y.value}),
  mult: (x,y)=>({value: x.value * y.value}),
  div: (x,y)=>{
    return y === 0 ? {value: x.value, error: "divide"} : {value: x.value / y.value}
  },
  exp: (x,y)=>{
    return {
      value: Math.pow(x.value, y.value)
    }
  },
  log: (b,x)=>{
    return {
      value: logB(b,x)
    }
  },
}

//eslint-disable-next-line no-unused-vars
const infinimaths = {
  neg: (x)=>{
    if (x.error) return x
    return {
      value: -x.value,
      order: x.order,
      isMax: x.isMax,
    }
  },
  add: (x,y)=>{
    if (x.error) return x
    if (y.error) return y
    if (x.order === y.order) return postprocess({value: x.value + y.value, order: x.order})
    if (x.order > y.order) return postprocess({value: x.value, order: x.order})
    if (x.order < y.order) return postprocess({value: y.value, order: y.order})
  },
  mult: (x,y)=>{
    if (x.error) return x
    if (y.error) return y
    return postprocess({
      value: x.value * y.value,
      order: x.order + y.order,
    })
  },
  exp: (x,a)=>{ //a must be positive real number
    if (x.error) return x
    if (x < 0 && a !== Math.floor(a)) return {value: 0, order: 0, error: "complex" }
    return postprocess({
      value: Math.pow(x.value, a),
      order: x.order * a, //Should: never 0 when x>=Infinity
    })
  },
  log: (b,x)=>{
    if (x.error) return x
    if (x.value <= 0)
      return {value: 0, order: 0, error: "logarithm" }
    else if (x.order === 0)
      return postprocess({
        value: logB(b,x),
        order: x.order,
      })
    else
      return postprocess({ //log2(32*Infinity^3) = Infinity*3 + 5 => 3 Infinity
        value: x.order,
        order: 1,
      })
  },
}

export const formulaLayer = (game, actionName, parameters={})=>{
  const data = game.save.maingame.formulas
  if (!data) return false

  switch (actionName) {
    case "applyFormula":
      this.data.xValue = this.data.xValue + parameters.amount || 1
      break;
    default:
      return false
  }
  return true
}