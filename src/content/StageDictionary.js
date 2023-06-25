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
    ],
  },
  "x'":{
    id:"x",
    maxTier: 1,
    xGoal: 20e9,
    nextStage: "x'",
    formulas: [
      {id:"x'=1", unlock: 0},
      {id:"x+1", unlock: 30},
      {id:"x+5", unlock: 200},
      {id:"x+10", unlock: 2000},
      {id:"x+20", unlock: 8000},
      {id:"x+50", unlock: 20000},
      {id:"x+100", unlock: 40000},
    ],
  },
}

export default stageDictionary
export const stageList = ["x", "x'", "x''", "x'''"]