import { useState } from 'react'
import './App.css'
import Card from './Card'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestCore] = useState(0);

  const handleScore = (newScore) => {
    setScore(newScore);
    console.log('SCORE on APP', score);
  }
  const handleNewBestScore = (newBestScore) => {
    setBestCore(newBestScore);
    console.log('BEST SCORE on APP', bestScore);
  }

  return (
    <>
      <div className='title-score-container'>
        <div className='title-div'>
          <h1 className='title'>Pokemon Memory Game</h1>
          <p>Get points by clicking on an image but don't click on any more than once!</p>
        </div>
        <div>
          <p>Score: <span id='score'>{score}</span></p>
          <p>Best score: <span id='best-score'>{bestScore}</span></p>
        </div>
      </div>
      <Card
        onGeneralScore={handleScore}
        onGeneralBestScore={handleNewBestScore}>
      </Card>
    </>
  )
}

export default App  
