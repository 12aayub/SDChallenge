const initialState = {
  currentUser: null,
  error: null
}
export default (currentState=initialState, action) =>{
  let newState
  switch(action.type){
    case("FETCHED_USER"):{
      localStorage.setItem('userEmail', action.payload.email);
      localStorage.setItem('userID', action.payload.id)
      newState = Object.assign(
        {},
        currentState,
        {currentUser: action.payload, error: null}
      )
      break
    }
    case("FETCHED_USER_ERROR"):{
      newState = Object.assign(
        {},
        currentState,
        {currentUser: null, error: action.payload}
      )
      break
    }
    default:
      newState = currentState

  }
  return newState
}
