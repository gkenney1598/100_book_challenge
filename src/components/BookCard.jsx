import React, { useState } from 'react'
import Modal from './Modal'

export default function WorkoutCard(props) {
  const { bookTitle, workoutIndex, dayNum, icon, savedWeights, handleSave, handleComplete } = props;

  const [showExerciseDescription, setShowExerciseDescription] = useState(null);
  const [ weights, setWeights ] = useState(savedWeights || {});

  function handleAddWeight(title, weight){
    const newObj = {
      ...weights,
      [title]: weight
    }
    setWeights(newObj)
  }

  // TODO: api call for book info
  const bookInfo = [
    {Author: "auther author"},
    {Description: "book description placeholder, will replace with blurb of book. will be a longer section"},
    {Year: "2xxx"},
    {Pages: "300"},
    {Link: "link to buy the book"}
  ]

  const bookSections = ["Author", "Description", "Year", "Pages", "Link"]
  const progressSections = ["Pages", "Stars"]
  
  return (
    <div className="workout-container">
      {showExerciseDescription && (<Modal showExerciseDescription={showExerciseDescription} handleCloseModal={() => { 
        setShowExerciseDescription(null)
      }}/>
    )}
      <div className="workout-card card">
        <div className="plan-card-header">
          <p>Day {dayNum}</p>
          {icon}
        </div>
        <div className="plan-card-header">
          {/* replace with title */}
          <h2><b>{bookTitle}</b></h2> 
        </div>
      </div>

      <div>
        <div className="exercise-name">
          <h4>Info</h4>
        </div>
        <table>
          <tbody>
              {bookInfo.map((info, index) => {
                return (
                  <tr>
                    <td><b>{bookSections[index]}</b></td>
                    <td className="book-info">{info[`${bookSections[index]}`]}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <div className="workout-grid">
        <div className="exercise-name">
          <h4>Track Progress</h4>
        </div>
        {progressSections.map((section, index) => {
          return (
            <React.Fragment key={index}>
              <div className="exercise-name">
                <p>{section}</p>
              </div>
              <input value={weights?.[section] || ''} onChange={(e) => {
                handleAddWeight(section, e.target.value,) 
              }} className="weight-input" placeholder="0" />
            </React.Fragment>
          )
        })}
      </div>

      <progress value={(weights?.["Pages"] || 0) / bookInfo[3]["Pages"] * 100} max="100"></progress>

      <div className="workout-buttons">
        <button onClick={() => {
          handleSave(workoutIndex, { weights })
        }}>Save & Exit</button>
        <button onClick={ () => {
          handleComplete(workoutIndex, { weights })
        }}disabled={Object.keys(weights).length !== progressSections.length}>Complete</button>
        {console.log(Object.keys(weights).length)}
        {console.log(progressSections.length)}
      </div> 

    </div> 
)
}