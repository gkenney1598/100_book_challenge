export default function Layout(props) {

  const { children } = props;

  const header = (
    <header>
      <h1 className="text-gradient">Best Books of the 21st Century Reading Challenge</h1>
      <p><strong>According to the <a href="https://www.nytimes.com/interactive/2024/books/best-books-21st-century.html" target="_blank">NYT</a></strong></p>
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