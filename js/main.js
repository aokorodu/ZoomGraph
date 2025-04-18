const ns = "http://www.w3.org/2000/svg";

let high = {
  end: 100,
  range: 30,
  color: "#9ED198",
};
let med = {
  end: 95,
  range: 20,
  color: "#518162",
};
let low = {
  end: 90,
  range: 10,
  color: "#24582E",
};

const w = 500;
const h = 500;
const xmin = -50;
const ymin = -50;

// position percentages
const midXPercentage = 50;
const startYPercentage = 0;
const midYPercentage = startYPercentage;

// start and end positions
const startY = getPos(startYPercentage);
const midX = getPos(midXPercentage);
const midY = getPos(midYPercentage);

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
    amountValue = Number(amountSlider.value);
    // console.log("amountValue: ", amountValue);
    drawGraph(highPath, high);
    drawGraph(medPath, med);
    drawGraph(lowPath, low);
  });

  scaleSlider.addEventListener("input", () => {
    const scaleValue = Number(scaleSlider.value) / 100;
  });
}

function getPos(percentage) {
  return (percentage / 100) * w;
}

function drawGraph(path, points) {
  // console.log("points: ", points);
  // console.log("endtop: ", points.end);
  // console.log("amountValue: ", amountValue);
  const endTop = getPos(points.end - (100 - Number(amountValue)));
  console.log("endTop: ", endTop);
  const endBottom = endTop - getPos(points.range);
  console.log("endBottom: ", endBottom);
  const str = `M0,${startY} Q${midX},${midY} ${w},${endTop} V${endBottom} Q${midX},${midY} 0,${startY} Z`;
  // console.log("str: ", str);
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
