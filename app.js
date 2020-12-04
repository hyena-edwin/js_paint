const canvas = document.querySelector("#jsCanvas")
const context = canvas.getContext("2d")

const colors = document.querySelectorAll(".js-color")
const brushSize = document.querySelector("#jsRange")
const mode = document.querySelector("#jsMode")
const saveBtn = document.querySelector("#jsSave")

const DEFAULT_COLOR = "#2c2c2c"
const CANVAS_SIZE = 800
// 해당 설정이 없으면 기본이 300 * 150 임.
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

// 기본 배경이 없어서 흰색으로 칠하는 부분. 해당 부분이 없으면 투명으로 처리됨.
context.fillStyle = "white"
context.fillRect(0, 0, canvas.width, canvas.height)

context.strokeStyle = DEFAULT_COLOR
context.fillStyle = DEFAULT_COLOR
context.lineWidth = 2.5

let painting = false
let filling = false

function startPainting() {
  painting = true
}

function stopPainting() {
  painting = false
}

function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY
  
  // 마우스 누르고 있으면 동작하지 않음.
  if (!painting) {
    context.beginPath()
    // moveTo() 함수는 펜이나 연필을 종이위에서 들어 옆으로 옮기는것이라고 보시면 됩니다.
    context.moveTo(x, y) // 눌리는 순간 beginPath 로 라인을 잡아주기 때문에 moveTo 는 없어도 될 것 같음 (둘 중 하나만 있어도 잘 동작)
    // console.log('click!!')
  } else {
    // console.log('up')
    context.lineTo(x, y)
    context.stroke()
    // context.closePath() // 시작과 끝점이 정해지고 그 점을 따라 생긴 line 이 그려짐.
  }
}

function handleColorClick(event) {
  // console.log(event.target.style.backgroundColor)
  const color = event.target.style.backgroundColor
  context.strokeStyle = color
  context.fillStyle = color
}

function handleLineWidth(event) {
  // console.log(event.target.value)
  const size = event.target.value
  context.lineWidth = size
}

function handleModeClick() {
  if (filling){
    mode.innerText = "FILL"
    filling = false
  } else {
    mode.innerText = "PAINT"
    filling = true
  }
}

function handleFillCanvas() {
  if (filling) {
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function handleContextMenu(event) {
  event.preventDefault()
}

function saveImage() {
  const image = canvas.toDataURL() // toDataURL 저장 되는 이미지의 주소를 반환, default 값이 "image/png"
  const link = document.createElement("a")
  link.href = image
  link.download = "paintJs.png" // href 는 참조하는 주소, download 는 저장하는 이름 (이모지 가능)
  link.click()
}

if (canvas) {
  // mousemove 는 마우스가 움직일 때 발생하는 이벤트
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mousedown", startPainting)
  canvas.addEventListener("mouseup", stopPainting)
  canvas.addEventListener("mouseleave", stopPainting)
  canvas.addEventListener("click", handleFillCanvas)
  canvas.addEventListener("contextmenu", handleContextMenu)
}

// 비어 있어도 빈 배열을 반환하기에 에러발생을 하지 않는다.
colors.forEach(function (color) {
  color.addEventListener("click", handleColorClick)
})

if (brushSize) {
  // brushSize.addEventListener("input", handleLineWidth) // input 은 입력이 바뀔 때 마다 이벤트 발생
  brushSize.addEventListener("change", handleLineWidth) // change 는 입력되는 최종값이 바뀔 때 마다 이벤트 발생
}

if (mode) {
  mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveImage)
}
