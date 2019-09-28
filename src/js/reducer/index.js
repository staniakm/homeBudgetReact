import {combineReducers} from '../../../node_modules/redux'
import invoiceReducer from './invoiceReducer'
import monthReducer from './monthReducer'
import shopReducer from './shopReducer'
import budgetReducer from './budgetReducer'

export default combineReducers({
    invoiceReducer, monthReducer, shopReducer, budgetReducer
})