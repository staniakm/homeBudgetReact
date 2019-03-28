import {combineReducers} from 'redux'
import invoiceReducer from './invoiceReducer'
import monthReducer from './monthReducer'

export default combineReducers({
    invoiceReducer, monthReducer
})