import { describeFormula, tokenize } from "../game/formulaBuilder"
import { formatNumber } from "../utilities/formatter"

const targetVariables = ["x", "x'", "x''", "x'''"]

export const textifyFormula = (formula, context)=>{
  const formatter = (number)=>formatNumber(number, context.settings.numberFormat, 3)
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
      description: <>x' &#10141; 24</>,
      unlockCost: 600,
      applyCost: 30,
      applyNeed: 0,
      targetLevel: 1,
      isStatic: true,
      applyFormula: (eff, x)=>(24 * eff),
  },
  "x'+1": {
      id: "x'+1",
      description: <>x' &#10141; x' + 1</>,
      unlockCost: 3000,
      applyCost: 50,
      applyNeed: 0,
      targetLevel: 1,
      applyFormula: (eff, x)=>(x[1] + 1 * eff),
  },
  "x+1000": {
      id: "x+1000",
      description: <>x &#10141; x + 1000</>,
      unlockCost: 80000, //*4
      applyCost: 0,
      applyNeed: 10000,
      targetLevel: 0,
      applyFormula: (eff, x)=>(x[0] + 1000 * eff),
  },
  "x'+3": {
      id: "x'+3",
      description: <>x' &#10141; x' + 3</>,
      unlockCost: 600000,
      applyCost: 300,
      applyNeed: 0,
      targetLevel: 1,
      applyFormula: (eff, x)=>(x[1] + 3 * eff),
  },
  "x+x'": {
      id: "x+x'",
      description: <>x &#10141; x + x'</>,
      unlockCost: 1e6,
      applyCost: 0,
      applyNeed: 10,
      targetLevel: 0,
      effectLevel: 1,
      applyFormula: (eff, x)=>(x[0] + x[1] * eff),
      complex: true,
  },
  "x'+220": {
      id: "x'+220",
      description: <>x' &#10141; x' + 220</>,
      unlockCost: 10e6,
      applyCost: 100000,
      applyNeed: 0,
      targetLevel: 1,
      applyFormula: (eff, x)=>(x[1] + 220 * eff),
  },
  "x'=420K": {
      id: "x'=420K",
      descriptions: {
          "LETTER": <>x' &#10141; 420K</>,
          "SCIENTIFIC": <>x' &#10141; 420000</>,
          "AMBIGUOUS": <>x' &#10141; 420?</>,
      },
      unlockCost: 69e6,
      applyCost: 69,
      applyNeed: 0,
      targetLevel: 1,
      isStatic: true,
      applyFormula: (eff, x)=>(420000 * eff),
  },
  "x+50M": {
      id: "x+50M",
      descriptions: {
          "LETTER": <>x &#10141; x + 50M</>,
          "SCIENTIFIC": <>x &#10141; x + 5e7</>,
          "AMBIGUOUS": <>x &#10141; x + 50?</>,
      },
      unlockCost: 500e6, //*4
      applyCost: 0,
      applyNeed: 1e6,
      targetLevel: 0,
      applyFormula: (eff, x)=>(x[0] + 50e6 * eff),
  },

  //Tier 3 Formulas
  "x''=1": {
      id: "x''=1",
      description: <>x'' &#10141; 1</>,
      unlockCost: 200,
      applyCost: 0,
      applyNeed: 0,
      targetLevel: 2,
      isBasic: true,
      isStatic: true,
      applyFormula: (eff, x)=>(1 * eff),
  },
  "x''=2": {
      id: "x''=2",
      description: <>x'' &#10141; 2</>,
      unlockCost: 1500,
      applyCost: 100,
      applyNeed: 0,
      targetLevel: 2,
      isStatic: true,
      applyFormula: (eff, x)=>(2 * eff),
  },
  "x''=3": {
      id: "x''=3",
      description: <>x'' &#10141; 3</>,
      unlockCost: 2800,
      applyCost: 1000,
      applyNeed: 0,
      targetLevel: 2,
      isStatic: true,
      applyFormula: (eff, x)=>(3 * eff),
  },
  "x''=#U": {
      id: "x''=#U",
      description: <>x'' &#10141; 1.25<sup>#U</sup></>,
      unlockCost: 13000,
      applyCost: 5000,
      applyNeed: 0,
      targetLevel: 2,
      applyFormula: (eff, x,state)=>(Math.floor(Math.pow(1.25,state.formulaUnlockCount) * eff)),
      explanation: "Boosted by number of unlocked formulas.",
      isStatic: true,
      hashtagU: true,
      complex: true,
  },
  "x'=1000*x''": {
      id: "x'=1000*x''",
      description: <>x' &#10141; 1000x''</>,
      unlockCost: 111000,
      applyCost: 11000,
      applyNeed: 0,
      targetLevel: 1,
      effectLevel: 2,
      isStatic: true,
      applyFormula: (eff, x)=>(Math.floor(1000*x[2] * eff)),
      complex: true,
  },
  "x''=sqrt(x)": {
      id: "x''=sqrt(x)",
      description: <>x'' &#10141; x<sup>0.3</sup></>,
      unlockCost: 9e6,
      applyCost: 100000,
      applyNeed: 0,
      targetLevel: 2,
      isStatic: true,
      applyFormula: (eff, x)=>(x<0 ? {error:"imaginary"} : Math.floor(Math.pow(x[0],0.3) * eff)),
      complex: true,
  },
  "x''+1": {
      id: "x''+1",
      description: <>x'' &#10141; x''  + 1</>,
      unlockCost: 1.9e9,
      applyCost: 100000,
      applyNeed: 0,
      targetLevel: 2,
      applyFormula: (eff, x)=>(x[2]+1 * eff),
  },
  "x''+130": {
      id: "x''+130",
      description: <>x'' &#10141; x'' + 130</>,
      unlockCost: 37e9,
      applyCost: 49e6,
      applyNeed: 0,
      targetLevel: 2,
      applyFormula: (eff, x)=>(x[2]+130 * eff),
  },
  "x'+x^0.6": {
      id: "x'+x^0.6",
      description: <>x' &#10141; x' + x<sup>0.6</sup></>,
      unlockCost: 100e9, //*12
      applyCost: 250e6,
      applyNeed: 0,
      targetLevel: 1,
      applyFormula: (eff, x)=>(x<0 ? {error:"imaginary"} : x[1]+Math.pow(x[0],0.6) * eff),
      complex: true,
  },
  "x''+10B": {
      id: "x''+10B",
      descriptions: {
          "LETTER": <>x'' &#10141; x'' + 10B</>,
          "SCIENTIFIC": <>x'' &#10141; x'' + 1e10</>,
          "AMBIGUOUS": <>x'' &#10141; x'' + 10?</>,
      },
      unlockCost: 1e15, //??? check pricing
      applyCost: 200e6,
      applyNeed: 0,
      targetLevel: 2,
      applyFormula: (eff, x)=>(x[2]+10e9 * eff),
  },
  "x+50P": {
      id: "x+50P",
      descriptions: {
          "LETTER": <>x &#10141; x + 20P</>,
          "SCIENTIFIC": <>x &#10141; x + 2e19</>,
          "AMBIGUOUS": <>x &#10141; x + 20?</>,
      },
      unlockCost: 4e17, //*48
      applyCost: 0, 
      applyNeed: 100e6,
      targetLevel: 0,
      applyFormula: (eff, x)=>(x[0]+20e18 * eff),
  },

  //Tier 4 Formulas
  "x'''=1": {
      id: "x'''=1",
      description: <>x''' &#10141; 1</>,
      unlockCost: 2000,
      applyCost: 0,
      applyNeed: 0,
      targetLevel: 3,
      isBasic: true,
      isStatic: true,
      applyFormula: (eff, x)=>(1 * eff),
  },
  "x'''=(#U^2)/12": {
      id: "x'''=(#U^2)/12",
      description: <>x''' &#10141; #U<sup>2</sup>/12</>,
      unlockCost: 1e6,
      applyCost: 10000,
      applyNeed: 0,
      targetLevel: 3,
      isStatic: true,
      applyFormula: (eff, x,state)=>(Math.floor(Math.pow(state.formulaUnlockCount,2)/12 * eff)),
      explanation: "Boosted by number of unlocked formulas.",
      hashtagU: true,
      complex: true,
      
  },
  "x'''=4": {
      id: "x'''=4",
      description: <>x''' &#10141; 4</>,
      unlockCost: 10000,
      applyCost: 100,
      applyNeed: 0,
      targetLevel: 3,
      isStatic: true,
      applyFormula: (eff, x)=>(4 * eff),
  },
  "x'''=sqrt(2*#R)": {
      id: "x'''=sqrt(2*#R)",
      description: <>x''' &#10141; log<sub>2</sub>(#B)<sup>2</sup></>,
      unlockCost: 50000,
      applyCost: 3000,
      applyNeed: 0,
      targetLevel: 3,
      isStatic: true,
      applyFormula: (eff, x,state)=>(state.xResetCount <= 0 ? {error:"logarithm"} : Math.floor(Math.pow(Math.log2(state.xResetCount),2) * eff)),
      explanation: "Boosted by number of Basic Resets (since x-Reset).",
      hashtagB: true,
      complex: true,
  },
  "x'+x''+x'''": {
      id: "x'+x''+x'''",
      description: <>x' &#10141; x'+x''+x'''</>,
      unlockCost: 80e6,
      applyCost: 2e5,
      applyNeed: 0,
      targetLevel: 1,
      effectLevel: 3,
      applyFormula: (eff, x)=>x[1]+x[2] * eff+x[3] * eff,
      complex: true,
  },
  "x''+x'''^2": {
      id: "x''+x'''^2",
      description: <>x'' &#10141; x''+x'''<sup>2</sup></>,
      unlockCost: 10e9,
      applyCost: 2e6,
      applyNeed: 0,
      targetLevel: 2,
      effectLevel: 3,
      applyFormula: (eff, x)=>x[2]+Math.pow(x[3],2) * eff,
      complex: true,
  },
  "x'''+1": {
      id: "x'''+1",
      description: <>x''' &#10141; x'''+1</>,
      unlockCost: 4e12,
      applyCost: 400,
      applyNeed: 0,
      targetLevel: 3,
      applyFormula: (eff, x)=>(x[3]+1 * eff),
  },
  "x=10Q*x'''*x''/x'": {
      id: "x=10Q*x'''*x''/x'",
      descriptions: {
          "LETTER": <>x &#10141; 10Q * x''' * x'' / x'</>,
          "SCIENTIFIC": <>x &#10141; 1e16 * x''' * x'' / x'</>,
          "AMBIGUOUS": <>x &#10141; 10? * x''' * x'' / x'</>,
      },
      unlockCost: 2e15,
      applyCost: 0,
      applyNeed: 1e9,
      targetLevel: 0,
      effectLevel: 3,
      isStatic: true,
      applyFormula: (eff, x)=>(x[1] === 0 ? {error:"divide"} : 1e16*x[3]*x[2]/x[1] * eff),
      complex: true,
  },
  "x'=5Q*x'''": {
      id: "x'=5Q*x'''",
      descriptions: {
          "LETTER": <>x' &#10141; 5Q * x'''</>,
          "SCIENTIFIC": <>x' &#10141; 5e15 * x'''</>,
          "AMBIGUOUS": <>x' &#10141; 5? * x'''</>,
      },
      unlockCost: 120e18,
      applyCost: 1e10,
      applyNeed: 0,
      targetLevel: 1,
      effectLevel: 3,
      isStatic: true,
      applyFormula: (eff, x)=>(5e15*x[3] * eff),
      complex: true,
  },
  "x'''+log2(x)^2": {
      id: "x'''+log2(x)^2",
      description: <>x''' &#10141; x''' + log<sub>2</sub>(x)<sup>2</sup></>,
      unlockCost: 20e21,
      applyCost: 5e6,
      applyNeed: 0,
      targetLevel: 3,
      applyFormula: (eff, x)=>(x[0] <= 0 ? {error:"logarithm"} : x[3] + Math.pow(Math.log2(x[0]),2) * eff),
      complex: true,
  },
  "x'''+log2(#F/#E)^13": {
      id: "x'''+log2(#F/#E)^13",
      description: <>x''' &#10141; x''' + log<sub>2</sub>(#B + #F / #E)<sup>13</sup></>,
      unlockCost: 6e24,
      applyCost: 5e20,
      applyNeed: 0,
      targetLevel: 3,
      applyFormula: (eff, x,state)=>((state.xResetCount === 0 && state.formulaApplyCount <= 0) ? {error:"logarithm"} : x[3] + Math.pow(Math.log2(state.xResetCount + state.formulaApplyCount / state.myFormulas.length),13) * eff),
      explanation: "Boosted by formula applications (since x-Reset) and Basic Resets. Diminished by number of equipped formulas.",
      hashtagF: true,
      hashtagE: true,
      hashtagB: true,
      complex: true,
  },
  "x'+30S": {
      id: "x'+30S",
      descriptions: {
          "LETTER": <>x' &#10141; x' + 30S</>,
          "SCIENTIFIC": <>x' &#10141; x' + 3e22</>,
          "AMBIGUOUS": <>x' &#10141; x' + 30?</>,
      },
      unlockCost: 2e23, //*96K
      applyCost: 1e15,
      applyNeed: 0,
      targetLevel: 1,
      applyFormula: (eff, x)=>(x[1] + 30e21 * eff),
  },
  "x''+40P": {
      id: "x''+40P",
      descriptions: {
          "LETTER": <>x'' &#10141; x'' + 40P</>,
          "SCIENTIFIC": <>x'' &#10141; x'' + 4e19</>,
          "AMBIGUOUS": <>x'' &#10141; x' + 40?</>,
      },
      unlockCost: 25e24, //*8K
      applyCost: 1e21,
      applyNeed: 0,
      targetLevel: 2,
      applyFormula: (eff, x)=>(x[2] + 40e18 * eff),
  },
  "x'''*sqrt(300S-x''')/500B": {
      id: "x'''*sqrt(300S-x''')/500B", //x'''*sqrt(300S-x'''/2)/500B
      descriptions: {
          "LETTER": <>x''' &#10141; x''' * sqrt(300S - x''') / 500B</>,
          "SCIENTIFIC": <>x''' &#10141; x''' * sqrt(3e23 - x''') / 5e11</>,
          "AMBIGUOUS": <>x''' &#10141; x''' * sqrt(300? - x''') / 500?</>,
      },
      unlockCost: 5e30,
      applyCost: 1e9,
      applyNeed: 0,
      targetLevel: 3,
      applyFormula: (eff, x)=>((300e21 - x[3])<0 ? {error:"imaginary"} : Math.floor(x[3]*Math.sqrt(300e21 - x[3]) / 500e9)),
      complex: true,
      isStatic: true, //counts as static because too complicated
      offlineDisabled: true,
  },
  "x''+1V": {
      id: "x''+1V",
      description: <>x'' &#10141; x'' + 1V</>,
      descriptions: {
          "LETTER": <>x'' &#10141; x'' + 1V</>,
          "SCIENTIFIC": <>x'' &#10141; x'' + 1e24</>,
          "AMBIGUOUS": <>x'' &#10141; x'' + 1?</>,
      },
      unlockCost: 50e30, //*8000
      applyCost: 10e33,
      applyNeed: 0,
      targetLevel: 2,
      applyFormula: (eff, x,state)=>(x[2]+1e24 * eff),
  },
  "x'''+5S": {
      id: "x'''+5S",
      description: <>x''' &#10141; x''' + 5S</>,
      descriptions: {
          "LETTER": <>x''' &#10141; x''' + 5S</>,
          "SCIENTIFIC": <>x''' &#10141; x''' + 5e21</>,
          "AMBIGUOUS": <>x''' &#10141; x''' + 5?</>,
      },
      unlockCost: 900e33,
      applyCost: 100e33,
      applyNeed: 0,
      targetLevel: 3,
      applyFormula: (eff, x,state)=>(x[3]+5e21 * eff),
  },
}

const extendFormula = (formula)=>{
  formula.content = formula.raw ? tokenize(formula.raw) : ""
  formula.isIncrementer = (formula.type === "incrementer")
  formula.isStatic = (formula.type === "static")
  formula.isAdvanced = (formula.type === "advanced")
  formula.isBasic = (formula.applyCost === 0)
  formula.effectLevel = (formula.effectLevel || formula.targetLevel)
  formula.targetName = targetVariables[formula.targetLevel]
}

//Calculate derived properties
Object.keys(formulaDictionary).forEach(function(key) {
  extendFormula(formulaDictionary[key]);
});

export default formulaDictionary