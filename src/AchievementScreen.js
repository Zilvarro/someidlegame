import {alphaTarget, getChallengeBonus} from './savestate'
import {countAlphaUpgrades} from './alpha/AlphaUpgradeTab'

export const milestoneList = [
  {
    id:"One Hundred",
    name:"First Steps",
    description:<>Reach x=100</>,
    check: (state)=>(state.xValue[0] >= 100),
    tier: 0,
  },{
    id:"XReset",
    name:"Back To Zero",
    description:<>Perform an X-Reset</>,
    check: (state)=>(state.xResetCount >= 1),
    tier: 0,
  },{
    id:"S",
    name:"Speedy Boi",
    description:<>Perform the first S-Reset</>,
    check: (state)=>(state.highestXTier >= 1),
    tier: 0,
  },{
    id:"S'",
    name:"Accelerate",
    description:<>Perform the second S-Reset</>,
    check: (state)=>(state.highestXTier >= 2),
    tier: 0,
  },{
    id:"S''",
    name:"Getting Jerky",
    description:<>Perform the third S-Reset</>,
    check: (state)=>(state.highestXTier >= 3),
    tier: 0,
  },{
    id:"ProgressBar",
    name:"Making Progress",
    description:<>Fill up the Progress Bar</>,
    check: (state)=>(state.xValue[0] >= alphaTarget),
    tier: 0,
  },{
    id:"Alpha",
    name:"A new Era",
    description:<>&alpha;-Reset and buy an Alpha Upgrade</>,
    teaseName:"? ??? ???",
    teaseDescription:<>?????? ??? ??? ?? ????? ???????</>,
    check: (state)=>(state.alphaUpgrades.SLOT || state.alphaUpgrades.AAPP || state.alphaUpgrades.UREF),
    tier: 1,
    teased: 0
  },{
    id:"BasicResearch",
    name:"Researcher",
    description:<>Reach Level 100 for all Research Bars</>,
    check: (state)=>(state.researchLevel["x"] >= 100 && state.researchLevel["x'"] >= 100 && state.researchLevel["x''"] >= 100 && state.researchLevel["x'''"] >= 100),
    tier: 1,
  },{
    id:"SingleChallenge",
    name:"Challenger Appeared",
    description:<>Clear a Challenge</>,
    check: (state)=>(getChallengeBonus(state).full >= 1),
    tier: 1,
  },{
    id:"AllUpgrades",
    name:"Upgrade Complete",
    description:<>Buy all Alpha Upgrades</>,
    check: (state)=>countAlphaUpgrades(state)>=12,
    tier: 1,
  },{
    id:"MaxResearch",
    name:"Brilliant Scientist",
    description:<>Get a Research Bar to Level 2500</>,
    check: (state)=>(state.researchLevel["x"] >= 2500 || state.researchLevel["x'"] >= 2500 || state.researchLevel["x''"] >= 2500 || state.researchLevel["x'''"] >= 2500),
    tier: 1,
  },{
    id:"StartingStones",
    name:"No Stone Unturned",
    description:<>Get all Starting Stones</>,
    check: (state)=>(false),
    tier: 1,
  },{
    id:"AlphaTrueEnd",
    name:"Deepest Desire",
    description:<>Make your wish come true</>,
    check: (state)=>(false),
    tier: 1,
  // },{
  //   id:"World Reset",
  //   name:"Essence of the World",
  //   description:<>Perform a World Reset</>,
  //   check: (state)=>(false),
  //   teaseName:"?? ?? ??????",
  //   teaseDescription:<>??????? ?? ???????</>,
  //   tier: 2,
  //   teased: 1,
  },
]

export const layerList = [
  {
    id:"FORMULAS",
    name:"FORMULAS",
    description: "First of many x to come...",
    check: (state)=>(state.xValue[0] >= 1),
    tier: 0,
  },
  {
    id:"ALPHA",
    name:"ALPHA",
    description: "New Layer Unlocked",
    check: (state)=>(state.alpha >= 1),
    tier: 1,
  },
]

export default function AchievementScreen({state}) {
  return (<div style={{padding: "10px"}}>
    <h1>Milestones</h1>
      <ol>
        {milestoneList.map((milestone, index)=>
          <Milestone key={milestone.id} state={state} milestone={milestone} isReached={state.mileStoneCount > index}/>
        )}
      </ol>
  </div>)
}

function Milestone({milestone,isReached, state}) {
  if (!isReached && milestone.teased === state.progressionLayer)
    return <li style={{margin:"5px", color: "000000"}}>[{milestone.teaseName}]&nbsp;&nbsp;{milestone.teaseDescription}</li>

  if (!isReached && milestone.tier > state.progressionLayer) return undefined
  const mileStoneColors=["#99FF99","#ff7777","#55ffbb","#663366","#ffff88"]
  return <li style={{margin:"5px", color: isReached ? mileStoneColors[milestone.tier] : "000000"}}>[{milestone.name}]&nbsp;&nbsp;{milestone.description}</li>
}