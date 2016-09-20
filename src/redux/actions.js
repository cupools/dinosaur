import * as ActionTypes from 'src/constants/ActionTypes'

export function addSize() {
  return {
    type: ActionTypes.SIZE_ADD
  }
}

export function resetSize() {
  return {
    type: ActionTypes.SIZE_RESET
  }
}

export function updateCoordinate(payload) {
  return {
    type: ActionTypes.COORDINATE_UPDATE,
    payload
  }
}
