const initialState = {
  userPoints: []
}
export default (currentState = initialState, action) =>{
  let newState
  switch(action.type){
    case("FETCH_USER_POINTS"):{
      newState = Object.assign(
        {},
        currentState,
        {userPoints: action.payload}
      )
      break
    }
    default:
      newState = currentState
  }
  return newState
}
