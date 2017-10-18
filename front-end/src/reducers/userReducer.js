const initialState = {
  currentUser: null,
  error: null,
  loading: true,
  submitError: false
}
export default (currentState=initialState, action) =>{
  let newState
  switch(action.type){
    case("FETCHED_USER"):{
      localStorage.setItem('authToken', action.payload.authToken);
      localStorage.setItem('userID', action.payload.id)
      newState = Object.assign(
        {},
        currentState,
        {currentUser: action.payload, error: null, loading: false, submitError: false}
      )
      break
    }
    case("FETCHED_USER_ERROR"):{
      newState = Object.assign(
        {},
        currentState,
        {currentUser: null, error: action.payload, loading: false, submitError: true}
      )
      break
    }
    case("REMOVE_USER"):{
      newState = Object.assign(
        {},
        currentState,
        {currentUser: null, loading: false, submitError: false}
      )
      break
    }
    default:
      newState = currentState

  }
  return newState
}
