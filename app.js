import {canvas, IMAGES as images} from './initialize.js'
import {ctx, drawObj, run, start, dT, mainInterval} from './initialize.js'

let balones = []
let Balon = {
    //PROPIEDADES
    x:200,
    y:200,
    r:15,
    vX: 50,
    vY: 50,
    color: "white",
    //METODOS
    dibujarse:function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 2*Math.PI, 0);
        ctx.fillStyle =  this.color,
        ctx.stroke();
        ctx.fill();
    },
    moverse:function(){
        this.x = this.x + this.vX
        this.y = this.y + this.vY;
    }

}
//Acá está puntaje
let puntaje = 100;
function mostrarPuntaje(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "black"
    ctx.fillText(`Puntaje: ${puntaje}`, 10, 50);
}
//Inutil
// function algunaSeSalio(){
//     for (let balon of balones){
//         // se salió?
//         if(balon.x >= 600 + balon.r || balon.x <= -balon.r || 
//             balon.y >= 600 + balon.r || balon.y <= -balon.r )
//         {
//             return true;    
//         }
//     }
//     return false;
// }
//Contabilizador de tiempo
let initialTime = window.performance.now()
function mostrarTiempo() {
    //console.log(window.performance.now())
    ctx.font = "20px Arial";
    ctx.fillStyle = "black"
    let tiempoRestante = 300000 - (window.performance.now()-initialTime)
    ctx.fillText(`Tiempo: ${Math.round(tiempoRestante/1000)}`, 10, 100);
}
function sePresiono(m){
    for(Balon of balones){
        let distancia = balon.x-m.offsetX;
        let distanciaY = balon.y-m.offsetY;
    if(distancia == 0 || distanciaY == 0)return true; 
    }
}

function quitarBalones(e){
    let indiceClickeado;
    puntaje = puntaje + 20;
    for(let i=0 ; i<balones.length ; i++){
        let d = Math.sqrt(Math.pow(balones[i].x - e.offsetX , 2)+ Math.pow(balones[i].y - e.offsetY , 2));
        if(d < balones[i].r && balones[i].color == "red"){
            indiceClickeado=i;
            break;
            
        }
    }
    if(!(indiceClickeado===undefined))
    balones.splice(indiceClickeado,1)
}
canvas.onclick = quitarBalones;

//DIBUJAR EN TODO EL CANVAS
drawObj.draw =  function(){
    ctx.clearRect(0,0,1000,1000);
    if (puntaje >= 10000){
        clearInterval(mainInterval);
        ctx.font = "50px Arial";
        ctx.fillStyle = "green"
        ctx.fillText(`GANASTE`, 170, 280);   
    }
    if (puntaje < 90 && mostrarTiempo()){
        // detener el juego
        clearInterval(mainInterval);
        if(mostrarTiempo()=0);
        // muestrar el mensaje de que perdio
        ctx.font = "50px Arial";
        ctx.fillStyle = "red"
        ctx.fillText(`PERDISTE`, 80, 180);
    }
    mostrarPuntaje()
    for (let balon of balones){
        // console.log(particula)
        balon.dibujarse(onauxclick);
        balon.moverse();
    }
    mostrarTiempo()
    if(canvas.onauxclick) nuevoBalon.onauxclick = ctx.clearRect()

}
run()

function crearParticula(){
    let nuevoBalon = Object.create(Balon)
    puntaje = puntaje + 10;
    //asignar x, y, vX y vY
    nuevoBalon.x = 300
    nuevoBalon.y = 280
    let ang = 2 * Math.PI* Math.random();
    // Genero el angulo de manera aleatoria
    // Math.random genera un numero aleatorio entre 0 y 1
    nuevoBalon.vX = 4 * Math.cos(ang)
    nuevoBalon.vY = 4 * Math.sin(ang)
    let x = Math.random();
    if(x<0.5) nuevoBalon.color = "red"
    // añado el nuevo balón al array de balones
    balones.push(nuevoBalon);
    //console.log(balones)
}
    //2
//function algunaSeSalio(){
//    for (let balon of GAME.objects.balones){
//        // se salió?
//        if(balon.x >= 400 + balon.r || balon.x <= -balon.r ||
//             balon.y >= 400 + balon.r || balon.y <= -balon.r )
//         {
//             return true;
//         }
//     }
//     return false;
// }

//Al hacer click en la pelota roja se va a eliminar y va a agregar 10 puntos a todo
//if(canvas.onclick) = clear

function teclaPresionada(e){
    console.log(e.code)
    if (e.code == 'Space')
    {
        crearParticula();
    }
}
document.onkeydown = teclaPresionada;