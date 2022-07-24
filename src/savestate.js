export const newSave = {
    fishCount: 0,
    totalFish: 0,
    tapLevel: 1,
    idleLevel: 0,
    holyFish: -1,
    spells: [false],
    flags: {
        fishtext: false,
        taplevel: false,
        idlelevel: false,
        hatbutton: false,
        fishology: false
    }
}

export const getSaveGame = ()=>{
    const savedgame = window.localStorage.getItem('fishingdeluxeidle')
    if (!savedgame) {
        console.log("New Game")
        return newSave;
    }
    else {
        console.log("Game Loaded")
        return JSON.parse(savedgame);
    }
}

export const save = (state)=>{
    const currentgame = JSON.stringify(state)
    window.localStorage.setItem('fishingdeluxeidle', currentgame);
}

export const saveReducer = (state, action)=>{
    switch(action.name){
    case "tap":
        const holyfishchance = getHolyFishChance(state);
        console.log(holyfishchance)
        if (holyfishchance > 0 && Math.random() < holyfishchance){
            state.holyFish++;
            state.tapsSinceHoly=0;
            alert("YOU CAUGHT A HOLY FISH! CONGRATULATIONS!");
        } else {
            state.fishCount += state.tapLevel;
            state.totalFish += state.tapLevel;
            state.tapsSinceHoly++;
        }
        break;
    case "idle":
        state.fishCount += state.idleLevel;
        state.totalFish += state.idleLevel;
        break;
    case "taplevel":
        state.fishCount -= getTapLevelCost(state);
        state.tapLevel++;
        break;
    case "idlelevel":
        state.fishCount -= getIdleLevelCost(state);
        state.idleLevel++;
        break;
    case "hatbutton":
        state.fishCount -= 100000;
        state.tapsSinceHoly = 0;
        state.holyFish++;
        break;
    case "unlockfishology":
        state.spells[0] = true;
        break;
    case "reset":
        state = newSave;
        break;
    default:
        console.error("Action " + action.name + " not found.");
    }
    state = checkFlags(state);
    return state;
}

export const checkFlags = (state)=>{
    state.flags.fishtext ||= state.totalFish > 0;
    state.flags.taplevel ||= state.totalFish >= 10;
    state.flags.idlelevel ||= state.fishCount >= 100;
    state.flags.hatbutton ||= state.totalFish >= 5000;
    state.flags.fishology ||= state.holyFish >= 2;
    return state;
}

export const getTapLevelCost = (state)=>{
    return Math.floor(Math.max(30, Math.pow(1.5, state.tapLevel)))
}

export const getIdleLevelCost = (state)=>{
    return Math.floor(Math.max(500, Math.pow(1.1, state.idleLevel)))
}

export const getHolyFishChance = (state)=>{
    if (state.holyFish < 0)
        return 0;
        
    const exp = Math.floor(Math.pow(state.tapLevel,2)*Math.log2(state.fishCount)*Math.sqrt(state.tapsSinceHoly + 1))
    const regularchance = exp / Math.pow(2,state.holyFish) / 100000
    var maxchance = 1
    if (state.tapsSinceHoly <= 0)
        maxchance = 0
    else if (state.tapsSinceHoly <= 10 )
        maxchance = 0.01
    else if (state.tapsSinceHoly <= 20 )
        maxchance = 0.1
    return Math.min(maxchance, regularchance)
}