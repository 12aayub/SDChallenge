//display all activities
export function fetchAllActivities(apiUrl){
  return ((dispatch)=>{
    fetch(`${apiUrl}/activities/`).then((rawResponse)=>{
      return rawResponse.json()
    }).then((parsedResponse) => {
      dispatch({
        type: 'FETCH_ALL_ACTIVITIES',
        payload: parsedResponse.activities
      })
    })
  })
}

//display completed activities
export function fetchCompletedActivities(apiUrl){
  return ((dispatch)=>{
    var userID = localStorage.getItem('userID');
    if(userID){
      fetch(`${apiUrl}/completedactivities/${userID}`)
      .then((rawResponse)=>{
        return rawResponse.json()
      }).then((parsedResponse) => {
        dispatch({
          type: 'FETCH_COMPLETED_ACTIVITIES',
          payload: parsedResponse.completedActivities
        })
      })
    }
  })
}

//display unfinished activities
export function fetchUnfinishedActivities(apiUrl){
  return ((dispatch)=>{
    var userID = localStorage.getItem('userID');
    if(userID){
      fetch(`${apiUrl}/unfinishedactivities/${userID}`)
      .then((rawResponse)=>{
        return rawResponse.json()
      }).then((parsedResponse) => {
        dispatch({
          type: 'FETCH_UNFINISHED_ACTIVITIES',
          payload: parsedResponse.unfinishedActivities
        })
      })
    }
  })
}

//action to complete an activity
export function completeActivity(apiUrl, activityID){
  return ((dispatch)=>{
    var userID = localStorage.getItem('userID');
    fetch(`${apiUrl}/completedActivity/new`,
      {
        body: JSON.stringify({
            id: userID,
            actID: activityID
        }),
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      }
    )
    .then((rawResponse)=>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      dispatch({
        type: 'FETCH_UNFINISHED_ACTIVITIES',
        payload: parsedResponse.unfinishedActivities
      })
      dispatch({
        type: 'FETCH_COMPLETED_ACTIVITIES',
        payload: parsedResponse.completedActivities
      })
    })
  })
}

//add a new activity
export function createNewActivity(apiUrl, form){
  return ((dispatch)=>{
    fetch(`${apiUrl}/activities/new`,
      {
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      }
    )
    .then((rawResponse)=>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      dispatch({
        type: 'FETCH_UNFINISHED_ACTIVITIES',
        payload: parsedResponse.unfinishedActivities
      })
      dispatch({
        type: 'FETCH_COMPLETED_ACTIVITIES',
        payload: parsedResponse.completedActivities
      })
    })
})
}

export function deleteActivity(apiUrl, activityID){
  return ((dispatch)=>{
    var userID = localStorage.getItem('userID');
    fetch(`${apiUrl}/activities/delete`,
      {
        body: JSON.stringify({
          id: userID,
          actID: activityID
        }),
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      }
    )
    .then((rawResponse)=>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      dispatch({
        type: 'FETCH_UNFINISHED_ACTIVITIES',
        payload: parsedResponse.unfinishedActivities
      })
      dispatch({
        type: 'FETCH_COMPLETED_ACTIVITIES',
        payload: parsedResponse.completedActivities
      })
    })
})
}
