import allActivitiesReducer from './allActivitiesReducer.js'
import completedActivitiesReducer from './completedActivitiesReducer.js'
import {combineReducers} from 'redux'

export default combineReducers({
  allActivities: allActivitiesReducer,
  completedActivities: completedActivitiesReducer,
  user: userReducer
})
