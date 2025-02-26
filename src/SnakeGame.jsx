import { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(100);
  const [paused, setPaused] = useState(false);
  
  // Game constants
  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;
  
  // Game initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < CANVAS_SIZE; i += CANVAS_SIZE / GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
      ctx.stroke();
    }
    
    // Draw snake
    ctx.fillStyle = '#4CAF50';
    snake.forEach(segment => {
      ctx.fillRect(
        segment.x * (CANVAS_SIZE / GRID_SIZE),
        segment.y * (CANVAS_SIZE / GRID_SIZE),
        CANVAS_SIZE / GRID_SIZE,
        CANVAS_SIZE / GRID_SIZE
      );
    });
    
    // Draw food
    ctx.fillStyle = '#F44336';
    ctx.fillRect(
      food.x * (CANVAS_SIZE / GRID_SIZE),
      food.y * (CANVAS_SIZE / GRID_SIZE),
      CANVAS_SIZE / GRID_SIZE,
      CANVAS_SIZE / GRID_SIZE
    );
  }, [snake, food]);
  
  // Game loop
  useEffect(() => {
    if (gameOver || paused) return;
    
    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };
      
      // Update head position based on direction
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }
      
      // Check for collisions with walls
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return;
      }
      
      // Check for collisions with self
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }
      
      // Add new head to snake
      newSnake.unshift(head);
      
      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        // Generate new food
        const newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE)
        };
        setFood(newFood);
        setScore(prevScore => prevScore + 10);
        
        // Increase speed
        if (speed > 50) {
          setSpeed(prevSpeed => prevSpeed - 5);
        }
      } else {
        // Remove tail if food is not eaten
        newSnake.pop();
      }
      
      setSnake(newSnake);
    };
    
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [snake, direction, food, gameOver, paused, speed]);
  
  // Key controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'p' || e.key === 'P') {
        setPaused(prev => !prev);
        return;
      }
      
      if (gameOver || paused) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver, paused]);
  
  // Restart game
  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('RIGHT');
    setSpeed(100);
    setScore(0);
    setGameOver(false);
    setPaused(false);
  };
  
  return (
    <div className="snake-game-container">
      <h1>Snake Game</h1>
      <div className="game-info">
        <div className="score">Score: {score}</div>
        {paused && <div className="paused">Game Paused</div>}
      </div>
      <canvas 
        ref={canvasRef} 
        width={CANVAS_SIZE} 
        height={CANVAS_SIZE}
        className="game-canvas"
      />
      <div className="game-controls">
        {gameOver ? (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Your Score: {score}</p>
            <button onClick={restartGame}>Play Again</button>
          </div>
        ) : (
          <button onClick={() => setPaused(!paused)}>
            {paused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>
      <div className="instructions">
        <h3>How to Play:</h3>
        <p>Use arrow keys to control the snake</p>
        <p>Press 'P' to pause/resume</p>
        <p>Collect the red food to grow your snake</p>
        <p>Avoid hitting the walls or yourself</p>
        <div className="back-link">
          <a href="/">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
