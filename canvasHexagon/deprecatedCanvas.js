const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const xCenter = canvas.width/2
const yCenter = canvas.height/2
const anguloHex = Math.PI/3
drawTablero()

class Ficha {
    constructor(x, y,recurso, tieneLadron) {
        this.x = x  //0, 1, 2, 3, 4
        this.y = y  //0 ,1 ,2 ,3, 4
        this.recurso = recurso
        this.tieneLadron = tieneLadron
        switch(recurso) {
            case "oveja":
            case "desierto":
                this.color = "navajowhite"
                break;
            case "bosque":
                this.color = "green"
                break;
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
    drawHexagon(xCenter, yCenter, canvas.height/2, 0, "blue", 5, true);
    drawHexagon(xCenter, yCenter, canvas.height/2 - 10, 0, "lightblue", 5, true)
    drawFichas()
}

function drawFichas() {
    /*
                 (c)            Nuestra h es la distancia entre los centros de dos hexágonos
                / |                 h = 2 * r *sin(60) + distanciaSobrante
               /  |                 distSobrante = 2(r - r*sin(60)) = 2r - 2rsin(60)
            h /   |                 h = 2rsin(60) + 2r - 2rsin(60) = 2r
             /    | b               b = sqrt(h^2 - a^2)
            /     |                 a = r + distSobrante/2
           /      |
        (c)--------
              a
    */
    const radio = canvas.height/12
    const offset = Math.PI/6
    const distancia = 2 * (radio - radio * Math.sin(Math.PI/3) + 100)
    const color = "sandybrown"
    const b = Math.sqrt(Math.pow(2*radio, 2) - Math.pow(radio + distancia/2, 2)) + distancia/2
    //const b = Math.hypot(2*radio, -1*(radio + distancia/2)) + distancia/2
    for (let i = 0; i < 5; i++) { //FILA CENTRAL
        drawHexagon(xCenter - 4*(radio) + 2*i*(radio), yCenter, radio, offset, color, 5, true)
    }

    for (let i = 0; i < 4; i++) { //SEGUNDAS FILAS
        drawHexagon(xCenter - 3*(radio) + 2*i*(radio), yCenter - b, radio, offset, color, 5, true)
        drawHexagon(xCenter - 3*(radio) + 2*i*(radio), yCenter + b, radio, offset, color, 5, true)
    }

    for (let i = 0; i < 3; i++) { //TERCERAS FILAS
        drawHexagon(xCenter - 2*(radio) + 2*i*(radio), yCenter + 2*b, radio, offset, color, 5, true)
        drawHexagon(xCenter - 2*(radio) + 2*i*(radio), yCenter - 2*b, radio, offset, color, 5, true)
    }

    
    
}
