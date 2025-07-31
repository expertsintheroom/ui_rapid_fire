
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Question3({currentQuestion, handleTimeoOut}) {

return (
            <div id="question">
            <QuestionTimer key={currentQuestion}
            timeout={10000} onTimeOutFn={handleTimeoOut} />
            <h2>{QUESTIONS[currentQuestion].text}</h2>
           </div>
      
         )
}