console.log("Shivam's Snake Game Loaded!");

// Define constants for the game area
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('gameContainer').appendChild(canvas);

canvas.width = 500;
canvas.height = 400;

// Define the initial state of the game
let snake = [{x: 50, y: 50}, {x: 40, y: 50}, {x: 30, y: 50}];  // Snake starting with 3 segments
let direction = 'RIGHT';  // Initial direction of the snake
let food = {x: 80, y: 80};  // Initial food position
let score = 0;

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the snake
    const head = {x: snake[0].x, y: snake[0].y};

    // Update position based on the current direction
    if (direction === 'RIGHT') head.x += 10;
    if (direction === 'LEFT') head.x -= 10;
    if (direction === 'UP') head.y -= 10;
    if (direction === 'DOWN') head.y += 10;

    // Add new head to the snake
    snake.unshift(head);

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score += 10;  // Increase score
        food = generateFood();  // Create new food
    } else {
        snake.pop();  // Remove last segment if no food eaten
    }

    // Check for collision with walls or self
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collisionWithSelf()) {
        alert('Game Over! Final Score: ' + score);
        resetGame();
        return;
    }

    // Draw the snake and food
    drawGame();
}

// Draw the snake and food
function drawGame() {
    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'blue';  // Head is green, body is blue
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Display the score
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Generate a random position for the food
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    const y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    return {x: x, y: y};
}

// Check for collision with the snake's own body
function collisionWithSelf() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Listen to arrow keys to change direction
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Reset the game state
function resetGame() {
    snake = [{x: 50, y: 50}, {x: 40, y: 50}, {x: 30, y: 50}];
    direction = 'RIGHT';
    food = generateFood();
    score = 0;
}

// Start the game loop
setInterval(gameLoop, 100);  // Game loop runs every 100 ms
