const initialState = {
  leaderboard: []
}
export default (currentState = initialState, action) =>{
  let newState
  switch(action.type){
    case("FETCH_LEADERBOARD"):{
      newState = Object.assign(
        {},
        currentState,
        {leaderboard: action.payload}
      )
      break
    }
    default:
      newState = currentState
  }
  return newState
}
