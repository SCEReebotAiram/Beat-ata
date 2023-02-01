const canvas = document.getElementById('canvas')
const player = document.getElementById('player')
player.setAttribute('class', 'manzana')
player.addEventListener('mouseover', function(){
    console.log('mouseovering', clicking)
})


let clicking = false;

const Fruit = function (positionX, positionY,width, heigth ){
    this.positionX = positionX,
    this.positionY = positionY,
    this.width = width,
    this.heigth = heigth
} 

let manzana = new Fruit(250, 100, 20, 20);
console.log(manzana)

canvas.onclick = function(){
    console.log('clickeado canvas')
}

canvas.onmousedown = function(){
    clicking = !clicking
}

canvas.onmouseup =  function () {
    clicking = !clicking
}



