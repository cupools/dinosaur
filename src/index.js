import 'normalize-css'

import createjs from 'createjs'
import Rx from 'rxjs'
import R from 'ramda'

import snake from 'src/modal/snake'
import shaft from 'src/modal/shaft'

import * as actions from 'src/redux/actions'
import store from 'src/redux/store'

const stage = new createjs.Stage('canvas')
createjs.Touch.enable(stage, false, true)

stage.addChild(snake)
stage.addChild(shaft)
stage.update()

let position = R.compose(Promise.resolve.bind(Promise), R.props(['stageX', 'stageY']))
let mousedown = Rx.Observable.fromEvent(shaft, 'pressmove')
  .flatMap(position)
  .subscribe(
    handlePress,
    console.log.bind(console)
)

let tick = Rx.Observable.fromEvent(createjs.Ticker, 'tick')
  .subscribe(
    handleTick(),
    console.log.bind(console)
)

function handleTick() {
  const INITIAL_SPEED = 2
  const move = R.curry((speed, alpha, a) => (speed * alpha) + a)(INITIAL_SPEED)

  return function updateData() {
    let state = store.getState()
    let {coordinate} = state
    let {pos, sinX, cosX} = coordinate

    store.dispatch(actions.updateCoordinate({
      pos: [move(sinX, pos[0]), move(cosX, pos[1])]
    }))

    return updateStage()
  }
}

function handlePress(pos) {
  let fixed = n => n.toFixed(1)
  let hypotenuse = R.curry(
    (a, b) => Math.pow(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2), 1 / 2)
  )
  let calculate = R.compose(fixed, R.divide(R.__, hypotenuse(shaft.origin, pos)))

  store.dispatch(actions.updateCoordinate({
    sinX: calculate(pos[0] - shaft.origin[0]),
    cosX: calculate(pos[1] - shaft.origin[1])
  }))
}

function updateStage() {
  let state = store.getState()

  snake.x = state.coordinate.pos[0]
  snake.y = state.coordinate.pos[1]
  stage.update()
}
