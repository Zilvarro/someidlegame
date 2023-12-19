import { describeFormula, tokenize } from "../game/formulaBuilder"
import { formatNumber } from "../utilities/formatter"

const targetVariables = ["x", "x'", "x''", "x'''"]

export const textifyFormula = (formula, context)=>{
  const formatter = (number)=>formatNumber(number, context.settings.numberFormat, 0)
  if (formula.isIncrementer)
    return <>{formula.targetName} &#10141; {formula.targetName} + {describeFormula(formula.content, formatter)}</>
  else
    return <>{formula.targetName} &#10141; {describeFormula(formula.content, formatter)}</>
}

const formulaDictionary = {
  //Tier 1 Formulas
  "x+1": {
    id: "x+1",
    raw: "1",
    type: "incrementer",
    applyCost: 0,
    targetLevel: 0,
  },
  "x+5": {
    id: "x+5",
    raw: "5",
    type: "incrementer",
    applyCost: 20,
    targetLevel: 0,
  },
  "x+10": {
    id: "x+10",
    raw: "10",
    type: "incrementer",
    applyCost: 100,
    targetLevel: 0,
  },
  "x+20": {
    id: "x+20",
    raw: "20",
    type: "incrementer",
    applyCost: 300,
    targetLevel: 0,
  },
  "x+50": {
    id: "x+50",
    raw: "50",
    type: "incrementer",
    applyCost: 800,
    targetLevel: 0,
  },
  "x+100": {
    id: "x+100",
    raw: "100",
    type: "incrementer",
    applyCost: 2000,
    targetLevel: 0,
  },

  //Tier 2 Formulas
  "x'=1": {
    id: "x'=1",
    raw: "1",
    type: "static",
    applyCost: 0,
    targetLevel: 1,
  },
  "x'=24": {
      id: "x'=24",
      raw: "24",
      type: "static",
      applyCost: 30,
      targetLevel: 1,
  },
  "x'+1": {
      id: "x'+1",
      raw: "1",
      type: "incrementer",
      applyCost: 50,
      targetLevel: 1,
  },
  "x+1000": {
      id: "x+1000",
      raw: "1000",
      type: "incrementer",
      applyCost: 10000,
      targetLevel: 0,
  },
  "x'+3": {
      id: "x'+3",
      raw: "3",
      type: "incrementer",
      applyCost: 300,
      targetLevel: 1,
  },
  "x+x'": {
      id: "x+x'",
      raw: "x'",
      type: "incrementer",
      applyCost: 10,
      targetLevel: 0,
  },
  "x'+220": {
      id: "x'+220",
      raw: "220",
      type: "incrementer",
      applyCost: 100000,
      targetLevel: 1,
  },
  "x'=420K": {
      id: "x'=420K",
      raw: "420000",
      type: "static",
      applyCost: 69,
      targetLevel: 1,
  },
  "x+50M": {
      id: "x+50M",
      raw: "50e6",
      type: "incrementer",
      applyCost: 1e6,
      targetLevel: 0,
  },

  //Tier 3 Formulas
  "x''=1": {
      id: "x''=1",
      raw: "1",
      type: "static",
      applyCost: 0,
      targetLevel: 2,
  },
  "x''=2": {
      id: "x''=2",
      raw: "2",
      type: "static",
      applyCost: 100,
      targetLevel: 2,
  },
  "x''=3": {
      id: "x''=3",
      raw: "3",
      type: "static",
      applyCost: 1000,
      targetLevel: 2,
  },
  "x''=1.25^#U": {
      id: "x''=1.25^#U",
      raw: "1.25 ^ #U",
      type: "static",
      applyCost: 5000,
      targetLevel: 2,
  },
  "x'=1000*x''": {
      id: "x'=1000*x''",
      raw: "1000 * x''",
      type: "static",
      applyCost: 11000,
      targetLevel: 1,
  },
  "x''=x^0.3": {
      id: "x''=x^0.3",
      raw: "x ^ 0.3",
      type: "static",
      applyCost: 100000,
      targetLevel: 2,
  },
  "x''+1": {
      id: "x''+1",
      raw: "1",
      type: "incrementer",
      applyCost: 100000,
      targetLevel: 2,
  },
  "x''+130": {
      id: "x''+130",
      raw: "130",
      type: "incrementer",
      applyCost: 49e6,
      targetLevel: 2,
  },
  "x'+x^0.6": {
      id: "x'+x^0.6",
      raw: "x ^ 0.6",
      type: "incrementer",
      applyCost: 250e6,
      targetLevel: 1,
  },
  "x''+10B": {
      id: "x''+10B",
      raw: "10e9",
      type: "incrementer",
      applyCost: 200e6,
      targetLevel: 2,
  },
  "x+20P": {
      id: "x+20P",
      raw: "20e18",
      type: "incrementer",
      applyCost: 100e6,
      targetLevel: 0,
  },

  //Tier 4 Formulas
  "x'''=1": {
      id: "x'''=1",
      raw: "1",
      type: "static",
      applyCost: 0,
      targetLevel: 3,
  },
  "x'''=#U^2/12": {
      id: "x'''=#U^2/12",
      raw: "#U ^ 2 / 12",
      type: "static",
      applyCost: 10000,
      targetLevel: 3,
  },
  "x'''=4": {
      id: "x'''=4",
      raw: "4",
      type: "static",
      applyCost: 100,
      targetLevel: 3,
  },
  "x'''=log2(#B)^2": {
      id: "x'''=log2(#B)^2",
      raw: "log2 ( #B ) ^ 2",
      type: "static",
      applyCost: 3000,
      targetLevel: 3,
  },
  "x'+x''+x'''": {
      id: "x'+x''+x'''",
      raw: "x'' + x'''",
      type: "incrementer",
      applyCost: 2e5,
      targetLevel: 1,
  },
  "x''+x'''^2": {
      id: "x''+x'''^2",
      raw: "x''' ^ 2",
      type: "incrementer",
      applyCost: 2e6,
      targetLevel: 2,
  },
  "x'''+1": {
      id: "x'''+1",
      raw: "1",
      type: "incrementer",
      applyCost: 400,
      targetLevel: 3,
  },
  "x=10Q*x'''*x''/x'": {
      id: "x=10Q*x'''*x''/x'",
      raw: "10e15 * x''' * x'' / x'",
      type: "static",
      applyCost: 1e9,
      targetLevel: 0,
  },
  "x'=5Q*x'''": {
      id: "x'=5Q*x'''",
      raw: "5e15 * x'''",
      type: "static",
      applyCost: 1e10,
      targetLevel: 1,
  },
  "x'''+log2(x)^2": {
      id: "x'''+log2(x)^2",
      raw: "log2 ( x ) ^ 2",
      type: "incrementer",
      applyCost: 5e6,
      targetLevel: 3,
  },
  "x'''+log2(#B+#F/#E)^13": {
      id: "x'''+log2(#B+#F/#E)^13",
      raw: "log2 ( #B + #F / #E ) ^ 13",
      type: "incrementer",
      applyCost: 5e20,
      targetLevel: 3,
  },
  "x'+30S": {
      id: "x'+30S",
      raw: "30e21",
      type: "incrementer",
      applyCost: 1e15,
      targetLevel: 1,
  },
  "x''+40P": {
      id: "x''+40P",
      raw: "40e18",
      type: "incrementer",
      applyCost: 1e21,
      targetLevel: 2,
  },
  "x'''*sqrt(300S-x''')/500B": {
      id: "x'''*sqrt(300S-x''')/500B",
      raw: "x''' * sqrt ( 300e21 - x''' ) / 500e9",
      type: "advanced",
      applyCost: 1e9,
      targetLevel: 3,
  },
  "x''+1V": {
      id: "x''+1V",
      raw: "1e24",
      type: "incrementer",
      applyCost: 10e33,
      targetLevel: 2,
  },
  "x'''+5S": {
      id: "x'''+5S",
      raw: "5e21",
      type: "incrementer",
      applyCost: 100e33,
      targetLevel: 3,
  },
}

const extendFormula = (formula)=>{
  formula.content = formula.raw ? tokenize(formula.raw) : ""
  formula.isIncrementer = (formula.type === "incrementer")
  formula.isStatic = (formula.type === "static")
  formula.isAdvanced = (formula.type === "advanced")
  formula.isBasic = (formula.applyCost === 0)
  formula.targetName = targetVariables[formula.targetLevel]
  formula.hashtagU = formula.content.includes("#U")
  formula.hashtagB = formula.content.includes("#B")
  formula.hashtagF = formula.content.includes("#F")
  formula.hashtagE = formula.content.includes("#E")
}

//Calculate derived properties
Object.keys(formulaDictionary).forEach(function(key) {
  extendFormula(formulaDictionary[key]);
});

export default formulaDictionary