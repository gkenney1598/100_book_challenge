import { useEffect, useState } from 'react';
import {bookTitles as bookTitles} from '../utils/index.js'
import BookCard from './BookCard.jsx';
import axios from 'axios'

export default function Grid() {
  const [ savedProgress, setSavedProgress ] = useState(null)
  const [ selectedBook, setSelectedBook ] = useState(null)
  const [ bookJsonData, setBookJsonData ] = useState(null)
  const completedBooks = Object.keys(savedProgress || {}).filter((val) => {
    const entry = savedProgress[val]
    return entry.isComplete
  });

  function handleSave(index, data){
    const newObj = {
      ...savedProgress,
      [index]: {
        ...data,
        isComplete: !!data.isComplete || !!savedProgress?.[index]?.isComplete
      }
    }
    setSavedProgress(newObj)
    localStorage.setItem('30_day_challenge', JSON.stringify(newObj))
    setSelectedBook(null)
  }

  function handleComplete(index, data){
    const newObj = { ...data }
    newObj.isComplete = true
    handleSave(index, newObj)
  }

  // React.useEffect(() => {

  // }, [selectedBook])
  const apiCall = (bookTitle) => {
    axios.get(`http://localhost:3000/${bookTitle}`).then((data) => {
      setBookJsonData(data)
      console.log(data)
    })
  }

  useEffect(() => {
    if (!localStorage) { return }
    let savedData = {}
    if (localStorage.getItem('30_day_challenge')){
      savedData = JSON.parse(localStorage.getItem('30_day_challenge'))
    }
    setSavedProgress(savedData)
  }, [])

  return (
    <div className="reading-plan-grid">
      {Object.keys(bookTitles).map((title, bookIndex) => {
        const isLocked = bookIndex === 0 ?
        false :
        !completedBooks.includes(`${bookIndex - 1}`)

        const dayNum = ((bookIndex / 8) <=1) ? '0' + (bookIndex + 1) : bookIndex + 1 

        if (bookIndex === selectedBook) {
          return (
            <BookCard bookTitle={bookTitles[bookIndex]} key={bookIndex} bookIndex={bookIndex} dayNum={dayNum} handleComplete={handleComplete} handleSave={handleSave} savedProgress={savedProgress?.[bookIndex]?.progress} bookInfo={bookJsonData}/>
          )
        }

        return (
          <button onClick={() => {
            if (isLocked) { return }
            setSelectedBook(bookIndex)
            apiCall(bookTitles[bookIndex])
          }} className={'card book-card ' + (isLocked ? 'inactive' : '')}key={bookIndex}>
            {isLocked ? (
              <i className='fa-solid fa-lock'></i>
            ) : null}
            <div className='book-card-header'>
              <p>{dayNum}: {bookTitles[bookIndex]}</p>
            </div>
          </button>
        )
      })}
    </div> 
  )
}