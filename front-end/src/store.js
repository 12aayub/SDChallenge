import {createStore, applyMiddleware} from 'redux'
import combinedReducer from './reducers'
import thunk from 'redux-thunk'

export default createStore(combinedReducer, applyMiddleware(thunk))
