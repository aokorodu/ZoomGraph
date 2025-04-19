const ns = "http://www.w3.org/2000/svg";

let high = {
  end: 85,
  range: 30,
  color: "#90C67C",
};
let med = {
  end: 85,
  range: 20,
  color: "#67AE6E",
};
let low = {
  end: 85,
  range: 10,
  color: "#328E6E",
};

const w = 500;
const h = 500;
const xmin = -50;
const ymin = -50;

// position percentages
const midXPercentage = 50;
const startYPercentage = 5;
const midYPercentage = startYPercentage;

// start and end positions
const startY = getPos(startYPercentage);
const midX = getPos(midXPercentage);
const midY = getPos(midYPercentage);

// zoom positions
const carZoom = {
  xmin: -2,
  ymin: 370,
  width: 150,
  height: 150,
};

const homeZoom = {
  xmin: 60,
  ymin: 350,
  width: 150,
  height: 150,
};

const collegeZoom = {
  xmin: 100,
  ymin: 335,
  width: 150,
  height: 150,
};

const retireZoom = {
  xmin: 210,
  ymin: 263,
  width: 200,
  height: 200,
};

const downsizeZoom = {
  xmin: 300,
  ymin: 170,
  width: 270,
  height: 270,
};

const zoomOut = {
  xmin: -50,
  ymin: -50,
  width: 600,
  height: 600,
};

let zoomCurrent = {
  xmin: -50,
  ymin: -50,
  width: 600,
  height: 600,
};

let zoomTarget = {
  xmin: -50,
  ymin: -50,
  width: 600,
  height: 600,
};

let zoomTimeline = null;

const icons = document.getElementById("icons");
const main = document.getElementById("main");
const retireRect = document.getElementById("retire-rect");

// holders
const holder = document.getElementById("holder");
const borderHolder = document.getElementById("border-holder");
const graphHolder = document.getElementById("graph-holder");
const pointHolder = document.getElementById("point-holder");

// paths
const highPath = document.getElementById("high-path");
const medPath = document.getElementById("med-path");
const lowPath = document.getElementById("low-path");

// points
const carPoint = document.getElementById("car-point");
const homePoint = document.getElementById("home-point");
const retirePoint = document.getElementById("retire-point");
const downsizePoint = document.getElementById("downsize-point");
const collegePoint = document.getElementById("college-point");

// sliders
const amountSlider = document.getElementById("amount");

// buttons
const carButton = document.getElementById("car-button");
const homeButton = document.getElementById("home-button");
const retireButton = document.getElementById("retire-button");
const downsizeButton = document.getElementById("downsize-button");
const collegeButton = document.getElementById("college-button");

let amountValue = 0;

init();

function init() {
  amountValue = Number(amountSlider.value);
  retireRect.setAttribute("fill", getColor(amountValue));
  initUI();
  drawGraph(highPath, high);
  drawGraph(medPath, med);
  drawGraph(lowPath, low);
  positionPoint(75, carPoint);
  positionPoint(125, homePoint);
  positionPoint(350, retirePoint);
  positionPoint(425, downsizePoint);
  positionPoint(175, collegePoint);
}

function initUI() {
  amountSlider.addEventListener("input", () => {
    amountValue = Number(amountSlider.value);
    drawGraph(highPath, high);
    drawGraph(medPath, med);
    drawGraph(lowPath, low);
    positionPoint(75, carPoint);
    positionPoint(125, homePoint);
    positionPoint(350, retirePoint);
    positionPoint(425, downsizePoint);
    positionPoint(175, collegePoint);

    retireRect.setAttribute("fill", getColor(amountValue));
  });

  carButton.addEventListener("click", () => {
    const newZoom = zoomCurrent.xmin == carZoom.xmin ? zoomOut : carZoom;
    zoom(newZoom);
  });
  homeButton.addEventListener("click", () => {
    // console.log("homeZoom: ", homeZoom);
    const newZoom = zoomCurrent.xmin == homeZoom.xmin ? zoomOut : homeZoom;
    zoom(newZoom);
  });
  collegeButton.addEventListener("click", () => {
    // console.log("collegeZoom: ", collegeZoom);
    const newZoom =
      zoomCurrent.xmin == collegeZoom.xmin ? zoomOut : collegeZoom;
    zoom(newZoom);
  });

  retireButton.addEventListener("click", () => {
    // console.log("retireZoom: ", retireZoom);
    const newZoom = zoomCurrent.xmin == retireZoom.xmin ? zoomOut : retireZoom;
    zoom(newZoom);
  });

  downsizeButton.addEventListener("click", () => {
    // console.log("downsizeZoom: ", downsizeZoom);
    const newZoom =
      zoomCurrent.xmin == downsizeZoom.xmin ? zoomOut : downsizeZoom;
    zoom(newZoom);
  });
}

function getPos(percentage) {
  return (percentage / 100) * w;
}

function drawGraph(path, points) {
  const endY = getPos(points.end - (100 - Number(amountValue)));
  // console.log("endY: ", endY);
  const endTop = endY + getPos(points.range / 2);
  const endBottom = endY - getPos(points.range / 2);
  const str = `M0,${startY} Q${midX},${midY} ${w},${endTop} V${endBottom} Q${midX},${midY} 0,${startY} Z`;
  path.setAttribute("d", str);
  path.setAttribute("fill", points.color);

  // const edPoint = getBezierPoint(
  //   175 / 500,
  //   { x: 0, y: 0 },
  //   { x: 500 * 0.3, y: 0 },
  //   { x: 500, y: endY }
  // );

  // console.log("edPoint: ", edPoint);

  // collegePoint.setAttribute("cx", edPoint.x);
  // collegePoint.setAttribute("cy", edPoint.y);
}

function positionPoint(xpos, point) {
  const endY = getPos(high.end - (100 - Number(amountValue)));
  const edPoint = getBezierPoint(
    xpos / 500,
    { x: 0, y: (startYPercentage / 100) * h },
    { x: 500 * 0.3, y: (startYPercentage / 100) * h },
    { x: 500, y: endY }
  );

  // console.log("edPoint: ", edPoint);

  point.setAttribute("cx", edPoint.x);
  point.setAttribute("cy", edPoint.y);
}

// function animate() {
//   propertyTween = gsap.timeline({ onUpdate: drawGraph });
//   propertyTween.to(outer, {
//     start: target.start,
//     midtop: midtop,
//     endtop: endtop,
//     endbottom: endbottom,
//     midbottom: midbottom,
//     end: end,
//     duration: 2.5,
//     ease: "power1.inOut",
//   });
// }

function getColor(percentage) {
  // hue 0-130
  return `hsl(${((percentage - 30) / 100) * 130} 100% 50%)`;
}

function zoom(points) {
  zoomTarget = points;
  zoomTimeline = gsap.to(zoomCurrent, {
    xmin: points.xmin,
    ymin: points.ymin,
    width: points.width,
    height: points.height,
    duration: 0.667,
    ease: "power1.inOut",
    onUpdate: updateViewbox,
    onComplete: () => {
      zoomTimeline = null;
    },
  });
}

function updateViewbox() {
  const viewBox = `${zoomCurrent.xmin} ${zoomCurrent.ymin} ${zoomCurrent.width} ${zoomCurrent.height}`;
  main.setAttribute("viewBox", viewBox);
}

function getBezierPoint(t, p0, p1, p2) {
  const x = t * 500;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return { x, y };
}
