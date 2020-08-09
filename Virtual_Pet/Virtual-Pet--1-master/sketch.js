//Create variables here
var dog, happyDog, foodS, foodStock;
var dog_img, hap_img;
var database;
var feed;
var addFood;
var bottle;
var time;
var bed, garden, room, wash;
var gameState= "not hungry";
function preload()
{
  //load images here
  dog_img= loadImage("images/dogImg.png");
  hap_img= loadImage("images/dogImg1.png");
  bed= loadImage("images/Bed Room.png");
  garden= loadImage("images/Garden.png");
  room=loadImage("images/Living Room.png");
  wash= loadImage("images/Wash Room.png");
}

function setup() {
  database= firebase.database();
	createCanvas(600, 600);
  dog= createSprite(300,450);
  dog.addImage(dog_img);
  dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
 feed= createButton("Feed the Dog");
  feed.position(750,70);
 
feed.mousePressed(feedDog);
 
 
  addFood= createButton("Add Food");
  addFood.position(670,70);
  addFood.mousePressed(addFoods);
  bottle= new Food();
time=hour();
}


function draw() {  
  bottle.display();

if(time<10)
{
  background(garden);
  dog.hide();
  addFood.hide();
  feed.hide();
}
else if(time>10 && time<13)
{
background(room);
dog.hide();
addFood.hide();
  feed.hide();
}
else if(time>13 && time<14)
{
  background(bed);
  dog.hide();
  addFood.hide();
  feed.hide();
}
else if(time>17 && time<20)
{
  background(wash);
  dog.hide();
  addFood.hide();
  feed.hide();
}
else
{
  background(46,139,87);
}
fill("white");
textSize(20);
text("Last Fed Time is : "+ (time-2) + " :00",80,35 );
if(keyWentDown(UP_ARROW))
{
  writeStock(foodS);
  dog.addImage(hap_img)
}
  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
text("Food left : "+ foodS, 250,350);
if(foodS==0)
{
  fill("white");
  textSize(20);
  text("No food left, please add food", 200,300);
}
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=20;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function feedDog()
{
  if(foodS>0 && foodS<=20)
  {
 foodS--;
 database.ref('/').update({
   Food:foodS
 })
}
}
 
 


function addFoods()
{
  if(foodS>=0 && foodS<20)
  {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
}
