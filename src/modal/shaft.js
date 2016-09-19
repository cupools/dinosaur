import createjs from 'createjs'

let shaft = new createjs.Shape()

shaft.graphics.beginFill('#f60').drawCircle(0, 0, 40)
shaft.x = 40
shaft.y = 200

export default shaft
