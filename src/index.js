import 'normalize-css'

import createjs from 'createjs'
import Rx from 'rxjs'
import R from 'ramda'

import snake from './modal/snake'
import shaft from './modal/shaft'

let stage = new createjs.Stage('canvas')
createjs.Touch.enable(stage, false, true)

stage.addChild(snake)
stage.addChild(shaft)
stage.update()

let pos = R.compose(Promise.resolve.bind(Promise), R.props(['stageX', 'stageY']))
let mousedown = Rx.Observable.fromEvent(shaft, 'pressmove')
    .flatMap(pos)
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
    snake.x += 1
    snake.y += 1 * (snake.tanX || 1)
    stage.update()
}

// TODO, 暂时把原坐标挂在 shaft 身上
function handlePress(pos) {
    let calculate = R.curry((pos, origin) => (pos[0] - origin[0]) / (pos[1] - origin[1]))
    let tanX = R.compose(calculate(pos), R.prop('origin'))

    snake.tanX = tanX(shaft)

    console.log(snake.tanX)
}
