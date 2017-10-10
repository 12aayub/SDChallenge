import userReducer from './userReducer.js'
import {combineReducers} from 'redux'

export default combineReducers({
  user: userReducer
})
