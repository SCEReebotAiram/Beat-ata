const canvas = document.getElementById('canvas')

let Fruit = function (name, position) {
    let self = this
    this.name = name,
        this.position = position
    this.mousePosition = {}
    this.checkCollision = function () {
        console.log(this.mousePosition.x >= this.position.topLeft.x && this.mousePosition.x <= this.position.botRight.x
            && this.mousePosition.y >= this.position.topLeft.y && this.mousePosition.y <= this.position.botRight.y)
    }

    this.updateMousePosition = function (e) {
        canvas.addEventListener('mousemove', function (e) {
            self.mousePosition.x = e.clientX
            self.mousePosition.y = e.clientY

        })
    }
}

const manzana = new Fruit('manzana', {
    topLeft: { x: 80, y: 80 },
    topRight: { x: 100, y: 80 },
    botLeft: { x: 80, y: 100 },
    botRight: { x: 100, y: 100 },
})

manzana.updateMousePosition();
let timerId = setInterval(function () {
    manzana.checkCollision()
}, 2000)
// manzana.checkCollision();


// console.log(manzana.position.topLeft);

// canvas.addEventListener('mousemove', function (e) {
//     console.log(`x:${e.clientX}, y: ${e.clientY}`)
// })

