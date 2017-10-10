import allActivitiesReducer from './allActivitiesReducer.js'
import completedActivitiesReducer from './completedActivitiesReducer.js'
import userReducer from './userReducer.js'
import {combineReducers} from 'redux'

export default combineReducers({
  allActivities: allActivitiesReducer,
  completedActivities: completedActivitiesReducer,
  user: userReducer
})
