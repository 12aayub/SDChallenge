//display completed activities

export function fetchCompletedActivities(apiUrl, userID){
  return ((dispatch)=>{
    return fetch(`${apiUrl}/completedactivities/${userID}`).then((rawResponse)=>{
      return rawResponse.json()
    }).then((parsedResponse) => {
      dispatch({
        type: 'FETCH_COMPLETED_ACTIVITIES',
        payload: parsedResponse.completedactivities
      })
    })
  })
}
