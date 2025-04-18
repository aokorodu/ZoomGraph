const ns = "http://www.w3.org/2000/svg";

let high = {
  end: 500,
  range: 100,
  color: "#9ED198",
};
let med = {
  end: 475,
  range: 50,
  color: "#518162",
};
let low = {
  end: 462,
  range: 25,
  color: "#24582E",
};

const w = 500;
const h = 500;
const xmin = -50;
const ymin = -50;

const midX = w / 2;
const startY = 50;
const midY = startY;

// zoom positions
const zoomIn = {
  xmin: -25,
  ymin: 225,
  width: 300,
  height: 300,
};

const zoomOut = {
  xmin: -50,
  ymin: -50,
  width: 500,
  height: 500,
};

// svgs
const icons = document.getElementById("icons");
const main = document.getElementById("main");

// holders
const holder = document.getElementById("holder");
const borderHolder = document.getElementById("border-holder");
const graphHolder = document.getElementById("graph-holder");

// paths
const highPath = document.getElementById("high-path");
const medPath = document.getElementById("med-path");
const lowPath = document.getElementById("low-path");

// sliders
const amountSlider = document.getElementById("amount");
const scaleSlider = document.getElementById("scale");

let amountValue = 0;

init();

function init() {
  amountValue = Number(amountSlider.value);
  initUI();
  drawGraph(highPath, high);
  drawGraph(medPath, med);
  drawGraph(lowPath, low);
}

function initUI() {
  amountSlider.addEventListener("input", () => {
    amountValue = 200 - Number(amountSlider.value);
    console.log("amountValue: ", amountValue);
    drawGraph(highPath, high);
    drawGraph(medPath, med);
    drawGraph(lowPath, low);
  });

  scaleSlider.addEventListener("input", () => {
    const scaleValue = Number(scaleSlider.value) / 100;
  });
}

function drawGraph(path, points) {
  const str = `M0,${startY} Q${midX},${midY} ${w},${
    points.end - amountValue
  } V${points.end - points.range - amountValue} Q${midX},${midY} 0,${startY} Z`;
  path.setAttribute("d", str);
  path.setAttribute("fill", points.color);
}

function animate() {
  propertyTween = gsap.timeline({ onUpdate: drawGraph });
  propertyTween.to(outer, {
    start: target.start,
    midtop: midtop,
    endtop: endtop,
    endbottom: endbottom,
    midbottom: midbottom,
    end: end,
    duration: 2.5,
    ease: "power1.inOut",
  });
}
