export function completingAction(apiUrl, activityID){
  return ((dispatch)=>{
    return fetch(`${apiUrl}/completedActivity/new`,
      {
        //pass in userID and activityID rather than form, below:
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
