//add a new activity

export function createNewActivity(apiUrl, form){
  return ((dispatch)=>{
    return fetch(`${apiUrl}/activities/new`,
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
      dispatch({
        type: 'ADD_NEW_ACTIVITY',
        payload: newActivity
      })
    })
})
}
