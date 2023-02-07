const Game = function () {
  let timeSpan = document.getElementById('timeSpan')
  this.gameTime = 30000
  this.goal = this.gameTime / 1000 + Math.ceil(this.gameTime / 1000 / 4)
  this.chronoTime = this.gameTime / 1000 //seconds 
  let counter = { value: 0 }
  let self = this
  startSound.play()
  startSound.volume = 0.3
  this.startGame = setInterval(function () {
    new Item(counter)
  }, generationSpeed)
  this.generationSpeedUp = function () {
    clearInterval(self.startGame)
    let newSpeed = 0
    if (self.gameTime > 30000) {
      newSpeed = 1.1
    } else {
      newSpeed = 1.25
    }
    this.startGame = setInterval(function () {
      new Item(counter)
    }, generationSpeed /= newSpeed)
  }
  this.counterChanger = setInterval(function () {
    scorePoints.innerText = `Smashed piñatas: ${counter.value} / ${self.goal}`
    if (counter.value > 0 && self.chronoTime % 5 === 0) {
      self.generationSpeedUp()
    }
  }, 550)
  this.startTime = setInterval(function () {
    timeSpan.innerText = `${self.chronoTime--}`
  }, 1000)
  this.killAllInterval = function () {
    let highestInterval = 1000000
    for (let i = 1; i < highestInterval; i++) {
      clearInterval(i)
    }
  }
  this.removeAllChilds = function (classname) {
    let arr = document.querySelectorAll('[class*=' + classname + ']')
    arr.forEach(el => el.parentNode.removeChild(el))
  }
  this.gameOver = setTimeout(function () {
    clearInterval(this.startGame)
    self.killAllInterval()
    generationSpeed = 1000
    newSpeed = 1
    gameOver = true
    if (this.gameOver) {
      let message = `You smashed ${counter.value} piñatas.`
      let secondMesagge;
      if (counter.value >= self.goal) {
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
      restartBtn.onclick = function () {
        self.removeAllChilds('pinata')
        self.removeAllChilds('mousetrace')
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