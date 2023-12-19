import { arrayCompare, logB } from "../utilities/mathhelper"

export class FormulaNumber {
  constructor(arrval, error) {
    if (!arrval)
      this.arrval = [1,0,0,0]
    else if (arrval === Infinity)
      this.arrval = [1,0,1,1]
    else if (arrval === -Infinity)
      this.arrval = [-1,0,1,1]
    else if (typeof(arrval) === "number")
      this.arrval = [arrval >= 0 ? 1 : -1,0,0,Math.abs(arrval)]
    else
      this.arrval = arrval //Array Based

    this.error = error
    this.sign = this.arrval[0]
    this.magnitude = this.arrval[1]
    this.order = this.arrval[2]
    this.factor = this.arrval[3]
  }

  flatten() {
    return this.arrval
  }
  
  toFloat() {
    return (this.order) ? this.sign * Infinity : this.sign * this.factor
  }

  simplify() {
    return (this.order) ? this.flatten() : this.toFloat()
  }

  print() {
    const sign = this.sign >= 0 ? "" : "-"
    const factor = this.factor === 1 ? "" : this.factor + " "
    if (this.error)
      return this.error
    if (this.magnitude > 0 && this.order > 0)
      return (sign + ("Infinity^").repeat(this.magnitude) + "(" + factor + "Infinity^" + this.order+ ")")
    if (this.magnitude > 0)
      return (sign + ("Infinity^").repeat(this.magnitude) + "(" + factor + "Infinity")
    else if (this.order > 0)
      return (sign + factor + "Infinity^" + this.order)
    else
      return (sign + this.factor)
  }

  isZero() {
    return this.factor === 0
  }

  isFinite() {
    return this.magnitude === 0 && this.order === 0
  }

  isTower() {
    return this.magnitude > 0
  }

  //Methods for comparing FormulaNumbers

  //Returns -1 / 0 / 1 depending on which number is greater, x>y => 1
  compare(y) {
    return arrayCompare(this.arrval, y.arrval)
  }

  equals(y) {
    return this.compare(y) === 0
  }

  gt(y) {
    return this.compare(y) === 1
  }

  geq(y) {
    return this.compare(y) >= 0
  }

  lt(y) {
    return this.compare(y) === -1
  }

  leq(y) {
    return this.compare(y) <= 0
  }

  //Operations on Formula Numbers

  copy() {
    return new FormulaNumber([...this.arrval], this.error)
  }

  sort(y) {
    const compare = this.abs().compare(y.abs())
    const samesign = this.sign === y.sign
    const samemagnitude = this.magnitude === y.magnitude
    const sameorder = samemagnitude && this.order === y.order
    const equal = compare === 0
    if (compare >= 0) 
      return {bigger: this, smaller: y, samesign, samemagnitude, sameorder, equal}
    else
      return {bigger: y, smaller: this, samesign, samemagnitude, sameorder, equal}
  }

  neg() {
    const sign = -this.sign
    return new FormulaNumber([sign, this.magnitude, this.order, this.factor], this.error)
  }

  abs() {
    const sign = 1
    return new FormulaNumber([sign, this.magnitude, this.order, this.factor], this.error)
  }

  //Reduces the Infinity-Tower by one level
  collapse() {
    if (this.isTower())
      return new FormulaNumber([1, this.magnitude - 1, this.order, this.factor], this.error)
    else
      return new FormulaNumber([1, 0, 0, this.order], this.error)
  }

  //Increases the Infinity-Tower by one level, after that sign and scalar are applied
  expand(sign, scalar) {
    if (this.isFinite())
      return new FormulaNumber([sign || 1, 0, this.factor, scalar || 1], this.error)
    else
      return new FormulaNumber([sign || 1, this.magnitude + 1, this.order, this.factor], this.error)
  }

  add(y) {
    let sign, magnitude, order, factor
    const {bigger, smaller, sameorder} = this.sort(y)
    sign = bigger.sign
    magnitude = bigger.magnitude
    order = bigger.order
    factor = sameorder ? Math.abs(bigger.sign * bigger.factor + smaller.sign * smaller.factor) : bigger.factor
    return new FormulaNumber([sign, magnitude, order, factor], this.error || y.error)
  }

  sub(y) {
    return this.add(y.neg())
  }

  //Scale by a real factor
  scale(c) {
    const sign = c*this.sign >=0 ? 1 : -1
    const factor = this.magnitude === 0 ? c*this.factor : this.factor
    return new FormulaNumber([sign, this.magnitude, this.order, factor], this.error)
  }
  
  mult(y) {
    return this.collapse().add(y.collapse()).expand(this.sign * y.sign, this.factor * y.factor) //Add Exponents together
  }

  div(y) {
    if (y.isZero())
      return new FormulaNumber([1, 0, 0, 0], "divide")
    const exponent = this.collapse().sub(y.collapse()) //Subtract exponents
    if (exponent.sign !== 1 && exponent.factor !== 0)
      return new FormulaNumber([1, 0, 0, 0]) //Division by larger order

    return exponent.expand(this.sign * y.sign, this.factor / y.factor) //Restore base
  }

  //Raise to a positive real power //TODO Postprocess fractional Orders
  exp(c) {
    if (isNaN(Math.pow(this.sign, c)))
      return new FormulaNumber([1, 0, 0, 0], "complex")

    return this.collapse().scale(c).expand(Math.pow(this.sign, c), Math.pow(this.factor, c)) //Add Exponents together
  }

  //Take logarithm with positive real base
  logC(c) {
    if (this.sign < 1 || this.factor === 0)
      return new FormulaNumber([1, 0, 0, 0], "logarithm")

    if (this.magnitude === 0 && this.order === 0) {
      const logresult = logB(c, this.factor)
      return new FormulaNumber([logresult >= 0 ? 1 : -1, 0, 0, Math.abs(logresult)], this.error)
    }
      
    return this.collapse().mult(new FormulaNumber([1, 0, 1, 1])) //Multiply Exponent by Infinity since log(Infinity) = Infinity
  }
}

export const calc = (op, x, y)=>{
  const fx = (x.arrval) ? x : new FormulaNumber(x)
  const fy = (y.arrval) ? y : new FormulaNumber(y)
  const result =  FormulaNumber.prototype[op].call(fx,fy)
  if (result?.simplify) {
    return result.simplify()
  } else {
    return result
  }
}

// Early attempt at postprocessing, probably not complete
// const postprocess = (x)=>{
//   if (x.isMax) return x
//   if (x.error) return x
//   if (x.order !== Math.floor(x.order)) { //Fractional Order Exponents
//     const fraction = x.order - Math.floor(x.order)
//     if (fraction > 0.99) {
//       x.value = 1
//       x.order = Math.floor(x.order) + 1
//     } else if (fraction < 0.01) {
//       x.order = Math.floor(x.order)
//     } else {
//       x.value *= Math.pow(10, fraction)
//       x.order = Math.floor(x.order)
//     }
//   }
//   if (x.value===Infinity) return {value: 1, order: x.order + 1}
//   if (x.value===-Infinity) return {value: -1, order: x.order + 1}
//   if (isNaN(x.value)) return {value: 0, order: 0, error: "infinite"}
//   if (x.order<0) return {value: 0, order: 0}
//   if (x.order===Infinity) return {value: x.value, order: x.order, isMax: true}
//   return x
// }