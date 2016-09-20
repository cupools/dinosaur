import createjs from 'createjs'

const origin = [40, 200]

const shaft = new createjs.Shape()

shaft.graphics.beginFill('#f60').drawCircle(0, 0, 40)
shaft.x = origin[0]
shaft.y = origin[1]
shaft.origin = origin

export default shaft
