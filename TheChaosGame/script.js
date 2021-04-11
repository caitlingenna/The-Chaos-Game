let cv = document.querySelector('canvas').getContext('2d');
cv.fillStyle = 'darkblue';

function Point(x, y){
  this.x = x;
  this.y = y;
}
// create starting vertices for triangle
let height = 650 * Math.cos(30);
let pointA = new Point(75, 120);
let pointB = new Point(275, 120);
let pointC = new Point(175, 120 - height);
let chosenVert = new Point(0,0);

// assign random vertex as starting point
let randVert = Math.floor(Math.random() * 4);
let currPoint = new Point(0, 0);

if(randVert === 1){
  currPoint.x = pointA.x;
  currPoint.y = pointA.y;
}
else if(randVert === 2){
  currPoint.x = pointB.x;
  currPoint.y = pointB.y;
}
else{
  currPoint.x = pointC.x;
  currPoint.y = pointC.y;
}

function drawPoint(point) {
  cv.fillRect(point.x, point.y, 1, 1);
}
// draw vertices of triangle
drawPoint(pointA);
drawPoint(pointB);
drawPoint(pointC);

let counter = 0;
let maxPoints = 50000;
var counterTxt = document.getElementById("counter");
var slider = document.getElementById("slider");
var currSpeed = 1;
var newSpeed = 1;

slider.oninput = function (){
  newSpeed = this.value;
}
counterTxt.innerHTML = counter + "/" + maxPoints;
function play(){
  if(typeof intervalID === 'undefined'){ // allows one interval to run at a time
    intervalID = setInterval(intervalFunc, 200/currSpeed);
  }
}
function stop(){ //if an interval is currently running, clear it
  if(typeof intervalID !== 'undefined'){
    clearInterval(intervalID);
    intervalID = undefined;
  }
}
function reset(){
  clearInterval(intervalID); // stop drawing
  intervalID = undefined;
  // clear canvas
  cv.clearRect(0,0, canvas.width, canvas.height);
  // redraw vertices
  drawPoint(pointA);
  drawPoint(pointB);
  drawPoint(pointC);
  // reset counter
  counter = 0;
  counterTxt.innerHTML = counter + "/" + maxPoints;
}
function intervalFunc() {
  if(counter >= maxPoints){
    clearInterval(intervalID);
  }
  else if(newSpeed !== currSpeed){
      currSpeed = newSpeed;
      clearInterval(intervalID);
      intervalID = setInterval(intervalFunc, 200/currSpeed);
  }
  else{
    draw();
    counter++;
    counterTxt.innerHTML = counter + "/" + maxPoints;
    }

}
function draw() {
    let rand = Math.floor(Math.random() * 4); // generate random int 1-3
    if(rand === 1){
      chosenVert = pointA;
    }
    else if(rand === 2){
      chosenVert = pointB;
    }
    else{
      chosenVert = pointC;
    }
    currPoint.x = Math.round((chosenVert.x + currPoint.x)/2);
    currPoint.y = Math.round((chosenVert.y + currPoint.y)/2);
    drawPoint(currPoint);
}
function autoFill() {
  while(counter < maxPoints){
    draw();
    counter++;
    counterTxt.innerHTML = counter + "/" + maxPoints;
  }
}
function showInfo(){ //pause drawing points, slide down info
  if(typeof intervalID !== 'undefined'){
    clearInterval(intervalID);
  }
  var closeInfoButton = document.getElementById("closeInfoButton");
  var info = document.getElementById("info");
  var infoTxt = document.getElementById("infoTxt");
  info.style.animation = "slideDown .3s forwards ease-out";
  infoTxt.style.animation = "slideDown .3s forwards ease-in";
  closeInfoButton.style.visibility = "inherit";
}
function closeInfo(){ //slide up info, resume drawing if an interval was running
  var closeInfoButton = document.getElementById("closeInfoButton");
  var info = document.getElementById("info");
  var infoTxt = document.getElementById("infoTxt");
  closeInfoButton.style.visibility = "hidden";
  infoTxt.style.animation = "slideUp .3s forwards ease-in";
  info.style.animation = "slideUp .4s forwards ease-in";
  if(typeof intervalID !== 'undefined'){
    intervalID = undefined;
    play();
  }
}
document.getElementById("startButton").addEventListener('click', play);
document.getElementById("stopButton").addEventListener('click', stop);
document.getElementById("resetButton").addEventListener('click', reset);
document.getElementById("infoButton").addEventListener('click', showInfo);
document.getElementById("closeInfoButton").addEventListener('click', closeInfo);
document.getElementById("autoFillButton").addEventListener('click', autoFill);
