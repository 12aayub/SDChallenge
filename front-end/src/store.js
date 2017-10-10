import {createStore, applyMiddleware} from 'redux'
import combinedReducer from './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default createStore(combinedReducer, applyMiddleware(thunk, logger))
