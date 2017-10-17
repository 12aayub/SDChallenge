//sign up
export function addNewUser(apiUrl, params){
  return((dispatch)=>{
    fetch(`${apiUrl}/signup`,
      {
          body: JSON.stringify(params),
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST"
      }
    )
    .then((rawResponse)=>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      if(parsedResponse.errors){
        dispatch({
          type: 'FETCHED_USER_ERROR',
          payload: parsedResponse.errors
        })
      }else{
        dispatch({
          type: 'FETCHED_USER',
          payload: parsedResponse.user
        })
        dispatch({
          type: 'FETCH_COMPLETED_ACTIVITIES',
          payload: parsedResponse.completedActivities
        })
        dispatch({
          type: 'FETCH_UNFINISHED_ACTIVITIES',
          payload: parsedResponse.unfinishedActivities
        })
      }
    })
  })
}

//log in
export function handleUserLogin(apiUrl, params){
  return((dispatch)=>{
    fetch(`${apiUrl}/login`,
      {
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST"
      }
    )
    .then((rawResponse)=>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
        if(parsedResponse.errors){
          dispatch({
            type: 'FETCHED_USER_ERROR',
            payload: parsedResponse.errors
          })
        }else{
          dispatch({
            type: 'FETCHED_USER',
            payload: parsedResponse.user
          })
          dispatch({
            type: 'FETCH_COMPLETED_ACTIVITIES',
            payload: parsedResponse.completedActivities
          })
          dispatch({
            type: 'FETCH_UNFINISHED_ACTIVITIES',
            payload: parsedResponse.unfinishedActivities
          })
        }
    })
  })
}

export function handleUserLogout() {
  return ((dispatch) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userID');
    dispatch({
      type: 'REMOVE_USER'
    })
  })
}

//check if a user is already logged in
export function checkLogin(apiUrl){
  return ((dispatch)=>{
    var authToken = localStorage.getItem('authToken');
    if(authToken){
      fetch(`${apiUrl}/user`,
        {
          body: JSON.stringify({authToken: authToken}),
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST"
        }
      )
      .then((rawResponse)=>{
        return rawResponse.json()
      })
      .then((parsedResponse) =>{
        if(parsedResponse.errors){
          dispatch({
            type: 'FETCHED_USER_ERROR',
            payload: parsedResponse.errors
          })
        }else{
          dispatch({
            type: 'FETCHED_USER',
            payload: parsedResponse.user
          })
        }
      })
    } else {
      dispatch({
        type: 'FETCHED_USER_ERROR',
        payload: "Please Log In"
      })
    }
  })
}
