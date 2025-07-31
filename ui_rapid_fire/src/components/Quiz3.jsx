import { useState, useCallback, useEffect } from "react"
import QUESTIONS from "../questions.js"
import Answers3 from "./Answers3.jsx"
import quizCompleteImg from "../assets/quiz-complete.png"

import Question3 from "./Question3.jsx"
import questions from "../questions.js"

export default function Quiz(){
   
    const [userAnswer, setUserAnswer] = useState([])
    //based on answerstate  selected question to show
    const currentQuestion = userAnswer.length;
    const isQuizComplete = currentQuestion >= QUESTIONS.length;
   
   const handleSelectAnswer = useCallback(
    (answer) =>{setUserAnswer((prevAnswers) => [...prevAnswers, answer])},[])
                
   
   const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer]);
   
 

    if (isQuizComplete) {
        return (
        <div id="summary">
        <img src={quizCompleteImg} alt="Tropy Image"></img>
        <h2>Quiz Completed!</h2>
        </div>
        )
    }


    return (
        <div id="quiz">
            <Question3 currentQuestion={currentQuestion} handleTimeoOut={handleSkipAnswer} ></Question3>
             <Answers3 
                key={currentQuestion}
                answers={QUESTIONS[currentQuestion].answers}
                onSelect={handleSelectAnswer}
                currentQuestion={currentQuestion}
                />
        </div>

    ) 
}