import {createStore} from 'redux'
import reducers from './Reducer'

export const store = createStore(reducers)
