let canvas;
let cols, rows, size;
let t = 0;
let speed = 0.05;
const scaleSlider = document.getElementById("scaleSlider");
const modSlider = document.getElementById("modSlider");
const container = document.getElementById("container");
const modValue = document.getElementById("modSliderValue");
const scaleValue = document.getElementById("scaleSliderValue");
let scaleScaler;
let modScaler;
function setup() {
  canvas = createCanvas(400, 400);
  colorMode(HSB);
  canvas.parent("container");

  size = 8;
  cols = width / size;
  rows = height / size;
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = size / 2 + i * size;
      let y = size / 2 + j * size;
      scaleScaler = scaleSlider.value;
      modScaler = modSlider.value;
      disFromCenter = dist(x, y, width / 2, height / 2);
      let dfcMod = floor(disFromCenter / scaleScaler + t) % modScaler;
      let hue = map(disFromCenter, 0, width / 2, 0, 360);
      let brightness = map(disFromCenter, 0, width / 2, 100, 50);
      fill(hue, 100, 100);
      if (dfcMod == 0) {
        noStroke();
        ellipse(x, y, size, size);
      } else if (dfcMod == 1) {
        stroke(0, 0, brightness);
        strokeWeight(0.3);
        line(x - size / 4, y, x + size / 4, y);
        line(x, y - size / 4, x, y + size / 4);
      }
    }
  }
  t += speed;
}

scaleSlider.addEventListener("change", (e) => {
  console.log(e.target.value);
  updateLabels();
});

modSlider.addEventListener("change", (e) => {
  console.log(e.target.value);
  updateLabels();
});
function updateLabels() {
  modValue.innerHTML = modScaler;
  scaleValue.innerHTML = scaleScaler;
}
function windowResized() {
  resizeCanvas(400, 400);
}
