let inputDir = { x: 0, y: 0 }
let speed = 9
lastpaintTime = 0
let snakeArr = [
    { x: 13, y: 15 }
]
let score = 0
food = { x: 6, y: 7 }

//game function
function main(ctime) {
    window.requestAnimationFrame(main)
    console.log(ctime)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return
    }
    lastpaintTime = ctime
    gameEngine()
}
function isCollide(snake) {
    for (let index = 1; index < snakeArr.length;index++) {
       if (snake[index].x ===  snake[0].x && snake[index].y ===  snake[0].y ) {
           return true
       }
    }

       if (snake[0].x  >=18 || snake[0].x <=0 || snake[0].y  >=18 || snake[0].y <=0 ) {
           return true
       }
        
    return false
}

function gameEngine() {

    //part 1 : updating the snake array &food
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 }
        alert("game over..Press cntrl R 2times key to play again! ")
        snakeArr = [{ x: 20, y: 30 }]
        score = 0

    }

    //if  you have eateen the food ..icrement the score 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score +=1
        scoreBox.innerHTML = "score: " + score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2
        let b = 16
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }
    // moving snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        
        snakeArr[i + 1] = { ...snakeArr[i] }
     
    }
snakeArr[0].x += inputDir.x
snakeArr[0].y += inputDir.y


    // part : 2 render the snake 
    // display the food
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x

        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }

        board.appendChild(snakeElement)

    })



    // display the food

    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x

    foodElement.classList.add('food')

    board.appendChild(foodElement)

}

//main logic


window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0
            inputDir.y = 1
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1
            inputDir.y = 0
            break;

        default:
            break;
    }


})
