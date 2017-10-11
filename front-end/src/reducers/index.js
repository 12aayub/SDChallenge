import allActivitiesReducer from './allActivitiesReducer'
import completedActivitiesReducer from './completedActivitiesReducer'
import userReducer from './userReducer.js'
import { combineReducers } from 'redux'

export default combineReducers({
  allActivities: allActivitiesReducer,
  completedActivities: completedActivitiesReducer,
  user: userReducer
})
