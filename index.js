let clicking = false;
//Funcion constructora partida
const Game = function () {
    let timerId = setInterval(function () {
        new Fruit(hitCounter)
    }, 5000)

    //Contador de tiempo
    let gameTime = setTimeout(function () {
        partida.gameOver()
    }, 30000)

    //Contador de frutas
      let hitCounter = 0
        /*if (dettectCollision = true){
            let counter = 0;
            counter ++
        } */

    this.gameOver = function (){
        clearInterval(timerId)
    }
}

//Funcion constructora fruta
const Fruit = function (counter) {
    let self = this
    //this.counter = counter
    let fruitNest = [
        {
            name: 'apple',
            width: 40,
            heigth: 40,
            image: "url('./assets\images\Pinata1.png')",
        }, {
            name: 'pear',
            width: 40,
            heigth: 40,
            image: "url('./assets\images\Pinata2.png')",

        }, {
            name: 'peach',
            width: 40,
            heigth: 40,
            image: "url('./assets\images\Pinata3.png')",
        }
    ]
    this.element = document.createElement('div')
    this.maxRandomNumber = function (max = 880) {
        return Math.floor(Math.random() * max)
    }
    this.selectedFruit = fruitNest[this.maxRandomNumber(fruitNest.length)]
    this.element.setAttribute('class', this.selectedFruit.name)
    this.width = this.element.clientWidth
    this.element.style.backgroundImage = this.selectedFruit.image
    this.element.style.backgroundSize = 'contain'
    this.element.style.left = this.maxRandomNumber(900-this.selectedFruit.width) + 'px'
    this.positionTop = 0
    this.addTopId = setInterval(function () {
        self.positionTop = self.positionTop + 1
        self.element.style.top = self.positionTop + 'px'
    },10)
    this.element.style.top = self.positionTop + 'px'
    this.checkPositionFruit = setInterval(function (e) {
        if (parseInt(self.element.style.top.slice(0, -2)) > 600 && self.element.parentNode) {
            clearInterval(self.addTopId)
            clearInterval(self.checkPositionFruit)
            self.element.parentNode.removeChild(self.element)
        }
    },500)
    this.dettectCollision = function (e) {
        if (clicking) {
            let canvas = e.target.parentNode
            canvas.removeChild(e.target)
            console.log(counter++)
        }
    }
    this.element.addEventListener('mouseover', this.dettectCollision)
    this.canvas = document.getElementById('canvas')
    this.canvas.appendChild(this.element)
}

//Deteccion corte
canvas.onmousedown = function () {
    clicking = !clicking
}
canvas.onmouseup = function () {
    clicking = !clicking
}


let partida = new Game()





