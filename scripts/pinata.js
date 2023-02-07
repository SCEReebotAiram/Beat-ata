const Item = function (counter) {

  let self = this
  let pinataBox = [
      {
          name: 'pinata1',
          width: 160,
          heigth: 120,
          image: "url('./assets/images/pinata1.png')",
      },
      {
          name: 'pinata2',
          width: 160,
          heigth: 120,
          image: "url('./assets/images/pinata2.png')",

      },
      {
          name: 'pinata3',
          width: 160,
          heigth: 120,
          image: "url('./assets/images/pinata3.png')",
      }
  ]
this.element = document.createElement('div')
this.maxRandomNumber = function (max = 880) {
  return Math.floor(Math.random() * max)
}
this.selectedPinata = pinataBox[this.maxRandomNumber(pinataBox.length)]
this.element.setAttribute('class', self.selectedPinata.name)
this.width = this.element.clientWidth
this.element.style.backgroundImage = this.selectedPinata.image
this.element.style.backgroundSize = 'contain'
this.maxWidth = 895 - this.selectedPinata.width
this.element.style.left = this.maxRandomNumber(this.maxWidth)+5 + 'px'
let initialPosLeft = self.element.style.left.slice(0, -2)
this.positionLeft = initialPosLeft
this.positionTop = 0
this.degrees = 0
// this.direction = 1
this.addRotation = function () {
  self.degrees+= 0.5
  self.element.style.transform = `rotate(${self.degrees}deg)`
}
this.addFall = function () {
  self.positionTop++
  self.element.style.top = self.positionTop + 'px'
}
// this.addLateralMovement = function () {
//   self.positionLeft++
//   self.element.style.left = self.positionLeft + 'px'
// }
this.startMovement = setInterval(function () {
  self.addFall()
  self.addRotation()
  // self.addLateralMovement()

}, 1)
this.checkPositionPinata = setInterval(function (e) {
  if (parseInt(self.element.style.top.slice(0, -2)) > 600-self.selectedPinata.heigth && self.element.parentNode || self.positionLeft > 850) {
    clearInterval(self.startMovement)
    clearInterval(self.checkPositionPinata)
    self.element.parentNode.removeChild(self.element)
    pinatatDissFCanvas.play()
    pinatatDissFCanvas.volume = 0.4
  }
}, 10)
this.dettectCollision = function (e) {
  if (clicking) {
    let parent = e.target.parentNode
    parent.removeChild(e.target)
    soundCollision.play()
    soundCollision.volume = 0.4
    counter.value++
  }
}
this.element.addEventListener('mouseover', this.dettectCollision)
  CANVAS.appendChild(this.element)
}

Item.prototype = Object.create(Game)
Item.prototype.constructor = Item
