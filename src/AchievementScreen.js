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
    check: (state)=>(state.maxAlpha >= 1),
    tier: 1,
  // },{
  //   id:"AlphaUpgrades",
  //   name:"Alpha Chad",
  //   description:<>Get all Alpha Upgrades</>,
  //   check: (state)=>(false),
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
  if (milestone.tier > state.progressionLayer) return undefined
  const mileStoneColors=["#99FF99","#ff5555","#55ffbb","#663366","#ffff88"]
  return <li style={{margin:"5px", color: isReached ? mileStoneColors[milestone.tier] : "000000"}}>[{milestone.name}]&nbsp;&nbsp;{milestone.description}</li>
}