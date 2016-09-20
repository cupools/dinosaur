import * as ActionTypes from 'src/constants/ActionTypes'

export const size = (state = 1, action) => {
  switch (action.type) {
    case ActionTypes.SIZE_ADD:
      return state + 1
    case ActionTypes.SIZE_RESET:
      return 1
    default:
      return state
  }
}

export const coordinate = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.COORDINATE_UPDATE:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
