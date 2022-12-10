let clockRadius = 100; // radius of the clock face
let frameOfset = 0;
let startSeconds = 0;
let prevSecond = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); // use degrees rather than radians
  frameRate(24);
  startSeconds = second();
}
  
function draw() {
  background(0); // draw a white background
  
  // get the current time
  let h = hour();
  let m = minute();
  let s = second();
  
  if (frameOfset == 0 && s > startSeconds) {
      frameOfset = millis() + 42;
  } 

  // calculate the angles for the hour, minute, and second hands
  let hourAngle = map(h % 12, 0, 12, 0, 360);
  let minuteAngle = map(m, 0, 60, 0, 360);
  let secondAngle = map(s, 0, 60, 0, 360);
  
  // Calculate the previous angles of the hands
  let nextHourAngle = hourAngle + 30.0;
  let nextMinuteAngle = minuteAngle + 6.0;
  let nextSecondAngle = secondAngle + 6.0;

  let milliSecondLerpPercentage = (millis() - frameOfset) % 1000 / 1000;
  if (s != prevSecond) {
    frameOfset = millis() + 42;
    milliSecondLerpPercentage = 0;
    prevSecond = s;
  }
  
  // Interpolate the angles of the hands
  hourAngle = lerp(hourAngle, nextHourAngle, m/60);
  minuteAngle = lerp(minuteAngle, nextMinuteAngle, s/60);
  secondAngle = lerp(secondAngle, nextSecondAngle, milliSecondLerpPercentage);

  //print(milliSecondLerpPercentage, "--", nextSecondAngle, "--", secondAngle, "--", s);
  // draw the clock face
  fill(0);
  noStroke();
  ellipse(width/2, height/2, clockRadius*2, clockRadius*2);

  drawNumbers();
  drawNotches();

  // draw the hour hand
  push();
  translate(width/2, height/2);
  rotate(hourAngle);
  strokeWeight(4);
  stroke(255);
  line(0, 0, 0, -clockRadius/2);
  pop();

  // draw the minute hand
  push();
  translate(width/2, height/2);
  rotate(minuteAngle);
  strokeWeight(4);
  stroke(255);
  line(0, 0, 0, -clockRadius*0.7);
  pop();

  // draw the second hand
  push();
  translate(width/2, height/2);
  rotate(secondAngle);
  strokeWeight(2);
  stroke(255, 0, 0);
  line(0, 0, 0, -clockRadius*0.8);
  pop();
}

// function to draw the numbers on the clock face using Roman numerals
function drawNumbers() {
  const gradient = rainbowGradient();
  
  let numbers = ["III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "I", "II"];
  let r = clockRadius * 0.8; // radius of the numbers on the clock face

  // loop through the numbers and draw each one at the appropriate location
  for (let i = 0; i < numbers.length; i++) {
    
    let angle = map(i, 0, numbers.length, 0, 360);
    let x = width/2 + r * cos(angle);
    let y = height/2 + r * sin(angle);

    push();
    translate(x, y);
    textSize(16);
    fill(gradient[i * 5]);
    noStroke();
    textAlign(CENTER, CENTER);
    text(numbers[i], 0, 0);
    pop();
  }
}

// Generate rainbow gradient
function rainbowGradient() {
  // Array of rainbow colors
  const rainbow = [
    color(255, 0, 0), // Red
    color(255, 127, 0), // Orange
    color(255, 255, 0), // Yellow
    color(0, 255, 0), // Green
    color(0, 0, 200), // Blue
    color(75, 0, 130), // Indigo
    color(139, 0, 255), // Violet
    color(255, 0, 0), // Red agian...
  ];

  // Generate a gradient of 60 colors
  const gradient = [];
  for (let i = 0; i < 60; i++) {
    const j = (i + 25) % 70;
    const from = rainbow[Math.floor(j / 10)];
    const to = rainbow[Math.ceil(j / 10)];
    gradient.push(lerpColor(from, to, (j % 10) / 10));
  }
  return gradient;
}

function drawNotches() {
  translate(200, 200)
  // Add 60 notches to the outside of the clock
  for (let i = 0; i < 60; i++) {
    const gradient = rainbowGradient();
    
    push();
    let angle = map(i, 0, 60, 0, 360);
    rotate(angle);
    // Make every 5 notches bold
    if (i % 5 === 0) {
      strokeWeight(4);
    } else {
      strokeWeight(2);
    }
    stroke(gradient[i]);
    line(105, 0, 115, 0);
    pop();
  }
  translate(-200, -200)
}

