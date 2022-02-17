/*  WINDOW Y DOCUMENT
    - Window se referirá a la ventana HTML
    - document es la página web cargada en el navegador 
    - Document también es una interfaz que describe los métodos
      comunes para cualquier clase de documento.
        - document.querySelector("nombre") devolverá el primer elemento
          (html/css?) con ese nombre.
        - window.addEventListener("evento", funcion) esperará al tipo de evento designado
          para ejecutar la función definida.
    
    ANIMACIONES
    - Tenemos una función que queremos repetir "funcion".
    - La introducimos en una función llamada en el mismo programa "animate"
    - Dentro de animate, la llamamos a sí misma con requestAnimationFrame(animate)
    - Llamamos a la funcion que queremos repetir
        function animate() {
            requestAnimationFrame(animate)
            funcion()
        }
*/

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

//Establecemos el tamaño del canvas y las posiciones centrales
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const xCenter = canvas.width / 2
const yCenter = canvas.height / 2



class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

const player = new Player(xCenter, yCenter, 30, 'yellow')
console.log(player)
player.draw()

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.fillStyle = this.color  
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x * 3
        this.y = this.y + this.velocity.y * 3
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = `rgb(${this.color.red},${this.color.green},${this.color.blue})`
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

let animationId     //variable que representa el frame actual de animacion. Con esta referencia podemos cancelar la animacion cuando queramos
function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = "rgba(1, 1, 1, 0.1)"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    
    projectiles.forEach((projectile, index) => {
        projectile.update()

        if (canvas.width < projectile.x || canvas.height < projectile.y || projectile.x < 0 || projectile.y < 0)
            projectiles.splice(index, 1)
    })
    enemies.forEach((enemy, index) => {
        enemy.update()

        projectiles.forEach((projectile,indexP) => {    //Comprobar si el enemigo ha sido tocado por un proyectil
            /*
            (p)                                <- proyectil
            |  \
            |   \
            |    \
            -----(e)                            <- enemigo
        */
            const distancia = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (distancia <= projectile.radius + enemy.radius){
                /*  con setTimeout hacemos que el programa utilice un frame para borrar los elementos
                    de las arrays, antes de intentar dibujarlas de nuevo. Así evitamos que los elementos
                    parpadeen al dibujarse (por estar intentando acceder a una array que está siendo usada
                    para ser borrada)
                */
                window.setTimeout(()=>{                             
                    enemies.splice(index, 1)
                    projectiles.splice(indexP, 1)
                }, 0)
            }
        })

        const distancia = Math.hypot(enemy.x - xCenter, enemy.y - yCenter)
        if (distancia <= player.radius + enemy.radius) {
            cancelAnimationFrame(animationId)           //cancelamos la animación
            console.log("Has perdido!")
            window.setTimeout(()=>{                             
                enemies.splice(index, 1)
            }, 0)
        }
    })
    console.log(`proyectiles activos: ${projectiles.length}`)
}

/*
    Función siempre activa. Cada 1000 ms, genera un enemigo
*/
function spawnEnemy(){
    setInterval(() => {
        const radius = Math.random() * 23 + 7
        let x
        let y
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width  + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height  + radius
        }
        
        const angle = Math.atan2(y - yCenter, x - xCenter)
        const color = {
            red : Math.trunc(Math.random() * 155 + 100),
            green : Math.trunc(Math.random() * 155 + 100),
            blue : Math.trunc(Math.random() * 155 + 100)
        }
        const vel = {
            x: Math.cos(angle + Math.PI) ,
            y: Math.sin(angle + Math.PI) 
        }
        enemies.push(new Enemy(x, y, radius, color, vel))
    }, 1000)
}
    
const projectiles = []
const enemies = []
spawnEnemy();

/*
    Cuando hacemos click, calculamos tomamos el ángulo formado por el centro
    del canvas y el ratón. Lo obtenemos usando la tangente. Ob
*/
window.addEventListener("click", (event) => {
    //Usamos arctan(tan^-1) porque es el único método que nos calcula EN RADIANES con dos catetos.
    //Lo usamos por la comodidad de dar el resultado EN RADIANES
    const angle = Math.atan2(event.clientY - yCenter, event.clientX - xCenter)
    projectiles.push(new Projectile(xCenter, yCenter, 5, "yellow", 
    {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }))
})
animate()

