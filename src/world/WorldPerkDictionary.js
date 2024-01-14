export const worldPerkDictionary = {
  "ALPR": {
      id:"ALPR",
      title:"Alpha Refund",
      description:"Your Alpha Tokens are no longer reduced when buying Upgrades.",
      cost:1,
  },
  "AUPG": {
      id:"AUPG",
      title:"Auto Upgrader",
      line1: "Auto",
      line2: "Upgrader",
      description:"Automatically buys Alpha Upgrades.",
      cost:1,
  },
  "ACHA": {
      id:"ACHA",
      title:"Challenge Helper",
      line1: "Challenge",
      line2: "Helper",
      description:"Automatically completes trivial Challenge Segments based on advanced AI.",
      cost:1,
  },
  "AURS": {
      id:"AURS",
      title:"Auto Researcher",
      line1: "Auto",
      line2: "Researcher",
      description:"Automatically unlocks and performs Research.",
      cost:1,
  },
  "AVRS": {
      id:"AVRS",
      title:"Advanced Research",
      description:"Unlocks some new Research bars.",
      cost:1,
  },
  "NCHA": {
      id:"NCHA",
      title:"New Challenges",
      description:"Unlocks some new Challenges.",
      cost:1,
  },
  "STOF": {
      id:"STOF",
      title:"Alpha Stones",
      description:"Adds a new effect to Starting Stones.",
      cost:1,
  },
  "WSLO": {
      id:"WSLO",
      title:"Another Slot",
      line1: "Another",
      line2: "Slot",
      description:"Grants an additional formula equipment slot.",
      cost:2,
  },
  "PESS": {
      id:"PESS",
      title:"Passive Essence",
      description:"Get World essence passively based on fastest World Reset.",
      cost:1,
  },
  "LSTO": {
      id:"LSTO",
      title:"Liberty Stones",
      description:"Unlock Liberty Stones.",
      cost:1,
  },
  "PBUL": {
      id:"PBUL",
      title:"Perfect Bulking",
      description:"Unclaimed research levels continue to accumulate.",
      cost:1,
  },
  "PROD": {
    id:"PROD",
    title:"Production",
    description:"All X-Production is multiplied by 10.",
    cost:1,
  },
  "X4PR": {
    id:"X4PR",
    title:"Jounce",
    description:"The fourth differential can be reached.",
    cost:1,
  },
  "UDIS": {
    id:"UDIS",
    title:"Unlock Discount",
    description:"Unlocking Formulas is 80% cheaper.",
    cost:1,
  },
  "ABCR": {
    id:"ABCR",
    title:"Base Alpha Uncapper",
    description:"Base Alpha Upgrade Limit is removed.",
    cost:1,
  },
  "MOPA": {
    id:"MOPA",
    title:"More Passive Alpha",
    description:"Passive Alpha gain is 10 times faster.",
    cost:1,
  },
  "RSCR": {
    id:"RSCR",
    title:"Research Cap Remover",
    description:"Level Cap for Research is removed.",
    cost:1,
  },
  "RUNL": {
    id:"RUNL",
    title:"Research Unlocker",
    description:"All Research starts unlocked.",
    cost:1,
  },
  "RSCA": {
    id:"RSCA",
    title:"Research Scaling",
    description:"Research times scale slower with level.",
    cost:1,
  },
  "RSPD": {
    id:"RSPD",
    title:"Research Speed",
    description:"Research is 10 times faster.",
    cost:1,
  },
  "CHUN": {
    id:"CHUN",
    title:"Unlocked Challenges",
    description:"All Challenges are unlocked.",
    cost:1,
  },
  "MOIB": {
    id:"MOIB",
    title:"Master Keeper",
    description:"Master of Idle Perk is unlocked from the start. (But fully idle time is still reset)",
    cost:1,
  },
  "AUFG": {
    id:"AUFG",
    title:"Formula Godder",
    description:"Get a little Formula God Research Boost without doing the challenge. (based on Starting X, Production and Formula Efficiency)",
    cost:1,
  },
  "SEGB": {
    id:"SEGB",
    title:"Better Segments",
    description:"Challenge Segement Completions give +50% Formula Efficiency instead of +15%",
    cost:1,
  },
  "COMB": {
    id:"COMB",
    title:"Better Completions",
    description:"Full Challenge Completions give x5 Formula Efficiency instead of x2",
    cost:1,
  },
  "TGRD": {
    id:"TGRD",
    title:"Target Reduction",
    description:"Reduces Target for differentials and minimum Alpha requirement. (Both inside and outside Challenges)",
    cost:1,
  },
  "TLRM": {
    id:"TLRM",
    title:"Time Limit Remover",
    description:"Challenges do not have the 30-minute time limit anymore.",
    cost:1,
  },
  "LOOM": {
    id:"LOOM",
    title:"Looper Mode",
    description:"Allows accessing Looper Mode if Starting X is high enough.",
    cost:1,
  },
  "POLI": {
    id:"POLI",
    title:"Polishing",
    description:"Starting Stones can be unlocked by polishing them.",
    cost:1,
  },
  "OCAP": {
    id:"OCAP",
    title:"Overcap",
    description:"Liberty Stones can be used to go over Stone cap.",
    cost:1,
  },
  "STAX": {
    id:"STAX",
    title:"Starting X",
    description:"Get 10 times more Starting X.",
    cost:1,
  },
  "NULL": {
    id:"NULL",
    title:"???",
    description:"??????",
    cost:Infinity,
  },
  "BR1": {
      fixed: <br/>
  },
  "BR2": {
      fixed: <br/>
  },
}

export const worldPerkDeck = ["AUPG","AURS","ACHA","WSLO"]

export const worldPerkTable = ["ALPR","AUPG","ACHA","AURS","BR1","AVRS","NCHA","STOF","WSLO","BR2","PESS","LSTO","PBUL"]

export const formulaPathPerks = ["WSLO","PROD","X4PR","UDIS"]
export const alphaPathPerks = ["ALPR","AUPG","ABCR","MOPA"]
export const researchPathPerks = ["PBUL","AURS","AVRS","RSCR","RUNL","RSCA","RSPD"]
export const challengePathPerks = ["ACHA","NCHA","CHUN","MOIB","AUFG","SEGB","COMB","TLRM","TGRD"]
export const stonePathPerks = ["LSTO","STOF","LOOM","POLI","OCAP","STAX"]
export const mainPathPerks = ["PESS"]