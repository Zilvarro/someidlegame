import { ALPHATARGET } from "../game/constants"

const stageDictionary = {
  "x":{
    id:"x",
    maxTier: 0,
    xGoal: 20000,
    nextStage: "x'",
    formulas: [
      {id:"x+1", unlock: 0},
      {id:"x+5", unlock: 50},
      {id:"x+10", unlock: 500},
      {id:"x+20", unlock: 2000},
      {id:"x+50", unlock: 5000},
      {id:"x+100", unlock: 10000},

      {id: "x+1000", unlock: 80000},
      {id: "x+50M", unlock: 5e8},
    
      {id: "x+20P", unlock: 4e17},
    ],
  },
  
  "x'":{
    id:"x'",
    maxTier: 1,
    xGoal: 20e9,
    nextStage: "x''",
    formulas: [
      {id: "x'=1", unlock: 0},
      {id: "x+1", unlock: 30},
      {id: "x+5", unlock: 200},
      {id: "x'=24", unlock: 600},
      {id: "x+10", unlock: 2000},
      {id: "x'+1", unlock: 3000},
      {id: "x+20", unlock: 8000},
      {id: "x+50", unlock: 20000},
      {id: "x+100", unlock: 40000},
    
      {id: "x+1000", unlock: 3.2e5},
      {id: "x'+3", unlock: 6e5},
      {id: "x+x'", unlock: 1e6},
      {id: "x'+220", unlock: 1e7},
      {id: "x'=420K", unlock: 6.9e7},
      {id: "x+50M", unlock: 2e9},
    
      {id: "x'+x^0.6", unlock: 1e11},
      {id: "x+20P", unlock: 1.6e18},
    
      {id: "x'+30S", unlock: 2e23},
    ],
  },
    
  "x''":{
    id:"x''",
    maxTier: 1,
    xGoal: 2e22,
    nextStage: "x'''",
    formulas: [
      {id: "x'=1", unlock: 0},
      {id: "x+1", unlock: 30},
      {id: "x''=1", unlock: 200},
      {id: "x''=2", unlock: 1500},
      {id: "x+5", unlock: 2400},
      {id: "x''=3", unlock: 2800},
      {id: "x'=24", unlock: 7200},
      {id: "x''=1.25^#U", unlock: 13000},
      {id: "x+10", unlock: 24000},
      {id: "x'+1", unlock: 36000},
      {id: "x+20", unlock: 96000},
      {id: "x'=1000*x''", unlock: 111e3},
      {id: "x+50", unlock: 240e3},
      {id: "x+100", unlock: 480e3},
    
      {id: "x+1000", unlock: 3.84e6},
      {id: "x'+3", unlock: 7.2e6},
      {id: "x''=x^0.3", unlock: 9e6},
      {id: "x+x'", unlock: 1.2e7},
      {id: "x'+220", unlock: 1.2e8},
      {id: "x'=420K", unlock: 8.28e8},
      {id: "x''+1", unlock: 1.9e9},
      {id: "x+50M", unlock: 2.4e10},
      {id: "x''+130", unlock: 3.7e10},
    
      {id: "x'+x^0.6", unlock: 1.2e12},
      {id: "x''+10B", unlock: 1e15},
      {id: "x+20P", unlock: 1.92e19},
    
      {id: "x'+30S", unlock: 2.4e24},
      {id: "x''+40P", unlock: 2.5e25},
      {id: "x''+1V", unlock: 5e31},
    ],
  },

  "x'''":{
    id:"x'''",
    maxTier: 3,
    xGoal: Infinity,
    aGoal: ALPHATARGET,
    nextStage: "x*",
    formulas: [
      {id: "x'=1", unlock: 0},
      {id: "x+1", unlock: 30},
      {id: "x''=1", unlock: 200},
      {id: "x'''=1", unlock: 2000},
      {id: "x'''=4", unlock: 10000},
      {id: "x'''=log2(#B)^2", unlock: 50000},
      {id: "x'''=#U^2/12", unlock: 1e6},
      {id: "x''=2", unlock: 1.2e7},
      {id: "x+5", unlock: 1.92e7},
      {id: "x''=3", unlock: 2.24e7},
      {id: "x'=24", unlock: 5.76e7},
      {id: "x'+x''+x'''", unlock: 8e7},
      {id: "x''=1.25^#U", unlock: 1.04e8},
      {id: "x+10", unlock: 1.92e8},
      {id: "x'+1", unlock: 2.88e8},
      {id: "x+20", unlock: 7.68e8},
      {id: "x'=1000*x''", unlock: 8.88e8},
      {id: "x+50", unlock: 1.92e9},
      {id: "x+100", unlock: 3.84e9},
      {id: "x''+x'''^2", unlock: 1e10},
    
      {id: "x+1000", unlock: 3.07e10},
      {id: "x'+3", unlock: 5.76e10},
      {id: "x''=x^0.3", unlock: 7.2e10},
      {id: "x+x'", unlock: 9.6e10},
      {id: "x'+220", unlock: 9.6e11},
      {id: "x'''+1", unlock: 4e12},
      {id: "x'=420K", unlock: 6.62e12},
      {id: "x''+1", unlock: 1.52e13},
      {id: "x+50M", unlock: 1.92e14},
      {id: "x''+130", unlock: 2.96e14},
      {id: "x=10Q*x'''*x''/x'", unlock: 1e15},
    
      {id: "x'+x^0.6", unlock: 9.6e15},
      {id: "x''+10B", unlock: 8e18},
      {id: "x'=5Q*x'''", unlock: 1.2e20},
      {id: "x'''+log2(x)^2", unlock: 2e22},
      {id: "x+20P", unlock: 1.54e23},
    
      {id: "x'''+log2(#B+#F/#E)^13", unlock: 6e24},
      {id: "x'+30S", unlock: 1.92e28},
      {id: "x''+40P", unlock: 2e29},
      {id: "x'''*sqrt(300S-x''')/500B", unlock: 5e30},
      {id: "x''+1V", unlock: 4e35},
      {id: "x'''+5S", unlock: 9e35},
    ],
  },
  "x*":{
    id:"x*",
    maxTier: 3,
    wGoal: 20000,
    formulas: [
      {id:"x+1", unlock: 0},
    ],
  },
}

export default stageDictionary
export const stageList = ["x", "x'", "x''", "x'''", "x*"]