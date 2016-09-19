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

let log = item => Promise.resolve(R.props(['stageX', 'stageY'], item))
let mousedown = Rx.Observable.fromEvent(shaft, 'pressmove')
    .flatMap(log)
    .subscribe(
        data => handlePress(data),
        data => console.log(data)
    )

function handlePress(pos) {
    snake.x = pos[0]
    snake.y = pos[1]
    stage.update()
}
