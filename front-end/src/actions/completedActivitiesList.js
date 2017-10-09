export function fetchCompletedActivities(apiUrl){
  return ((dispatch)=>{
    return fetch(`${apiUrl}/completedActivities`).then((rawResponse)=>{
      return rawResponse.json()
    }).then((parsedResponse) => {
      let neoData = parsedResponse.activities
      let activities: []
      Object.keys(neoData).forEach((activity) =>{
          activitiesArray.push({
            name: activity.name
            description: activity.description
            latitude: activity.latitude
            longitude: activity.longitude
            points: activity.points
          })
      })

      dispatch({
        type: 'FETCH_COMPLETED_ACTIVITIES',
        payload: activitiesArray
      })
    })
  })
}
