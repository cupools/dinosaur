import * as ActionTypes from 'src/constants/ActionTypes'

export function addBody() {
  return {
    type: ActionTypes.BODY_ADD,
    payload: {
      count: 1
    }
  }
}
