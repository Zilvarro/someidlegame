import formulaList from './formulas/FormulaDictionary'
import { notify } from './utilities'

export const applyFormulaToState = (state, formula, forceApply, silent)=>{
    let applyNeed = formula.applyNeed
    let applyCost = formula.applyCost
    if (state.activeChallenges.SMALLINV && !state.anyFormulaUsed) {
        applyCost = 0
        applyNeed = 0
    } else if (state.alphaUpgrades.FREF) {
        applyCost = 0
        applyNeed = formula.applyNeed + formula.applyCost
    }

    //Can't afford or not yet unlocked
    if (state.xValue[0] < applyCost || state.xValue[0] < applyNeed || !state.formulaUnlocked[formula.formulaName])
        return false

    //Apply Limit reached
    if ((state.activeChallenges.LIMITED && state.formulaApplyCount >= 100) || (state.activeChallenges.SINGLEUSE && state.formulaUsed[formula.formulaName]))
        return false

    const actuallyApply = () => {
        if (!state.alphaUpgrades.FREF && state.xValue[formula.targetLevel] !== newValue) { //Cost only deducted if value changes
            state.xValue[0] -= applyCost
        }
        state.xValue[formula.targetLevel] = formula.applyFormula(state.formulaEfficiency[formula.targetLevel], state.xValue, state)
        if (state.activeChallenges.RESETOTHER) {
            state.xValue = state.xValue.map((v,i)=>(i === formula.targetLevel ? v : 0))
        }
        state.formulaUsed[formula.formulaName] = true
        state.anyFormulaUsed = true
        state.formulaApplyCount++
    }

    //Would lower the value
    const newValue = formula.applyFormula(state.formulaEfficiency[formula.targetLevel], state.xValue, state)
    if (isNaN(newValue) || 0.9999 * state.xValue[formula.targetLevel] > newValue) {
        if (silent)
            return false;

        switch (state.settings.valueReduction) {
            case "CONFIRM":
                if (!forceApply) {
                    return false
                }
                break;
            case "WARNING":
                if (!forceApply) {
                    notify.warning("Value would be reduced", "Shift+Click if this is intentional")
                    return false
                }
                break;
            case "PREVENT":
                if (!forceApply)
                    return false
                break;
            case "NEVER":
                return false
            case "APPLY":
                break;
            default:
                return false
        }
    }
    actuallyApply()
    return true
}

export const applyIdleProgress = (state, deltaMilliSeconds) => {
    const intervalCount = 12
    const intervalSize = deltaMilliSeconds / intervalCount *0.98
    for (let i = 0; i < intervalCount; i++) {
        state = simulateOfflineProgress(state, intervalSize)
    }
    return state
}

export const autoApply = (state) => {
    for (let i = 0; i<5; i++) {
        if (state.autoApply[i] && state.myFormulas.length > i) {
            applyFormulaToState(state,formulaList[state.myFormulas[i]],false, true)
        }
    }
    return state
}

export const autoApplySingle = (state, index) => {
    if (state.autoApply[index] && state.myFormulas.length > index) {
        applyFormulaToState(state,formulaList[state.myFormulas[index]],false, true)
    }
    return state
}

export const applyProduction = (state, deltaMilliSeconds, applierBonus = [0,0,0,0,0]) => {
    const integrationFactor = [1,1,1/2,1/6,1/24] //one over factorial
    const productionBonus = state.productionBonus
    const challengeMultiplier = state.activeChallenges.SLOWPROD ? 0.01 : 1
    for(let j=0; j<state.xValue.length; j++) { //tier to be calculated
        let multiplier = 1
        for(let k=j+1; k<state.xValue.length; k++) { //higher tiers that affect it
            state.xValue[j]+= Math.pow(deltaMilliSeconds / 1000, k-j)  * multiplier * (state.idleMultiplier * productionBonus[k-1] * state.xValue[k] + state.autoApplyRate * applierBonus[k]) * integrationFactor[k-j]
            multiplier *= challengeMultiplier * state.idleMultiplier * productionBonus[k-1]
        }
    }
    return state
}

export const simulateOfflineProgress = (state, deltaMilliSeconds) => {
    // STEP 1: Auto Apply Once
    if (state.alphaUpgrades.AAPP)
        state = autoApply(state)

    // STEP 2: Linearly Approximate Auto Appliers
    let applierBonus = [0,0,0,0,0]
    let activeAppliers = 0
    if (state.alphaUpgrades.OAPP) {
        for (let index = 0; index < state.myFormulas.length; index++) {
            let isActive = 0
            state = autoApplySingle(state,index)
            const xBefore = [...state.xValue]
            state = autoApplySingle(state,index)
            for (let i = 0; i<4; i++) {
                applierBonus[i+1] += state.xValue[i] - xBefore[i]
                isActive ||= state.xValue[i] - xBefore[i]
            }
            if (isActive)
                activeAppliers++
        }
    }
    state.formulaApplyCount += Math.floor(activeAppliers * state.autoApplyRate * (deltaMilliSeconds - 300) / 1000)

    // STEP 3: Calculate Production
    state = applyProduction(state, deltaMilliSeconds - 300, applierBonus)
 
    //TODO Cap Value for complex formula or sth like that

    return state
}