
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import {useState} from "react";;

export default function Question({currentQuestion, handleTimeoOut, handleSelectAnswer}) {

const [selectedAnswer, setSelectedAnswer] = useState({qId:currentQuestion, selected:null,result:null});

  
const handleAnswerState = 
    (answer) =>
      { 
        setSelectedAnswer({qId:currentQuestion, selected:answer,result:'selected'});
        
        setTimeout(() => {
            // hold selected state color for 2 second and then check for correct or wrong answer
             setSelectedAnswer({qId:currentQuestion,
                 selected:answer,
                 result:answer === QUESTIONS[currentQuestion].answers[0] ? 'correct' : 'wrong'
                });
           //hold correct/wrong color for 1 sec and reset answer to empty as moving to next question
            setTimeout(() => {
                 handleSelectAnswer(answer);
            },2000);
        },1000);
    }

   let answerState =  '';
   if(selectedAnswer.selected && selectedAnswer.result){
    answerState = selectedAnswer.result; 
   }    
   else if(selectedAnswer.selected) {
    answerState = 'answered';
   }
 
   let timer = 10000;
   if(selectedAnswer && selectedAnswer.result === 'selected' ) {
    timer = 3000;
   }
   else if(selectedAnswer && (selectedAnswer.result  === 'correct' || selectedAnswer.result  === 'wrong')) {
    timer = 2000;
   }

return (<>
            <div id="question">
            <QuestionTimer mode= {answerState!=''?'answered':'' }
            key={timer}
            timeout={timer} onTimeOutFn={!selectedAnswer.selected?handleTimeoOut:null} />
            <h2>{QUESTIONS[currentQuestion].text}</h2>
           </div>
           <Answers
                answers={QUESTIONS[currentQuestion].answers}
                onSelect={handleAnswerState}
                answerState={answerState}
                selectedAnswer={selectedAnswer}
                />
        </>
      )
}