export function fetchActivities(apiUrl, form){
  return ((dispatch)=>{
    return fetch(`${apiUrl}/new`,
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
      //fix below
      if(parsedResponse.errors){
        this.setState({errors: parsedResponse.errors})
      }else{
        const activities = Object.assign([], this.props.activities)
        cats.push(parsedResponse.cat)
        this.setState({
          cats: cats,
          errors: null,
          newCatSuccess: true
        })
      }
    })

      dispatch({
        type: 'FETCH_ALL_ACTIVITIES',
        payload: activitiesArray
      })
    })
  })
}
