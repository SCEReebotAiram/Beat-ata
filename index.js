let clicking = false;

const Fruit = function (width, heigth) {
    self = this
    let fruitNest = [
        {
            name: 'apple',
            width: 40,
            heigth: 40
        }, {
            name: 'pear',
            width: 20,
            heigth: 20

        }, {
            name: 'peach',
            width: 50,
            heigth: 50
        }
    ]

    

    this.element = document.createElement('div')
    this.maxRandomNumber = function (max = 880) {
        return Math.floor(Math.random() * max)
    }
    this.selectedFruit = fruitNest[this.maxRandomNumber(fruitNest.length)]
    this.element.setAttribute('class', this.selectedFruit.name)
    this.width = this.element.clientWidth
    this.element.style.left = this.maxRandomNumber(900-this.selectedFruit.width) + 'px';
    // this.element.style.width = width + 'px'
    // this.element.style.heigth = heigth + 'px'
    this.dettectCollision = function (e) {
        if (clicking) {
            let canvas = e.target.parentNode
            canvas.removeChild(e.target)
        }
    }
    this.element.addEventListener('mouseover', this.dettectCollision)
    this.canvas = document.getElementById('canvas')
    this.canvas.appendChild(this.element)
}
/*this.fruitFalling = function() {
    this.style.top = 
}*/



canvas.onmousedown = function () {
    clicking = !clicking
}
canvas.onmouseup = function () {
    clicking = !clicking
}

let fruit1 = new Fruit()
let fruit2 = new Fruit()
let fruit3 = new Fruit()

console.log(fruit1.width)




// canvas.onclick = function () {
//     console.log('clickeado canvas')
// }

// setTimeout(function() {
//     console.log(clicking)
// },5000)


