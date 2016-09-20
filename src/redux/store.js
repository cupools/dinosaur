import { combineReducers, createStore, applyMiddleware } from 'redux'

import * as ActionTypes from 'src/constants/ActionTypes'
import * as actions from 'src/redux/actions'
import * as reducers from './reducers'

const historyMiddleware = store => next => action => {
  let ret = next(action)
  let state = store.getState()

  if (ActionTypes.COORDINATE_UPDATE === action.type && action.payload.pos) {
    store.dispatch(actions.updateCoordinate({
      history: state.coordinate.history.concat(action.payload.pos).splice(0, state.size)
    }))
  }

  return ret
}

const app = combineReducers(reducers)
const store = createStore(
  app,
  {
    size: 1,
    coordinate: {
      pos: [0, 0],
      sinX: 0,
      cosX: 1,
      history: []
    }
  },
  applyMiddleware(historyMiddleware)
)

export default store
