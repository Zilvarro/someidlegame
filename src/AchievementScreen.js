import {alphaTarget, getChallengeBonus} from './savestate'
import {countAlphaUpgrades} from './alpha/AlphaUpgradeTab'
import {orderedEndings, endingList} from './endings/EndingDictionary'

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
    description:<>Perform a Basic Reset</>,
    check: (state)=>(state.xResetCount >= 1),
    tier: 0,
  },{
    id:"S",
    name:"Speedy",
    description:<>Perform an x'-Reset</>,
    check: (state)=>(state.highestXTier >= 1),
    tier: 0,
  },{
    id:"S'",
    name:"Accelerated",
    description:<>Perform an x''-Reset</>,
    check: (state)=>(state.highestXTier >= 2),
    tier: 0,
  },{
    id:"S''",
    name:"Getting Jerky",
    description:<>Perform an x'''-Reset</>,
    check: (state)=>(state.highestXTier >= 3),
    tier: 0,
  },{
    id:"ProgressBar",
    name:"Making Progress",
    description:<>Fill the Green Progress Bar</>,
    check: (state)=>(state.xValue[0] >= alphaTarget),
    tier: 0,
  },{
    id:"Alpha",
    name:"A new Era",
    description:<>&alpha;-Reset and buy an Alpha Upgrade</>,
    check: (state)=>(state.alphaUpgrades.SLOT || state.alphaUpgrades.AAPP || state.alphaUpgrades.UREF),
    tier: 1,
  },{
    id:"BasicResearch",
    name:"Researcher",
    description:<>Reach Level 100 for every Research</>,
    check: (state)=>(state.researchLevel["x"] >= 100 && state.researchLevel["x'"] >= 100 && state.researchLevel["x''"] >= 100 && state.researchLevel["x'''"] >= 100),
    tier: 1,
  },{
    id:"SingleChallenge",
    name:"Challenge Accepted",
    description:<>Clear a Challenge</>,
    check: (state)=>(getChallengeBonus(state).full >= 1),
    tier: 1,
  },{
    id:"ManyUpgrades",
    name:"I love Upgrades",
    description:<>Buy 9 Alpha Upgrades</>,
    check: (state)=>countAlphaUpgrades(state)>=9,
    tier: 1,
  },{
    id:"MaxResearch",
    name:"Brilliant Scientist",
    description:<>Get a Research to Level 2500</>,
    check: (state)=>(state.researchLevel["x"] >= 2500 || state.researchLevel["x'"] >= 2500 || state.researchLevel["x''"] >= 2500 || state.researchLevel["x'''"] >= 2500),
    tier: 1,
  },{
    id:"AlphaTrueEnd",
    name:"Deepest Desire",
    description:<>State your greatest wish</>,
    check: (state)=>(state.completedEndings["worldselect"]),
    tier: 1,
  },
]

export const destinyMileStoneList = [{
    id:"StarLight",
    name:"Light of the Stars",
    description:<>Get 100 Starlight</>,
    check: (state)=>(state.starLight >= 100),
    tier: 4,
  },{
    id:"LuminousMoon",
    name:"Glow of the Moon",
    description:<>Get a Luminous Moon</>,
    check: (state)=>(state.lightRaiser >= 1),
    tier: 4,
  },{
    id:"ConstellationsA",
    name:"Aspiring",
    description:<>Get 1 Star Constellation</>,
    check: (state)=>(state.constellationCount >= 1),
    tier: 4,
  },{
    id:"ConstellationsB",
    name:"Ambitious",
    description:<>Get 3 Star Constellations</>,
    check: (state)=>(state.constellationCount >= 3),
    tier: 4,
  },{
    id:"ConstellationsC",
    name:"Committed",
    description:<>Get 6 Star Constellations</>,
    check: (state)=>(state.constellationCount >= 6),
    tier: 4,
  },{
    id:"ConstellationsD",
    name:"Enlightened",
    description:<>Get all 12 Star Constellations</>,
    check: (state)=>(state.constellationCount >= 12),
    tier: 4,
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
  {
    id:"DESTINY",
    name:"DESTINY",
    description: "Wait there's more?",
    check: (state)=>(state.destinyStars >= 1),
    tier: 4,
  },
]

export default function AchievementScreen({state}) {
  return (<div style={{padding: "10px"}}>
    <h1>Milestones</h1>
      <ol>
        {milestoneList.map((milestone, index)=>
          <Milestone key={milestone.id} state={state} milestone={milestone} isReached={state.mileStoneCount > index}/>
        )}
        {destinyMileStoneList.map((milestone, index)=>
          <Milestone key={milestone.id} state={state} milestone={milestone} isReached={state.destinyMileStoneCount > index}/>
        )}
      </ol>
      <br/>

    {Object.keys(state.completedEndings).length > 0 && <><h1>Endings</h1>
      <ul style={{listStyle:"none"}}>
        {orderedEndings.map((endingName, index)=>{
          const ending = endingList[endingName]
          return <Ending key={endingName} state={state} ending={ending} isReached={state.completedEndings[endingName]}/>
        })}
      </ul></>}
  </div>)
}

function Milestone({milestone,isReached, state}) {
  if (state.progressionLayer < milestone.tier && state.destinyStars < 1)
    return undefined

  const mileStoneColors=["#99FF99","#ff7777","#55ffbb","#663366","#ffff88"]
  return <li style={{margin:"5px", color: isReached ? mileStoneColors[milestone.tier] : "000000"}}>[{milestone.name}]&nbsp;&nbsp;{milestone.description}</li>
}

function Ending({ending, isReached, state}) {
  const lastSlide = ending.actions[ending.actions.length - 1] 
  if (!isReached && !state.completedEndings["true"])
    return undefined
  if (!isReached)
    return <li style={{margin:"5px", color: "#aaaaaa"}}>[{ending.teaseHeaderText || lastSlide.teaseHeaderText}]&nbsp;&nbsp;{ending.teaseTitle || lastSlide.teaseTitle}</li>
  return <li style={{margin:"5px", color:"#ffffff"}}>[{ending.headerText||lastSlide.headerText}]&nbsp;&nbsp;{ending.title || lastSlide.title}</li>
}