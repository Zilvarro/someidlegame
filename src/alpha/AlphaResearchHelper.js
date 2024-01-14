import { getGlobalMultiplier } from '../savestate'
import {reverseGeometric, clamp} from '../utilities'
import { researchDictonary } from './AlphaResearchTab'

export const researchList = ["x","x'","x''","x'''"]
export const differentialTargets = [20e3,20e9,20e21,Infinity]


export const getCumulResearchInfo = (state,researchList)=>{
    const researchInfos = researchList.map((researchName)=>checkResearch(state,researchName))
    const cumulInfo = researchInfos.reduce((cumul, info)=>{
        
        cumul.totalLevel += info.researchLevel
        cumul.allBlocked &&= info.isBlocked
        if (!info.isBlocked) {
          cumul.percentage = info.remainingTime <= cumul.remainingTime ? info.percentage : cumul.percentage
          cumul.bulkAmount += info.bulkAmount
          cumul.isDone ||= info.isDone
          cumul.remainingTime = Math.min(cumul.remainingTime,info.remainingTime)
        }
        return cumul
    },
        {
            percentage : 0,
            bulkAmount : 0,
            isDone: false,
            remainingTime : Infinity,
            totalLevel : 0,
            allBlocked : true,
        }
    )
    return cumulInfo
  }
  
  export const checkResearch = (state, researchName)=>{
    const research = researchDictonary[researchName]
    const startTime = state.researchStartTime[research.id]
    const researchLevel = state.researchLevel[research.id]
    const deltaMilliSeconds = startTime ? Date.now() - startTime : 0
    const progressMultiplier = getGlobalMultiplier(state) * research.getMultiplier(state)
    const progress = progressMultiplier * deltaMilliSeconds / 1000
    const goal = research.durationStart * Math.pow(research.durationBase, researchLevel || 0)
    const remainingTime = Math.max(1, (goal - progress) / progressMultiplier)
    const percentage = Math.min(deltaMilliSeconds / research.minimumDuration, progress / goal)
    const isDone = (!researchLevel || percentage >= 1)
    const leftToMaxx = 2500 - (researchLevel||0)
    const oneSecondBulk = isDone ? reverseGeometric(1, research.durationBase, progressMultiplier / goal) : 0 //Theoretical Research Levels in 1 Second
    const adjustedBulk = oneSecondBulk > getGlobalMultiplier(state) ? Math.pow(oneSecondBulk / getGlobalMultiplier(state), 0.3) * getGlobalMultiplier(state) : oneSecondBulk
    const bulkAmount = isDone ? clamp(1, Math.floor(adjustedBulk), leftToMaxx) : 0
    
    const perfectBulk = isDone ? reverseGeometric(1, research.durationBase, progress / goal) : 0 //Theoretical Research Levels since last claim
    const perfectBulkAmount = isDone ? clamp(1, Math.floor(perfectBulk), leftToMaxx) : 0
    
    return {
      researchLevel,
      isDone,
      remainingTime,
      bulkAmount : state.worldPerks.PBUL ? perfectBulkAmount : bulkAmount,
      percentage,
      isBlocked: (!researchLevel && state.progressionLayer <=1) || researchLevel >= 2500,
    }
  }