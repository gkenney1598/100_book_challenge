export default function Hero() {
    return (
        <>
           <h2 className="section-title">The Challenge.</h2>
            <ol className="challenge-list">
                <li>Pick your next favorite book.</li>
                <li>Track your progress.</li>
                <li>Complete the book.</li>
                <li>Repeat.</li>
            </ol>
            <h3 className="section-title">~Some advice~</h3>
            <ul className="advice-list">
                <div className="advice-item">
                    <p><b>Support your local library</b></p>
                    <p>100 books is a lot for your wallet and your bookshelf space... try finding books at your local library first!</p>
                </div>
                <div className="advice-item">
                    <p><b>Go at your own pace</b></p>
                    <p>Rome wasn't built in a day. </p>
                </div>
                <div className="advice-item">
                    <p><b>Give every book a try</b></p>
                    <p>Expand your horizons and try new things. You never know what might suprise you.</p>
                </div>
            </ul>
            <h1 className="section-title">The Reading Plan</h1>
            <p><i>Read a little each day &rarr; Track your progres &rarr; Repeat</i></p>
            <p>Complete all of the books below! You must finish one book before moving onto the next.</p>
        </>
    )
}