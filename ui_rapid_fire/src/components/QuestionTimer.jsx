import { useEffect,useState } from "react";

export default function QuestionTimer({ timeout, onTimeOutFn , mode}) {
    const [timeLeft, setTimeLeft] = useState(timeout); // 10 seconds for each question
    
    useEffect(() =>{
        console.log("setTimeout called");
          const timer =   setTimeout(onTimeOutFn,timeout)
         return () => clearTimeout(timer); // Cleanup on unmount
    },[timeout, onTimeOutFn]);
  
    useEffect(() => { 
        console.log("setInterval called");
        const interval = setInterval(() => {
                setTimeLeft((prevTime) => { return (prevTime - 100) });
                }, 100);
        return () => {
            console.log("timeLeft>>"+timeLeft)
            clearInterval(interval)} // Cleanup on unmount
       },[])
   


    return   <progress  id="question-time" value={timeLeft} max={timeout} className={mode} />
       
    
}