const canvasSketch = require('canvas-sketch');
const math = require ('canvas-sketch-util/math');
const random = require ('canvas-sketch-util/random');


const settings = {
  dimensions: [1080,1080], 
  //  dimensions: 'A3',
  //  pixelsPerInch:300,
  animate:true,
};

const sketch = ({context,width,height}) => {

  let x,y,w,h;
  
  //Número de rectángulos
  const num=20;
  //Grados de inclinación
  const degrees = -30;

  //Creamos una matriz para almanecer los datos de los rectángulos que se generen aleatoriamente
  
  const rects = [];

  for (let i=0; i < num; i++){

    x=random.range(0.width),
    y=random.range(0,heigh),
    w=random.range(200,600),
    h=random.range(40,200);

    rects.push({x,y,w,h});

  }

  let radius, angle,rx,ry;

    return({context,width,height}) => {
      context.fillStyle = 'white';
      context.fillRect(0,0,width,height);

      x = width * 0.5;
      y = height * 0.5;
      w = width * 0.6;
      h = height * 0.1;
  
        context.save();
        context.translate (x,y);
        context.strokeStyle = 'blue';

        drawSkewedRect({context});
        context.stroke();

        

      context.restore();

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