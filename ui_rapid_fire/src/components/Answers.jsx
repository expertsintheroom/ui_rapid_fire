import { useRef,useState } from "react";
import QUESTIONS from "../questions.js";

export default function Answers({answers, onSelect,answerState, selectedAnswer}) {

   
    const shuffledAnswers = useRef(); // useRef to hold shuffled answers  
    
     
    
    if(!shuffledAnswers.current){
      shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
    }

    
   return (   
     <ul id="answers">
                { shuffledAnswers.current.map(
                    (answer,index) => {
                        const isSelected = selectedAnswer.selected === answer;
                        let answerClass = '';
                        if (isSelected && answerState === 'selected') {
                            answerClass = 'selected';
                        }
                       if (isSelected && (answerState === 'correct' || answerState === 'wrong')) {
                            answerClass = answerState
                        }

    
                 return  (
                    <li key={index} className="answer">
                        <button className={answerClass} disabled={answerState !== ''}
                         onClick={ () => onSelect(answer)}>{answer}</button>
                      </li>
                     )
                    }
            )
         }
            </ul> 
    )
}