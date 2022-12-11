import {startingStones, stoneTable} from './AlphaStoneDictionary'
import AlphaStartingStone from './AlphaStartingStone'
import {formatNumber, spaces} from '../utilities'

export const calcStoneResultForX = (state, grid)=>{
    const stoneLevels = grid.flat().map((id)=>(state.startingStoneLevel[id]||0))
    const stoneLevelCounts = stoneLevels.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
    const startingXBonus = [...stoneLevelCounts.entries()].reduce((acc,[level,count])=>(acc+=Math.pow(level,count)),0)
    return startingXBonus
}

const calcLevelBoundaries = (state, grid)=>{
    const dimX = grid.length
    const dimY = grid[0].length
    const stoneLevels = grid.map((row)=>row.map((id)=>(state.startingStoneLevel[id]||0)))
    let boundaries = Array.from(Array(dimX), () => new Array(dimY).fill(0))
    let neighbours = Array.from(Array(dimX), () => new Array(dimY).fill(0))

//Right Neighbour
for (let x = 0; x+1<dimX; x++) {
    for (let y = 0; y<dimY; y++) {
        boundaries[x][y] += stoneLevels[x+1][y]
        neighbours[x][y] += 1
    }
}

//Left Neighbour
for (let x = 1; x<dimX; x++) {
    for (let y = 0; y<dimY; y++) {
        boundaries[x][y] += stoneLevels[x-1][y]
        neighbours[x][y] += 1
    }
}

    //Top Neighbour
    for (let x = 0; x<dimX; x++) {
        for (let y = 1; y<dimY; y++) {
            boundaries[x][y] += stoneLevels[x][y-1]
            neighbours[x][y] += 1
        }
    }

    //Bottom Neighbour
    for (let x = 0; x<dimX; x++) {
        for (let y = 0; y+1<dimY; y++) {
            boundaries[x][y] += stoneLevels[x][y+1]
            neighbours[x][y] += 1
        }
    }

    //Final Boundary 12 mal Average (9*currentLevel <= neighbourpoints+1)
    for (let x = 0; x<dimX; x++) {
        for (let y = 0; y<dimY; y++) {
            let multipliers = [12,12,6,4,3]
            boundaries[x][y] *= multipliers[neighbours[x][y]]
        }
    }

    return boundaries
}

export default function AlphaStonesTab({state, popup, updateState}) {

    const changeStoneMode = (mode)=>{
        updateState({name:"changeStoneMode", mode:mode})
    }

    const resetStones = ()=>{
        updateState({name:"resetStones"})
    }

    const xBonus = calcStoneResultForX(state,stoneTable)
    const boundaries = calcLevelBoundaries(state,stoneTable)

    return (
        <div>{<>
            <h2>Starting Stones</h2>
                <p>(a.k.a. "Why am I even doing these?")</p><br/>
                &nbsp;<button onClick={()=>changeStoneMode(1)}>{state.startingStoneMode===1?<b>Increment</b>:<>Increment</>}</button>&nbsp;&nbsp;
                <button onClick={()=>changeStoneMode(-1)}>{state.startingStoneMode===-1?<b>Decrement</b>:<>Decrement</>}</button>&nbsp;&nbsp;
                <button onClick={()=>changeStoneMode(0)}>{state.startingStoneMode===0?<b>Description</b>:<>Description</>}</button>&nbsp;&nbsp;
                <button onClick={resetStones}>Reset</button><br/><br/>
                {stoneTable.map((line,index)=><div key={index}>{line.map((stoneId, indey)=>
                    <AlphaStartingStone key={stoneId} state={state} stone={startingStones[stoneId]} boundary={boundaries[index][indey]} popup={popup} updateState={updateState}/>
                )}</div>)}
                <br/>
                <div style={{fontSize:"20px",fontWeight:"bold"}}>{spaces()}s<sub>x</sub> = {formatNumber(xBonus, state.settings.numberFormat)}</div>
                <div>{spaces()}adds or multiplies Starting x</div>
            </>}
        </div>)
}