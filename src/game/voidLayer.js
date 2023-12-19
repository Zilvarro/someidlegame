export const voidLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.maingame.void
    if (!data) return false

    switch (actionName) {
      case "getVoidEnergy":
        data.energy++
        break;
      default:
        return false
    }
    return true
  },
  
  validate: (game, actionName, parameters={})=>{
    
  }
}