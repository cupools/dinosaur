import * as ActionTypes from 'src/constants/ActionTypes'

export const body = (state, action) => {
  switch (action.type) {
    case ActionTypes.BODY_ADD:
      return {
        ...state
      }
    case ActionTypes.BODY_RESET:
      return {
        ...state
      }
    default:
      return state
  }
}

export const direction = (state, action) => {
  switch (action.type) {
    case ActionTypes.DIRECTION_SET:
      return {
        ...state,
        direction: action.payload
      }
    default:
      return state
  }
}
