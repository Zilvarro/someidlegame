export const alphaUpgradeDictionary = {
  "AAPP": {
      id:"AAPP",
      title:"Auto Applier",
      description:"Applies a formula for you ten times per second, if beneficial.",
      cost:1,
  },
  "FREF": {
      id:"FREF",
      requires: "AAPP",
      title:"Formula Refund",
      description:"Applying formulas does not reduce x.",
      cost:2,
  },
  "SAPP": {
      id:"SAPP",
      requires: "FREF",
      title:"Super Applier",
      description:"Auto Applier can handle multiple formulas simultaneously.",
      cost:4,
  },
  "OAPP": {
      id:"OAPP",
      requires: "SAPP",
      title:"Offline Applier",
      description:"Auto Applier works offline.",
      cost:1000,
  },
  "AUNL": {
      id:"AUNL",
      title:"Auto Unlocker",
      description:"Automatically unlocks formulas. Unlocking formulas does not reduce x.",
      cost:1,
  },
  "MEEQ": {
      id:"MEEQ",
      requires: "AUNL",
      title:"Memorize Equip",
      description:"One Equipment loadout can be saved and loaded for each stage.",
      cost:2,
  },
  "AREM": {
      id:"AREM",
      requires: "MEEQ",
      title:"Auto Rememberer",
      description:"Memorized equipment is automatically loaded when differentials are unlocked.",
      cost:4,
  },
  "MEMS": {
      id:"MEMS",
      requires: "AREM",
      title:"Better Memory",
      description:"Up to three different Equipment loadouts can be saved.",
      cost:10000,
  },
  "SLOT": {
      id:"SLOT",
      title:"Formula Slot",
      description:"Grants an additional formula equipment slot.",
      cost:1,
  },
  "PALP": {
      id:"PALP",
      requires: "SLOT",
      title:"Passive Alpha",
      description:"Gain Alpha Tokens passively in Intervals of the fastest Alpha-Reset (min 1/day). Works offline!",
      cost:2,
  },
  "SRES": {
      id:"SRES",
      requires: "PALP",
      title:"X Resetter",
      description:"Automatically performs x-Resets.",
      cost:4,
  },
  "ARES": {
      id:"ARES",
      requires: "SRES",
      title:"Alpha Resetter",
      description:"Automatically performs Alpha-Resets. Can also complete Challenges.",
      cost:100,
  },
  "BR1": {
      fixed: <br/>
  },
  "BR2": {
      fixed: <br/>
  },
}

export const alphaUpgradeTable = ["SLOT","PALP","SRES","ARES","BR1","AAPP","FREF","SAPP","OAPP","BR2","AUNL","MEEQ","AREM","MEMS"]
export const autoAlphaUpgrades = ["SLOT","PALP","SRES","ARES","AAPP","FREF","SAPP","OAPP","AUNL","MEEQ","AREM","MEMS"]