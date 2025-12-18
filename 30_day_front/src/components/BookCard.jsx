import React, { useState } from 'react'

export default function BookCard(props) {
  const { bookTitle, bookIndex, dayNum, savedProgress, handleSave, handleComplete, bookJson } = props;
  const [ progress, setProgress ] = useState(savedProgress || {});
  const [ bookInfo, setBookInfo ] = useState(null)

  function handleAddProgress(title, newProgress){
    const newObj = {
      ...progress,
      [title]: newProgress
    }
    setProgress(newObj)
  }

  // TODO: api call for book info
  // const bookInfo = [
  //   {Author: "auther author"},
  //   {Description: "book description placeholder, will replace with blurb of book. will be a longer section"},
  //   {Year: "2xxx"},
  //   {Pages: "300"},
  //   {Link: "link to buy the book"}
  // ]
  function processBookInfo(){
    const bookData = JSON.parse(bookJson)
    const book = [
      {Author: bookData.contributions[1].author},
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
                  <tr>
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
)
}