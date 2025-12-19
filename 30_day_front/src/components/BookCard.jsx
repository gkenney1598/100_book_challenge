import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function BookCard(props) {
  const { bookTitle, bookIndex, dayNum, savedProgress, handleSave, handleComplete } = props;
  const [ progress, setProgress ] = useState(savedProgress || {});
  const [ bookInfo, setBookInfo ] = useState(null)
  const [isLoading, setIsLoading ] = useState(true)
  const [ bookJsonData, setBookJsonData ] = useState(null)

  function handleAddProgress(title, newProgress){
    const newObj = {
      ...progress,
      [title]: newProgress
    }
    setProgress(newObj)
  }

  // TODO: look at books not filling properly (probably due to not accurate name):
  // Say Nothing, 2666, The Year of Magical Thinking, Outline, Evicted, Behind the Beautiful Flowers, Hateship, Friendship, Courtship, Loveship, Marriage, Random Family, The  Last Samurai, Sing Unburied Sing, Fun Home, A Visit From the Goon Squad, H is for Hawk, Postwar, The Argonauts, Persepolis, Runaway, The Looming Tower, Nickel and Dimed, The New Jim Crow, All Aunt Hagar's Children, The Copenhagen Trilogy, Septology, Hurricane Season, Frederick Douglass, The Return, The Days of Abandonment, On Beauty, Bring Up the Bodies, Men We Reaped,

  useEffect(() => {
      setIsLoading(true)
      axios.get(`http://localhost:3000/${bookTitle}`).then((data) => {
        parseBookInfo(data.data.data.books)
        setBookJsonData(data.data.data.books)
        setIsLoading(false)
      })     
  }, [bookTitle])

  function parseBookInfo(bookInfo){
      const bookData = bookInfo[0]
      const book = [
        {Author: bookData.contributions[0].author.name},
        {Description: bookData.description},
        {Year: bookData.release_year},
        {Pages: bookData.pages},
        {Link: "link to buy the book"}
      ]
      setBookInfo(book)
  }

  const bookSections = ["Author", "Description", "Year", "Pages", "Link"]
  const progressSections = ["Pages", "Stars"]
  
  return (
    isLoading || !bookJsonData ? (
      <div className="loading-card">Loading...</div> //TODO: create loading-card
    ) : (
      <div className="book-container">
      <div className="book-card card">
        <div className="book-card-header">
          <p>Day {dayNum}</p>
          <i className='fa-solid fa-book'></i>
        </div>
        <div className="book-card-header">
          <h2><b>{bookTitle}</b></h2> 
        </div>
      </div>

      <div>
        <div className="book-name">
          <i class="fa-solid fa-circle-info"></i>
          <h4>Info</h4>
        </div>
        <table>
          <tbody>
              {bookInfo.map((info, index) => {
                return (
                  <tr key={index}>
                    <td><b>{bookSections[index]}</b></td>
                    <td className="book-info">{info[`${bookSections[index]}`]}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <div className="book-grid">
        <div className="book-name">
          <i class="fa-solid fa-book-open-reader"></i>
          <h4>Track Progress</h4>
        </div>
        {progressSections.map((section, index) => {
          return (
            <React.Fragment key={index}>
              <div className="book-name">
                <p>{section}</p>
              </div>
              <input value={progress?.[section] || ''} onChange={(e) => {
                handleAddProgress(section, e.target.value,) 
              }} className="weight-input" placeholder="0" />
            </React.Fragment>
          )
        })}
      </div>

      <progress value={(progress?.["Pages"] || 0) / bookInfo[3]["Pages"] * 100} max="100"></progress>

      <div className="book-buttons">
        <button onClick={() => {
          handleSave(bookIndex, { progress })
        }}>Save & Exit</button>
        <button onClick={ () => {
          handleComplete(bookIndex, { progress })
        }}disabled={Object.keys(progress).length !== progressSections.length}>Complete</button>
      </div> 

    </div> 
    ))
}