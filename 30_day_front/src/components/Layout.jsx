export default function Layout(props) {

  const { children } = props;

  const header = (
    <header>
      <h1><strong>100</strong> <br/> <b>Best Books</b></h1>
      <h2><i>of the</i></h2>
      <h1><b>21st Century</b></h1>
      <h3><strong>A Reading Challenge</strong></h3>
      <p>List compiled by the <a href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html" target="_blank">NYT</a></p>
      <img src='public/100bestbooks.png'/>
    </header>
  ) 

  const footer = (
    <footer>
      <p>Built by <a href="/" target="_blank">Grace</a><br/>Inspired by <a href="https://www.youtube.com/watch?v=dKch_WrYwd4" target="_blank">Smoljames</a></p>
    </footer>
  )

  //https://www.<username>.netlify.app

  return (
    <>
      {header}
      {children}
      {footer}
    </> 
  )
}