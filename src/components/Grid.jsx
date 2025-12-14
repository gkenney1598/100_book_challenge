import { useEffect, useState } from 'react';
import { workoutProgram as training_plan } from '../utils/index.js';
import {bookTitles as bookTitles} from '../utils/index.js'
import BookCard from './BookCard.jsx';

export default function Grid() {
  const [ savedWorkouts, setSavedWorkouts ] = useState(null);
  const [ selectedWorkout, setSelectedWorkout ] = useState(null);
  const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
    const entry = savedWorkouts[val]
    return entry.isComplete
  });

  function handleSave(index, data){
    const newObj = {
      ...savedWorkouts,
      [index]: {
        ...data,
        isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
      }
    }
    setSavedWorkouts(newObj)
    localStorage.setItem('30_day_challenge', JSON.stringify(newObj))
    setSelectedWorkout(null)
  }

  function handleComplete(index, data){
    const newObj = { ...data }
    newObj.isComplete = true
    handleSave(index, newObj)
  }

  useEffect(() => {
    if (!localStorage) { return }
    let savedData = {}
    if (localStorage.getItem('30_day_challenge')){
      savedData = JSON.parse(localStorage.getItem('30_day_challenge'))
    }
    setSavedWorkouts(savedData)
  }, [])

  return (
    <div className="training-plan-grid">
      {Object.keys(bookTitles).map((title, workoutIndex) => {
        const isLocked = workoutIndex === 0 ?
        false :
        !completedWorkouts.includes(`${workoutIndex - 1}`)

        const trainingPlan = training_plan[workoutIndex]
        const dayNum = ((workoutIndex / 8) <=1) ? '0' + (workoutIndex + 1) : workoutIndex + 1 
        const icon = <i className='fa-solid fa-book'></i>

        if (workoutIndex === selectedWorkout) {
          return (
            <BookCard bookTitle={bookTitles[workoutIndex]} key={workoutIndex} trainingPlan={trainingPlan} workoutIndex={workoutIndex} dayNum={dayNum} icon={icon} handleComplete={handleComplete} handleSave={handleSave} savedWeights={savedWorkouts?.[workoutIndex]?.weights}/>
          )
        }

        return (
          <button onClick={() => {
            if (isLocked) { return }
            setSelectedWorkout(workoutIndex)
          }} className={'card plan-card ' + (isLocked ? 'inactive' : '')}key={workoutIndex}>
            {isLocked ? (
              <i className='fa-solid fa-lock'></i>
            ) : null}
            <div className='plan-card-header'>
              <p>{dayNum}: {bookTitles[workoutIndex]}</p>
            </div>
          </button>
        )
      })}
    </div> 
  )
}