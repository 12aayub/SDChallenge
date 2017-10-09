const initialState = {
  allActivities: [],
  completedActivities: []
}
export default (currentState=initialState, action) =>{
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
    case("FETCH_COMPLETED_ACTIVITIES"):{
      newState = Object.assign(
        {},
        currentState,
        {completedActivities: action.payload}
      )
      break
    }
    default:
      newState = currentState
  }

  return newState
}
