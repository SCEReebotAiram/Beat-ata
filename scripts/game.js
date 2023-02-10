class Game {
  constructor() {
    this.scorePoints = document.getElementById('score')
    this.timeSpan = document.getElementById('timeSpan')
    this.gameTime = 30000
    this.goal = this.gameTime / 1000 + Math.ceil(this.gameTime / 1000 / 4)
    this.chronoTime = this.gameTime / 1000 //seconds 
    this.counter = 0
    startSound.play()
    startSound.volume = 0.3
    this.generationSpeed = 1000
    this.startGame = setInterval(() => {
      new Item()
      console.log('here',this.generationSpeed)
    }, this.generationSpeed)
    this.newSpeed = 1
    this.generationSpeedUp = () => {
      clearInterval(this.startGame)
      if (this.gameTime > 30000) {
        this.newSpeed = 1.1
      } else {
        this.newSpeed = 1.25
      } 
      this.startGame = setInterval(() => {
        new Item()
      }, this.generationSpeed /= this.newSpeed)
    }
    this.counterChanger = setInterval(() => {
      this.scorePoints.innerText = `Smashed piñatas: ${this.counter} / ${this.goal}`
      console.log(this.generationSpeed)
      if (this.counter > 0 && this.chronoTime % 5 === 0) {
        this.generationSpeedUp()
      }
    }, 550)
    this.startTime = setInterval( () => {
      this.timeSpan.innerText = `${this.chronoTime--}`
    }, 1000)
    this.killAllInterval = () => {
      let highestInterval = 1000000
      for (let i = 1; i < highestInterval; i++) {
        clearInterval(i)
      }
    }
    this.removeAllChilds = (classname) => {
      let arr = document.querySelectorAll('[class*=' + classname + ']')
      arr.forEach(el => el.parentNode.removeChild(el))
    }
    this.gameOver = setTimeout(() => {
      clearInterval(this.startGame)
      this.killAllInterval()
      this.generationSpeed = 1000
      this.newSpeed = 1
      gameOver = true
      if (this.gameOver) {
        let message = `You smashed ${this.counter} piñatas.`
        let secondMesagge
        if (this.counter >= this.goal) {
          secondMesagge = 'Well done!'
          startSound.pause()
          wellDoneSound.play()
          wellDoneSound.volume = 0.5
        } else {
          secondMesagge = 'Try harder!'
          startSound.pause()
          gameOverSound.play()
          gameOverSound.volume = 0.4
        }
        FINISHSCREEN.innerHTML = `<div> ${message} ${secondMesagge}!</div>
            <span id='playAgainBtn'>Play again?</span>
            `
        let restartBtn = document.getElementById('playAgainBtn')
        restartBtn.onclick = () => {
          this.removeAllChilds('pinata')
          this.removeAllChilds('mousetrace')
          clicking = false
          FINISHSCREEN.style.display = 'none'
          CANVAS.style.display = 'block'
          let partida = new Game()
        }
        finishScreen.style.display = 'flex'
        canvas.style.display = 'none'

      }
    }, this.gameTime + 1500)
  }
}