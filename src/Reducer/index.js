import {combineReducers} from 'redux'
import invoiceReducer from './invoiceReducer'
import monthReducer from './monthReducer'
import shopReducer from './shopReducer'

export default combineReducers({
    invoiceReducer, monthReducer, shopReducer
})