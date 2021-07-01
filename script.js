// INITIAL CANVAS STRUCTURE
const canvas = document.querySelector("#my-canvas");
canvas.style.backgroundColor = "lightGray";
canvas.width = 600;
canvas.height = 800;

const ctx = canvas.getContext("2d"); // Enables paintbrush.

// GLOBAL VARIABLES
let ballY = 50
let ballX = 50
let directionX = 1
let directionY = 1
let ballSpeed = 5
let ballSize = 15

let paddleX = canvas.width / 3
let paddleY = canvas.height - 50
let paddleWidth = 200
let paddleHeigth = 30

let isGameRunning = true

// GLOBAL FUNCTIONS
const ballDraw = () => {
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
}

const ballMovement = () => {
  ballY += ballSpeed * directionY
  ballX += ballSpeed * directionX
}

const ballWallCollision = () => {
  if (ballX > canvas.width - ballSize) {
    directionX = -1
  }
  // checks if the ball hits the bottom
  if (ballY > canvas.height - ballSize) {
    // end of game trigger
    isGameRunning = false
    // setTimeout(() => {
    //   location.reload()
    // },2000) // BONUS 2! :D
    gameOver()
    
    // directionY = -1
  }
  if (ballX < 0 + ballSize) {
    directionX = 1
  }
  if (ballY < 0 + ballSize) {
    directionY = 1
  }
}

const gameOver = () => {
  // BONUS 3! :D
  canvas.style.display = "none" // => hides the canvas when game over
  // it will run a function that creates a new DOM element and attaches it to the DOM
  let endScreen = document.querySelector("#gameover-screen")
  endScreen.style.display = "block"
}

const paddleBallCollision = () => {
  // y of ball > y of paddle
  // x of ball > x of paddle
  // x of ball < x of paddle + size
  if (ballY + ballSize > paddleY && ballX + ballSize > paddleX && ballX + ballSize < paddleX + paddleWidth) {
    directionY = -1
    ballSpeed *= 1.1 // BONUS 1! :D
  }

}


const paddleDraw = () => {
  ctx.fillRect(paddleX , paddleY, paddleWidth, paddleHeigth )
}

// GAME LOOP FUNCTION
const gameLoop = () => {
  // console.log("running")
  // 1. clearing the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 2. running our actions
  ballMovement()
  ballWallCollision()
  paddleBallCollision()

  // 3. drawing our elements
  ballDraw()
  paddleDraw()

  // 4. request animation
  if (isGameRunning) {
    requestAnimationFrame(gameLoop)
  }
}

// EVENT LISTENERS
window.addEventListener("keydown", (event) => {
  // console.log(event)
  if (event.code === "ArrowRight" && paddleX + paddleWidth < canvas.width) {
    paddleX += 30
  } else if (event.code === "ArrowLeft" && paddleX > 0) {
    paddleX -= 30
  }
})


// GAME START
gameLoop()