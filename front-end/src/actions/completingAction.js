export function completingAction(apiUrl, userID, activityID){
  return ((dispatch)=>{
    return fetch(`${apiUrl}/completedActivity/new`,
      {
        body: JSON.stringify(form),
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
        let newActivity = []
        newActivity.push(parsedResponse)
      }
    })

      dispatch({
        type: 'ADD_NEW_ACTIVITY',
        payload: newActivity
      })
    })
  })
}
