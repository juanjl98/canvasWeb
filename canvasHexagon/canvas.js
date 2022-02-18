const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.height = innerHeight
canvas.width = innerWidth
const xCenter = canvas.width/2
const yCenter = canvas.height/2
const anguloHex = Math.PI/3

const tablero = {
    color1: "lightblue",
    color2: "blue"
}
const fichas = {
    radio: canvas.height/11,
    offset: Math.PI/6
}

const distanciaX = 2*fichas.radio*Math.sin(anguloHex) 
const distanciaY = Math.sqrt(Math.pow(distanciaX, 2) - Math.pow(distanciaX/2, 2))

drawTablero()

class Tablero {
    constructor(terrenos, numeros) {
        this.terrenos = terrenos
        this.numeros = numeros
    }
}

class Ficha {
    constructor(x, y,recurso, tieneLadron) {
        this.x = x  //0, 1, 2, 3, 4
        this.y = y  //0 ,1 ,2 ,3, 4
        this.recurso = recurso
        this.tieneLadron = tieneLadron
        switch(recurso) {
            case "piedra":
                this.color = "lavender"
                break;
            case "arcilla":
                this.color = "lightcoral"
                break;
            case "trigo":
                this.color = "lightyellow"
                break;
            case "oveja":
                this.color = "lightgreen"
                break;
            case "desierto":
                this.color = "navajowhite"
                break;
            case "bosque":
                this.color = "green"
                break;
        }
    }
    
    draw() {
        //      x   x   x
        //    x   x   x   x
        //  x   x   x   x   x
        //    x   x   x   x
        //      x   x   x
        if(this.y % 2 == 0){
            drawHexagon(xCenter + (this.x -2) * distanciaX, yCenter + (this.y - 2) * distanciaY, fichas.radio, fichas.offset, this.color, 1, true)
            drawHexagon(xCenter + (this.x -2) * distanciaX, yCenter + (this.y - 2) * distanciaY + this.y, fichas.radio, fichas.offset, tablero.color1, 10, false)
        } else {
            drawHexagon(xCenter + (this.x + (1/2) - 2) * distanciaX, yCenter + (this.y - 2) * distanciaY, fichas.radio, fichas.offset, this.color, 1, true)
            drawHexagon(xCenter + (this.x + (1/2) - 2) * distanciaX, yCenter + (this.y - 2) * distanciaY + this.y, fichas.radio, fichas.offset, tablero.color1, 10, false)
        }      

    }

}

function drawHexagon(x, y, radio, offset, color, grosorLinea, relleno) {

    c.strokeStyle = color
    c.lineWidth = grosorLinea
    c.beginPath()
    for (let i = 0; i < 6; i++){
        c.lineTo(x + radio * Math.cos(anguloHex * i - offset), y + radio * Math.sin(anguloHex * i - offset))
    }
    c.closePath();
    c.stroke();
    if (relleno) {
        c.fillStyle = color
        c.fill()
    }
}

function drawTablero() {
    drawHexagon(xCenter + 15, yCenter + 15, canvas.height/2, 0, "lightgrey", 5, true);
    drawHexagon(xCenter, yCenter, canvas.height/2, 0, tablero.color2, 5, true);
    drawHexagon(xCenter, yCenter, canvas.height/2 - 10, 0, tablero.color1, 5, true)
}


const posiciones = [
               {x:1, y:0},{x:2, y:0},{x:3, y:0},
        {x:0, y:1}, {x:1, y:1}, {x:2, y:1}, {x:3, y:1},
    {x:0, y:2},{x:1, y:2},{x:2, y:2},{x:3, y:2},{x:4, y:2},
         {x:0, y:3},{x:1, y:3},{x:2, y:3},{x:3, y:3},
             {x:1, y:4},{x:2, y:4},{x:3, y:4}
            ]

const conjuntoFichas = []
const conjuntoValores = ["bosque", "desierto", "piedra", "arcilla", "trigo", "oveja"]
posiciones.forEach((pos, index) => {
    let rnd = Math.trunc(Math.random()*6)
    conjuntoFichas.push(new Ficha(pos.x, pos.y, conjuntoValores[rnd], false))    
    conjuntoFichas[index].draw()
})