import { useState, useCallback, useEffect, useRef } from "react"
import QUESTIONS from "../questions.js"
import quizCompleteImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx"

export default function Quiz1(){
   
    const [userAnswer, setUserAnswer] = useState([])
    const [answerState,setAnswerState] = useState(''); 
    //based on answerstate  selected question to show
    const currentQuestion = answerState === ''?userAnswer.length : userAnswer.length - 1;
    const isQuizComplete = currentQuestion >= QUESTIONS.length;
    const [shuffledAnswers, setShuffledAnswers] = useState([])
    
     console.log('answerState>>'+answerState)
     console.log('userAnswer>>'+userAnswer)
     console.log('currentQuestion>>'+currentQuestion)
      


   const handleSelectAnswer = useCallback(
    (answer) =>
      { 
        setAnswerState('selected')
        setUserAnswer((prevAnswers) => [...prevAnswers, answer])
        
        setTimeout(() => {
            // hold selected state color for 2 second and then check for correct or wrong answer
          if(answer === QUESTIONS[currentQuestion].answers[0]) {
            setAnswerState('correct')
          }
          else {
            setAnswerState('wrong')
          } 

            //hold correct/wrong color for 1 sec and reset answer to empty as moving to next question
            setTimeout(() => {
                setAnswerState('');
            },1000);
        },2000);
     
    },[]
)
                
   
   const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer]);

 useEffect(() => {
  if (answerState === '' && currentQuestion < QUESTIONS.length) {
    const answers = [...QUESTIONS[currentQuestion].answers];
    answers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(answers);
  }
}, [currentQuestion, answerState]);

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
        <div id="question">
            <QuestionTimer
            key={currentQuestion}
            timeout={10000} onTimeOutFn={handleSkipAnswer} />
            <h2>{QUESTIONS[currentQuestion].text}</h2>
            <ul id="answers">
                {shuffledAnswers.map(
                    (answer,index) => {
                        const isSelected = userAnswer[currentQuestion] === answer;
                        let answerClass = '';
                        if (isSelected && answerState) {
                            answerClass = 'selected';
                        }
                       if (isSelected && (answerState === 'correct' || answerState === 'wrong')) {
                            answerClass = answerState
                        }

    
                        return  (
                    <li key={index} className="answer">
                        <button className={answerClass}
                         onClick={ () => handleSelectAnswer(answer)}>{answer}</button>
                      </li>
                )
                    }
            )
         }
            </ul>
        </div>
        </div>

    ) 
}