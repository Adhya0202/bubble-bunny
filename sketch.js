const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }
  
  frameRate(80);

 

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);

   mute_btn = createImg('mute.png');
   mute_btn.position(450,20);
   mute_btn.size(50,50);
   mute_btn.mouseClicked(mute);
   
   rope = new Rope(8,{x:40,y:30});
   rope2 = new Rope(7,{x:370,y:40});

   ground = new Ground(200,canH,600,20);
   blink.frameDelay = 20;
   eat.frameDelay = 20;
 
   bunny = createSprite(170,canH-80,100,100);
   bunny.scale = 0.2;
 
   bunny.addAnimation('blinking',blink);
   bunny.addAnimation('eating',eat);
   bunny.addAnimation('crying',sad);
   bunny.changeAnimation('blinking');
   
   fruit = Bodies.circle(300,300,20);
   Matter.Composite.add(rope.body,fruit);
 
   fruit_con = new Link(rope,fruit);
   fruit_con_2 = new Link(rope2,fruit);
   
   rectMode(CENTER);
   ellipseMode(RADIUS);
   textSize(50)
}

function draw() {
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
}
}