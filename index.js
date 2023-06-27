const canvasSketch = require('canvas-sketch');
const math = require ('canvas-sketch-util/math');
const random = require ('canvas-sketch-util/random');
const risoColors = require('riso-colors'); //Importamos la biblioteca de RisoColors


const settings = {
  //dimensions: [1080,1080], 
  dimensions: 'A3',
  //pixelsPerInch:300,
  animate:true,
};

const sketch = ({context,width,height}) => {

  //Variables con las distintas propiedades
  let x,y,w,h, fill,stroke;
  
  //Número de rectángulos
  const num=20;
  //Grados de inclinación
  const degrees = -30;

  //Creamos una matriz para almanecer los datos de los rectángulos que se generen aleatoriamente
  
  const rects = [];

  //Creamos una matriz para almacenar un número reducido de colores aleatorios

  const rectColors = [

    random.pick(risoColors),
    random.pick(risoColors),
    random.pick(risoColors),
  ]

  for (let i=0; i < num; i++){

    x=random.range(0,width),
    y=random.range(0,height),
    w=random.range(200,600),
    h=random.range(40,200);


   //Relleno con colores aleatorios formato RGBA = RGB+tranparencia
   //Podemos usar referencias de paletas como RISO INK COLORS para que se vean mejor

    fill = `rgba(${random.range(0,255)},${random.range(0,255)},${random.range(0,255)},${random.range(1,1)})`;
    
    fill = random.pick(rectColors).hex; // esta función importa colores de RisoColors
    stroke = random.pick(rectColors).hex;

    rects.push({x,y,w,h, fill,stroke});

  }

 // let radius, angle,rx,ry;

    return({context,width,height}) => {
      context.fillStyle = 'white';
      context.fillRect(0,0,width,height);

      rects.forEach(rect => {

        const {x,y,w,h,fill,stroke}=rect;
        context.save();
        context.translate (x,y);
        context.strokeStyle = stroke;  //Estilo del trazo
        context.fillStyle = fill;      //Estilo de relleno
        context.lineWidth = 5;        //Grosor del trazo de la linea
        
        drawSkewedRect({context});
        context.stroke();             //Dibujamos los trazos
        context.fill();               //Dibujamos los rellenos

        context.restore();


      })

    };

};  

const drawSkewedRect = ({context,w=600,h=200,degrees=-45}) => {

  const angle =  math.degToRad(degrees); 
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  context.save();
  context.translate (rx * -0.5, (ry+h) * -0.5);


 // context.strokeRect (w * -0.5, h * -0.5 ,w,h);
  
context.beginPath();
context.moveTo(0, 0 );
context.lineTo(rx, ry);
context.lineTo(rx, ry + h);
context.lineTo(0, h);
context.closePath();
context.stroke(); 

context.restore();

}

canvasSketch (sketch,settings); 