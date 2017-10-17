import allActivitiesReducer from './allActivitiesReducer'
import completedActivitiesReducer from './completedActivitiesReducer'
import unfinishedActivitiesReducer from './unfinishedActivitiesReducer'
import userReducer from './userReducer'
import userPoints from './userPoints'
import leaderboard from './leaderboardReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  allActivities: allActivitiesReducer,
  completedActivities: completedActivitiesReducer,
  user: userReducer,
  unfinishedActivities: unfinishedActivitiesReducer,
  userPoints: userPoints,
  leaderboard: leaderboard
})
