const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const brushcolor = document.getElementById("color-picker");
const brushwidth = document.getElementById("range");
const eraser = document.querySelector(".eraser");
const brush = document.querySelector(".brush");
const clear = document.querySelector(".clear");
const save = document.querySelector(".save");
const rangevalue = document.querySelector(".rangevalue");
const straightline = document.querySelector(".straightline");
const rectangle = document.querySelector(".rectangle");
const circle = document.querySelector(".circle");
let isDrawing = false,
  currentcolor = "",
  currentsize = 5,
  drawLine = false,
  drawRect = false,
  drawCircle = false,
  startX,
  startY,
  radius,
  canvasX,
  canvasY;
window.addEventListener("load", (e) => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function startdraw(e) {
  if (e.target.nodeName != "CANVAS") return;
  ctx.beginPath();
  ctx.lineWidth = currentsize;
  if (straightline.classList.contains("active")) {
    drawLine = true;
    ctx.moveTo(e.offsetX, e.offsetY);
  } else if (rectangle.classList.contains("active")) {
    drawRect = true;
    ctx.moveTo(e.offsetX, e.offsetY);
    startX = e.offsetX;
    startY = e.offsetY;
  } else if (circle.classList.contains("active")) {
    drawCircle = true;
    startX = e.offsetX;
    startY = e.offsetY;
  } else {
    isDrawing = true;
  }
}
function drawing(e) {
  if (
    !isDrawing ||
    e.target.nodeName != "CANVAS" ||
    drawLine ||
    drawRect ||
    drawCircle
  )
    return (isDrawing = false);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = `${currentcolor}`;
  ctx.stroke();
}
function enddraw(e) {
  isDrawing = false;
  if (drawLine) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = `${currentcolor}`;
    ctx.stroke();
    drawLine = false;
  } else if (drawRect) {
    ctx.strokeStyle = `${currentcolor}`;
    ctx.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
    drawRect = false;
  } else if (drawCircle) {
    radius = Math.sqrt(
      Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2)
    );
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    drawCircle = false;
  }
}

function touchStartDraw(e) {
  canvasX = canvas.getBoundingClientRect().x;
  canvasY = canvas.getBoundingClientRect().y;
  if (e.target.nodeName != "CANVAS") return;
  ctx.beginPath();
  ctx.moveTo(e.touches[0].clientX - canvasX, e.touches[0].clientY - canvasY);
  ctx.lineWidth = currentsize;
  if (straightline.classList.contains("active")) {
    drawLine = true;
  } else if (rectangle.classList.contains("active")) {
    drawRect = true;
    startX = e.touches[0].clientX - canvasX;
    startY = e.touches[0].clientY - canvasY;
  } else if (circle.classList.contains("active")) {
    drawCircle = true;
    startX = e.touches[0].clientX - canvasX;
    startY = e.touches[0].clientY - canvasY;
  } else {
    isDrawing = true;
  }
}

function touchDrawing(e) {
  if (
    !isDrawing ||
    e.target.nodeName != "CANVAS" ||
    drawLine ||
    drawRect ||
    drawCircle
  )
    return (isDrawing = false);
  ctx.lineTo(e.touches[0].clientX - canvasX, e.touches[0].clientY - canvasY);
  ctx.strokeStyle = `${currentcolor}`;
  ctx.stroke();
}

function touchEndDraw(e) {
  isDrawing = false;
  if (drawLine) {
    ctx.lineTo(e.touches[0].clientX - canvasX, e.touches[0].clientY - canvasY);
    ctx.strokeStyle = `${currentcolor}`;
    ctx.stroke();
    drawLine = false;
  } else if (drawRect) {
    ctx.strokeStyle = `${currentcolor}`;
    ctx.strokeRect(
      startX,
      startY,
      e.touches[0].clientX - canvasX - startX,
      e.touches[0].clientY - canvasY - startY
    );
    drawRect = false;
  } else if (drawCircle) {
    radius = Math.sqrt(
      Math.pow(e.touches[0].clientX - canvasX - startX, 2) +
        Math.pow(e.touches[0].clientY - canvasY - startY, 2)
    );
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    drawCircle = false;
  }
}

window.addEventListener("mousedown", startdraw);
window.addEventListener("mousemove", drawing);
window.addEventListener("mouseup", enddraw);

window.addEventListener("touchstart", touchStartDraw);
window.addEventListener("touchmove", touchDrawing);
window.addEventListener("touchend", touchEndDraw);

brushwidth.addEventListener("change", (e) => {
  currentsize = brushwidth.value;
  rangevalue.style.visibility = "visible";
  rangevalue.textContent = currentsize;
  setTimeout(() => {
    rangevalue.style.visibility = "hidden";
  }, 1500);
});
brushcolor.addEventListener("change", () => {
  currentcolor = brushcolor.value;
});
eraser.addEventListener("click", () => {
  currentcolor = "white";
  eraser.classList.add("active");
  brush.classList.remove("active");
  straightline.classList.remove("active");
  rectangle.classList.remove("active");
  circle.classList.remove("active");
});
brush.addEventListener("click", () => {
  currentcolor = brushcolor.value;
  brush.classList.add("active");
  eraser.classList.remove("active");
  straightline.classList.remove("active");
  rectangle.classList.remove("active");
  circle.classList.remove("active");
});
clear.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
save.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `${Date("YYYY - MM - DD")}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});
straightline.addEventListener("click", () => {
  currentcolor = brushcolor.value;
  straightline.classList.add("active");
  eraser.classList.remove("active");
  brush.classList.remove("active");
  circle.classList.remove("active");
  rectangle.classList.remove("active");
});
rectangle.addEventListener("click", () => {
  currentcolor = brushcolor.value;
  straightline.classList.remove("active");
  eraser.classList.remove("active");
  brush.classList.remove("active");
  circle.classList.remove("active");
  rectangle.classList.add("active");
});
circle.addEventListener("click", () => {
  currentcolor = brushcolor.value;
  straightline.classList.remove("active");
  eraser.classList.remove("active");
  brush.classList.remove("active");
  rectangle.classList.remove("active");
  circle.classList.add("active");
});