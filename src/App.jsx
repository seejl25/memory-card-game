import './App.css'
import { useState, useEffect } from 'react'
import Card from './Card'

const dogBreed = ["african", "beagle", "chihuahua", "dalmatian", "germanshepherd", "husky", "labrador", "pomeranian", "samoyed", "shihtzu", "shiba", "maltese"]

function App() {
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [shuffledBreed, setShuffledBreed] = useState([])
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    setShuffledBreed(shuffleArray(dogBreed))
  }, [])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const handleScoreClick = (breed) => {
    setSelected(prev => [...prev, breed])
    if (selected.includes(breed)) {
      setGameOver(true)
      if (score > bestScore) {
        setBestScore(score)
      } 
    } else {
      setScore(score + 1)
      setShuffledBreed(shuffleArray([...shuffledBreed]))
    }
  }

  const handleNewGame = () => {
    setScore(0)
    setSelected([])
    setGameOver(false)
  }

  if (gameOver) {
    return (
      <div className='game-over'>
        <h1>Game Over!</h1>
        <p>Your final score is: {score}</p>
        <button type='button' onClick={handleNewGame}>New Game</button>
      </div>
    )
  }

  if (score === 12) {
    return (
      <div className='game-won'>
        <h1>Congratulations!</h1>
        <h2>You won!</h2>
        <button type='button' onClick={handleNewGame}>New Game</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome to the Memory Game</h1>
      <div className='instruction'>
      <p>Instructions: This game tests your memory! Avoid clicking on the same image! </p>
      <div className='score'>
      <p>Total score: {score}</p>
      <p>Best score: {bestScore}</p>
      </div>
      </div>
      <div className='card-container'>
      {shuffledBreed.map((breed, index) => (
        <Card 
          key={index}
          url={`https://dog.ceo/api/breed/${breed}/images/random`}
          onClick={handleScoreClick}
        />
      ))}
      </div>
    </div>
  )
}

export default App
