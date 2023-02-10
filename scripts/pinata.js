class Item extends Game {
  constructor(counter) {
    super(counter)
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
    this.maxRandomNumber =  (max = 880) => {
      return Math.floor(Math.random() * max)
    }
    this.selectedPinata = pinataBox[this.maxRandomNumber(pinataBox.length)]
    this.element.setAttribute('class', this.selectedPinata.name)
    this.width = this.element.clientWidth
    this.element.style.backgroundImage = this.selectedPinata.image
    this.element.style.backgroundSize = 'contain'
    this.maxWidth = 895 - this.selectedPinata.width
    this.element.style.left = this.maxRandomNumber(this.maxWidth) + 5 + 'px'
    this.initialPosLeft = this.element.style.left.slice(0, -2)
    this.positionLeft = this.initialPosLeft
    this.positionTop = 0
    this.degrees = 0
    // this.direction = 1
    this.addRotation =  () => {
      this.degrees += 0.5
      this.element.style.transform = `rotate(${this.degrees}deg)`
    }
    this.addFall = () => {
      this.positionTop++
      this.element.style.top = this.positionTop + 'px'
    }
    // this.addLateralMovement =  () {
    //   this.positionLeft++
    //   this.element.style.left = this.positionLeft + 'px'
    // }
    this.startMovement = setInterval(() => {
      this.addFall()
      this.addRotation()
      // this.addLateralMovement()
    }, 1)
    this.checkPositionPinata = setInterval((e) => {
      if (parseInt(this.element.style.top.slice(0, -2)) > 600 - this.selectedPinata.heigth && this.element.parentNode || this.positionLeft > 850) {
        clearInterval(this.startMovement)
        clearInterval(this.checkPositionPinata)
        this.element.parentNode.removeChild(this.element)
        pinatatDissFCanvas.play()
        pinatatDissFCanvas.volume = 0.4
      }
    }, 10)
    this.dettectCollision = (e) => {
      if (clicking) {
        let parent = e.target.parentNode
        parent.removeChild(e.target)
        soundCollision.play()
        soundCollision.volume = 0.4
        this.counter++
      }
    }
    this.element.addEventListener('mouseover', this.dettectCollision)
    CANVAS.appendChild(this.element)
  }
}


