import QUESTIONS from "../questions.js"
import quizCompleteImg from "../assets/quiz-complete.png"
export default function Summary({userAnswers}){
 const skippedCount = userAnswers.filter(answer => answer === null).length;
 const correctCount = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]).length;
 const wrongCount = userAnswers.length - skippedCount - correctCount;
 const skippedPercentage = ((skippedCount / QUESTIONS.length) * 100).toFixed(0);
 const correctPercentage = ((correctCount / QUESTIONS.length) * 100).toFixed(0);
 const wrongPercentage = ((wrongCount / QUESTIONS.length) * 100).toFixed(0);

     return (
        <div id="summary">
        <img src={quizCompleteImg} alt="Tropy Image"></img>
        <h2>Quiz Completed!</h2>                                                                                
        <div id="summary-stats">
            <p>
                <span className="number">{skippedPercentage}%</span> 
                <span className="text">skipped</span>
            </p>
             <p>
                <span className="number">{correctPercentage}%</span> 
                <span className="text">answered correctly</span>
            </p>
             <p>
                <span className="number">{wrongPercentage}%</span> 
                <span className="text">answered wrong</span>
            </p>
         </div>
        <ol>
            {userAnswers.map((answer, index) => {

                let cssClass = 'user-answer';
                if (answer === null) {
                    cssClass += ' skipped';
                } else if (answer === QUESTIONS[index].answers[0]) {
                    cssClass += ' correct';
                } else {
                    cssClass += ' wrong';
                }

              return ( <li key={index}>
                <h3>{index + 1}</h3>
                <p className="question">{QUESTIONS[index].text}</p>   
                <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>)
        
            })}
          </ol>


        </div>
        )

}