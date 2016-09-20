import createjs from 'createjs'

const circle = new createjs.Shape()

circle.graphics.beginFill('#f60').drawCircle(0, 0, 40)
circle.x = circle.y = 40

export default circle
