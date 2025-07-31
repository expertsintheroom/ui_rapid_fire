import { useRef,useState } from "react";
import QUESTIONS from "../questions.js";

export default function Answers3({answers, onSelect,currentQuestion }) {

   
    const shuffledAnswers = useRef(); // useRef to hold shuffled answers  
    const [answerState,setAnswerState] = useState(''); 
    const [selectedAnswer, setSelectedAnswer] = useState({qId:'', selected:''});
    
     
    
    if(!shuffledAnswers.current){
      shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
    }

   
const handleAnswerState = 
    (answer) =>
      { 
        setAnswerState('selected')
        setSelectedAnswer({qId:currentQuestion, selected:answer});
        
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
                setSelectedAnswer({qId:'', selected:''});
               onSelect(answer);   
            },1000);
        },2000);
         }

   return (   
     <ul id="answers">
                { shuffledAnswers.current.map(
                    (answer,index) => {
                        const isSelected = selectedAnswer.selected === answer;
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
                         onClick={ () => handleAnswerState(answer)}>{answer}</button>
                      </li>
                     )
                    }
            )
         }
            </ul> 
    )
}