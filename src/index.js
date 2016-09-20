import 'normalize-css'

import createjs from 'createjs'
import Rx from 'rxjs'
import R from 'ramda'

import snake from './modal/snake'
import shaft from './modal/shaft'

const INITIAL_SPEED = 1

const stage = new createjs.Stage('canvas')
createjs.Touch.enable(stage, false, true)

stage.addChild(snake)
stage.addChild(shaft)
stage.update()

let position = R.compose(Promise.resolve.bind(Promise), R.props(['stageX', 'stageY']))
let mousedown = Rx.Observable.fromEvent(shaft, 'pressmove')
  .flatMap(position)
  .subscribe(
    data => handlePress(data),
    data => console.log(data)
)

let tick = Rx.Observable.fromEvent(createjs.Ticker, 'tick')
  .subscribe(
    _ => handleTick(),
    data => console.log(data)
)

// TODO, 暂时把角度挂在 snake 身上

function handleTick() {
  snake.x += INITIAL_SPEED * (snake.sinX || 1)
  snake.y += INITIAL_SPEED * (snake.cosX || 1)
  stage.update()
}

// TODO, 暂时把原坐标挂在 shaft 身上

function handlePress(pos) {
  let hypotenuse = R.curry(
    (a, b) => Math.pow(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2), 1 / 2)
  )
  let fixed = n => n.toFixed(2)
  let calculate = R.compose(fixed, R.divide(R.__, hypotenuse(shaft.origin, pos)))

  snake.sinX = calculate(pos[0] - shaft.origin[0])
  snake.cosX = calculate(pos[1] - shaft.origin[1])
}
