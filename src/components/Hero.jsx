export default function Hero() {
    return (
        <>
            <h5>Read these books if you want to...</h5>
            <ol className="benefits-list">
                <li>Read guaranteed bangers</li>
                <li>Impress your friends with your literary prowess</li>
                <li>Learn to read critically</li>
                <li>Become a lifelong reader</li>
            </ol>

            <h3>The Rules</h3>
            <p>To complete the challenge, follow these simple rules:</p>
            <ul className="rules-list">
                <div className="rule-item">
                    <p><b>Go at your own pace</b></p>
                    <p>Rome wasn't built in a day. </p>
                </div>
                <div className="rule-item">
                    <p><b>Support your local library</b></p>
                    <p>100 books is a lot for your wallet and your bookshelf space... try finding books at your local library first!</p>
                </div>
                <div className="rule-item">
                    <p><b>Give every book a try</b></p>
                    <p>Expand your horizons and try new things*</p>
                </div>
            </ul>
            <small>* A DNF option will be available if you really hated it</small>
            <h1>The Reading Plan</h1>
            <p><i>Read a little each day &rarr; Track your progress and thoughts &rarr; Repeat</i></p>
            <p>Complete all of the books below and track your progress!</p>
        </>
    )
}