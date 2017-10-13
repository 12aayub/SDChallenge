//display all activities

export function fetchAllActivities(apiUrl){
  return ((dispatch)=>{
    return fetch(`${apiUrl}/activities/`).then((rawResponse)=>{
      return rawResponse.json()
    }).then((parsedResponse) => {
      dispatch({
        type: 'FETCH_ALL_ACTIVITIES',
        payload: parsedResponse.activities
      })
    })
  })
}
