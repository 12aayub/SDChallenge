const initialState = {
  unfinishedActivities: []
}
export default (currentState = initialState, action) =>{
  let newState
  switch(action.type){
    case("FETCH_UNFINISHED_ACTIVITIES"):{
      newState = Object.assign(
        {},
        currentState,
        {unfinishedActivities: action.payload}
      )
      break
    }
    default:
      newState = currentState
  }
  return newState
}
