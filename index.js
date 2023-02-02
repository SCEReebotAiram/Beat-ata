let clicking = false;

const canvas = document.getElementById('canvas')
const fruit = document.getElementById('apple')
fruit.setAttribute('class', 'apple')
fruit.addEventListener('mouseover', dettectCollition)
const fruit2 = document.getElementById('pear')
fruit2.setAttribute('class', 'pear')
fruit2.addEventListener('mouseover', dettectCollition)

function dettectCollition(e) {
    if (clicking) {
        let canvas = e.target.parentNode
        // let elementToDelete = e.target
        canvas.removeChild(e.target)
    }
}


const Fruit = function (positionX, positionY, width, heigth) {
    this.positionX = positionX
    this.positionY = positionY
    this.width = width
    this.heigth = heigth
    this.generateFruit = function() {
        let newElement = document.createElement('div')
        newElement.setAttribute('class', 'peach')
        newElement.addEventListener('mouseover', dettectCollition)
        canvas.appendChild(newElement)
        newElement.style.left = maxRandomNumber()+'px';
    }
}

function maxRandomNumber(max=880){
    return Math.floor(Math.random()*max)
}


canvas.onmousedown = function () {
    clicking = !clicking
}
canvas.onmouseup = function () {
    clicking = !clicking
}

let apple = new Fruit(250, 100, 20, 20);
let pear = new Fruit(300, 400, 20, 20)
apple.generateFruit()





// canvas.onclick = function () {
//     console.log('clickeado canvas')
// }

// setTimeout(function() {
//     console.log(clicking)
// },5000)


