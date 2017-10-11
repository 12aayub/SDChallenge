const initialState = {
  allActivities: []
}
export default (currentState = initialState, action) =>{
  let newState
  switch(action.type){
    case("FETCH_ALL_ACTIVITIES"):{
      newState = Object.assign(
        {},
        currentState,
        {allActivities: action.payload}
      )
      break
    }
    default:
      newState = currentState
  }
  return newState
}
