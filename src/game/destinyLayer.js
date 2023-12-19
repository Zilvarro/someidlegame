export const destinyLayer = {
  perform: (game, actionName, parameters={})=>{
    const data = game.save.destiny
    if (!data) return false

    switch (actionName) {
      case "getDestinyStar":
        data.stars++
        break;
      default:
        return false
    }
    return true
  },

  validate: (game, actionName, parameters={})=>{
    
  }
}