import { combineReducers, createStore } from 'redux'

import * as reducers from './reducers'

const app = combineReducers({
  body: reducers.body
})

const store = createStore(app, {
  body: 1,
  direction: {
    sinX: 0,
    cosX: 1
  }
})

export default store
