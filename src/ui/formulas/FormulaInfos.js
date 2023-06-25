import { useContext } from "react";
import { AppContext } from "../App";
import { ALPHATARGET, layers } from "../../game/constants";
import { formatNumber, secondsToHms } from "../../utilities/formatter";
import InfoLine from "./InfoLine";

export default function FormulaInfos() {
  const context = useContext(AppContext)
  const basicRun = context.formulas.basicRun
  const stageRun = context.formulas.stageRun
  const activeChallenges = context.derived.activeChallenges
  const layerFinished = context.general.progressionLayer > layers.formulas
  const differentialTarget = 100
  const xResetVisible = basicRun.xValues[0] >= 100 //TODO stage target
  const xResetAvailable = basicRun.xValues[0] >= 100 //TODO stage target
  const alphaResetAvailable = layerFinished && stageRun.currentStage===3 && !basicRun.inNegativeSpace && !context.alpha.currentChallenge && basicRun.xValues[0] >= 100
  const sResetName = "x'"
  const alphaRewardTier = {
    next: 2e34,
    nextAlpha: 1,
    alpha: 1,
  }
  

  const negativeSpaceInfo = ()=>{
    context.popup.alert(<>When an X-Value becomes negative, you enter Negative Space.<br/>While in Negative Space: x-Resets, Alpha-Resets and Challenge Completions are disabled.<br/>You can leave Negative Space by doing a Basic Reset or aborting your run.</>)
  }

  return (<div>
    <InfoLine visible={basicRun.inNegativeSpace}><b>You are in Negative Space!</b><button onClick={negativeSpaceInfo}>About Negative Space</button></InfoLine>
    <InfoLine visible={!layerFinished && stageRun.currentStage === 0 && stageRun.formulaUnlockCount < 4}>Unlock {4 - stageRun.formulaUnlockCount} more formula{stageRun.formulaUnlockCount !== 3 && "s"} to enable Basic Resets</InfoLine>
    <InfoLine visible={context.alpha.currentChallenge}>You are currently in the "{context.derived.currentChallengeName}" Challenge.{stageRun.playtime > 600e3 && <> (Time Limit: {secondsToHms(1800-stageRun.playtime/1000)})</>}</InfoLine>
    <InfoLine visible={activeChallenges.COUNTDOWN}>Countdown: {secondsToHms(30 - basicRun.playtime / 1000)}</InfoLine>
    <InfoLine visible={activeChallenges.LIMITED}>You can apply {100 - stageRun.formulaApplyCount} more formulas.</InfoLine>
    <InfoLine visible={xResetVisible && !xResetAvailable}>Reach x={formatNumber(differentialTarget, context.settings.numberFormat)} for the next x-Reset</InfoLine>
    <div style={{color:"#00FF00", fontWeight:"bold"}}><InfoLine visible={xResetAvailable}>{sResetName}-Reset is now available! (See button above!)</InfoLine></div>
    <InfoLine visible={layerFinished && !context.alpha.currentChallenge && !basicRun.inNegativeSpace}>{sResetName}-Reset Highscore: x={formatNumber(context.alpha.xHighScores[stageRun.currentStage], context.settings.numberFormat,3)}</InfoLine>
    <InfoLine visible={activeChallenges.FORMULAGOD}>Formula God Highscore: x={formatNumber(context.alpha.formulaGodScores[0], context.settings.numberFormat,3)}</InfoLine>
    <InfoLine visible={!context.alpha.currentChallenge && layerFinished && stageRun.currentStage === 3 && basicRun.xValues[0]<ALPHATARGET}>Reach x={formatNumber(ALPHATARGET, context.settings.numberFormat)} to perform an &alpha;-Reset</InfoLine>
    <InfoLine visible={context.alpha.currentChallenge && layerFinished && stageRun.currentStage === 3 && basicRun.xValues[0]<ALPHATARGET}>Reach x={formatNumber(ALPHATARGET, context.settings.numberFormat)} to complete the challenge</InfoLine>
    <InfoLine visible={alphaResetAvailable}>Alpha Reset for {alphaRewardTier.alpha * Math.pow(2,context.alpha.baseAlphaLevel)} &alpha;.{alphaRewardTier.next && <>&nbsp;(Next: {alphaRewardTier.nextAlpha * Math.pow(2,context.alpha.baseAlphaLevel)} &alpha; at x={formatNumber(alphaRewardTier.next)})</>}</InfoLine>
  </div>)
}

// {(state.progressionLayer > 0 || state.highestXTier > 0) && state.autoUnlockIndex < shopFormulas.length && state.xValue[0] < nextUnlockCost && (nextUnlockCost <= alphaTarget || state.progressionLayer > 0) && <p>Next Formula at x={formatNumber(nextUnlockCost, state.settings.numberFormat)}</p>}
// {(state.progressionLayer > 0 || state.highestXTier > 0) && state.autoUnlockIndex < shopFormulas.length && state.xValue[0] >= nextUnlockCost && <p>New Formula available</p>}
// {state.progressionLayer === 0 && state.autoUnlockIndex < shopFormulas.length && nextUnlockCost > alphaTarget && <p>Almost done! Let's fill this bar! (at x={formatNumber(alphaTarget, state.settings.numberFormat)})</p>}
// <p></p>
// {state.progressionLayer === 0 && (state.xValue[0] >= alphaTarget ?
//     <div><button onClick={performAlphaReset} style={{backgroundColor:"#99FF99", fontWeight:"bold", border:"2px solid", height:"25px", width:"280px"}}>
//       JOIN THE ACADEMY
//     </button></div>
// : 
//   <div style={{color:"#000000", backgroundColor:"#ffffff", border:"2px solid", height:"25px",width:"280px"}}>
//     <div style={{backgroundColor:"#99FF99", border:"0px", height:"25px", width:progressBarWidth}}></div>
//   </div>
// )}
// {hashtagU && <>#U = {formatNumber(state.formulaUnlockCount, state.settings.numberFormat, 3)}&nbsp;&nbsp;(Unlocked Formulas)<br/></>}
// {hashtagB && <>#B = {formatNumber(state.xResetCount, state.settings.numberFormat, 3)}&nbsp;&nbsp;(Basic Resets)<br/></>}
// {hashtagF && <>#F = {formatNumber(state.formulaApplyCount, state.settings.numberFormat, 3)}&nbsp;&nbsp;(Formula Applications)<br/></>}
// {hashtagE && <>#E = {formatNumber(state.myFormulas.length, state.settings.numberFormat, 3)}&nbsp;&nbsp;(Equipped Formulas)<br/></>}