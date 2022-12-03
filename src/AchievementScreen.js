export const milestoneList = [
  {
    id:"x=10",
    name:"First Steps",
    description:<>Reach x=10</>,
    check: (state)=>(state.xValue[0] >= 10),
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
    id:"Alpha",
    name:"So It Begins",
    description:<>Perform an &alpha;-Reset</>,
    teaseName:"?? ?? ??????",
    teaseDescription:<>??????? ?? ???????</>,
    check: (state)=>(state.maxAlpha >= 1),
    tier: 1,
    teased: 0
  },{
    id:"Research",
    name:"Research",
    description:<>Do some Research</>,
    check: (state)=>(false),
    tier: 1,
  },{
    id:"Challenge",
    name:"Challenge",
    description:<>Clear a Challenge</>,
    check: (state)=>(false),
    tier: 1,
  },{
    id:"AllUpgrades",
    name:"All Alpha Upgrades",
    description:<>Buy all Alpha Upgrades</>,
    check: (state)=>(false),
    tier: 1,
  },{
    id:"AllChallenges",
    name:"All Challenges",
    description:<>Clear all Challenges</>,
    check: (state)=>(false),
    tier: 1,
  },{
    id:"Much Alpha",
    name:"Much Alpha",
    description:<>Reach &alpha; = TBD</>,
    check: (state)=>(false),
    tier: 1,
  },{
    id:"World Reset",
    name:"Essence of the World",
    description:<>Perform a World Reset</>,
    check: (state)=>(false),
    teaseName:"?? ?? ??????",
    teaseDescription:<>??????? ?? ???????</>,
    tier: 2,
    teased: 1,
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