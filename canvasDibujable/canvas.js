/*  WINDOW Y DOCUMENT
    - Window se referirá a la ventana HTML
    - document es la página web cargada en el navegador 
    - Document también es una interfaz que describe los métodos
      comunes para cualquier clase de documento.
        - document.querySelector("nombre") devolverá el primer elemento
          (html/css?) con ese nombre.
        - window.addEventListener("evento", funcion) esperará al tipo de evento designado
          para ejecutar la función definida.
*/

/* CANVAS CONTEXT
    Empezaremos por canvas.getContext()
*/


//Evento 'cargar página'
window.addEventListener('load', () => {
    console.log('hello');
    
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    //Establecemos el tamaño del canvas
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(200,100);
    ctx.lineTo(200, 150);
    ctx.closePath();
    ctx.stroke();
    //ctx.fillRect(100, 50, 200, 200);

    //Variables
    let painting = false;

    //EventListeners
    function startPosition(e){
        painting = true;
        draw(e);
    }

    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        if (!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
});

//Evento 'cambiar el tamaño de la ventana"
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});