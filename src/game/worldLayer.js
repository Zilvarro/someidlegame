export const worldLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.maingame.world
    if (!data) return false

    switch (actionName) {
      case "getWorldEssence":
        data.essence++
        break;
      default:
        return false
    }
    return true
  }
}