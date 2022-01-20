const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".controls__color");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_HIGHQUAILTY = 2;
const CANVAS_SIZE = 700 * CANVAS_HIGHQUAILTY;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// ctx.fillRect(0, 0, canvas.width, canvas.height);
// ctx.fillStyle = color;

function onMousemove(e) {
  const x = e.offsetX * CANVAS_HIGHQUAILTY;
  const y = e.offsetY * CANVAS_HIGHQUAILTY;

  console.log(x, y);

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startingPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function changeColor(e) {
  const color = e.target.style.backgroundColor;

  ctx.strokeStyle = color;
  handleCanvasClick(color);
}

function handleRangeChange(e) {
  const { value } = e.target;

  ctx.lineWidth = value;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(color) {
  if (filling) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.download = "[Nomad] Paint JS";
  link.href = image;
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMousemove);
  canvas.addEventListener("mousedown", startingPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", changeColor);
});

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
