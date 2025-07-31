import { useState, useCallback, useEffect } from "react"
import QUESTIONS from "../questions.js"
import quizCompleteImg from "../assets/quiz-complete.png"

import Question from "./Question.jsx"
import questions from "../questions.js"
import Summary from "./Summary.jsx"

export default function Quiz(){
   
    const [userAnswer, setUserAnswer] = useState([])
    //based on answerstate  selected question to show
    const currentQuestion = userAnswer.length;
    const isQuizComplete = currentQuestion >= QUESTIONS.length;
   
   const handleSelectAnswer = useCallback(
    (answer) =>{setUserAnswer((prevAnswers) => [...prevAnswers, answer])},[])
                
   
   const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer]);
   
 console.log("userAnswer", userAnswer); 

    if (isQuizComplete) {
      return <Summary  userAnswers={userAnswer}/>
    }


    return (
        <div id="quiz">
            <Question key={currentQuestion} currentQuestion={currentQuestion} handleTimeoOut={handleSkipAnswer} handleSelectAnswer={handleSelectAnswer} ></Question>
                  
        </div>

    ) 
}