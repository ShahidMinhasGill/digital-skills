// Question Types
// 1. MCQs | Multiple Choice | single

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchQuestions, fetchUser, fetchUserProgress, postResponse } from "../service/HomeApi"
import { BsTools } from 'react-icons/bs';




const QuestionSec = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [percentage, setPercentage] = useState(0);
  const [checked, setChecked] = useState('');
  const dispatch = useDispatch();

  const fetchquestions = useSelector((state) => state.homeReducer.questions);
  const curruntUser = useSelector((state) => state.homeReducer.data);
  const userprogress = useSelector((state) => state);
  // localStorage.setItem('userId',curruntUser);


   const [sentRespons, setSentRespons] = useState({
    // userId: curruntUser.id,
    question: 0,
    correctAnswers :0
  })
  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUser());
    dispatch(fetchUserProgress())
  }, [dispatch]);
  


  // const quiz = {
  //   topic: 'Javascript',
  //   level: 'Beginner',
  //   totalQuestions: 10,
  //   perQuestionScore: 5,
  //   // totalTime: 60, // in seconds
  //   questions: [],
  // };

  let questions = [];

  fetchquestions.map((question) => {
    questions.push({
      question: question.question_text,
      questionId: question.id,
      choices: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
      type: 'MCQs',
      correctAnswer: question.answer,
    });
  });
  console.log('questions420',questions);

  // const quiz = {
  //   topic: 'Javascript',
  //   level: 'Beginner',
  //   totalQuestions: 10,
  //   perQuestionScore: 5,
  //   totalTime: 60, 
  //   questions: [
  //     {
  //       question:
  //         'Which function is used to serialize an object into a JSON string in Javascript?',
  //         choices : ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
  //         type: 'MCQs',
  //       correctAnswer: 'stringify()',
  //     },
  //     {
  //       question:
  //         'Which of the following keywords is used to define a variable in Javascript?',
  //         choices : ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
  //         type: 'MCQs',
  //       correctAnswer: 'var and let',
  //     },
  //     {
  //       question:
  //         'Which of the following methods can be used to display data in some form using Javascript?',
  //         choices : ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
  
  //       type: 'MCQs',
  //       correctAnswer: 'All of the above',
  //     },
  //     {
  //       question: 'How can a datatype be declared to be a constant type?',
  //        choices : ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
  //       type: 'MCQs',
  //       correctAnswer: 'const',
  //     },
  //   ],
  // }
  function handleCheckboxChange(event) {
    const { name } = event.target;
    setChecked(name === checked ? '' : name);
 

  }
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  // const { questions } = quiz

  
  const { question,questionId, choices, correctAnswer } = questions[activeQuestion]
  console.log('questionId',questions[activeQuestion]);
  const nextStep = () => {
    if (percentage === 100) return;
    setPercentage((prevPercentage) => prevPercentage  + (100/25));
  };

  const onClickNext = () => { 
    dispatch(postResponse(sentRespons));
    setSelectedAnswerIndex(null)
    setChecked(null)
 
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
            
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
      nextStep()
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSentRespons(prevState => ({
      ...prevState,
      // userId: curruntUser.id,
      correctAnswers: answer,
      question: questionId,
    }))
    setSelectedAnswerIndex(answer)
    // if (answer === correctAnswer) {
    //   setSelectedAnswer(true)
    // } else {
    //   setSelectedAnswer(false)
    // }
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
    <div className="quiz-container" >
      <div className="row toop-sec">

       <div className="col-8 d-flex align-items-center ">
          <button >Back to Home page</button>
        </div>
             <div className="col-lg-8 col-md-12 ">
              <h3><BsTools className="tool-icon"/>Leadership questionnaire</h3>
          </div>
             <div className="col-lg-10 col-md-12 ">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec porttitor massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam rhoncus vel massa et viverra. Praesent et lobortis metus, nec tempus purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
</p>
          </div>
      </div>
           <div className="row question-sec p-3" style={{borderRadius:'10px 10px 0px 0px'}}>
        <div className="col-3 d-flex align-items-center back-btn">
          <button >Back</button>
        </div>
        <div className="col-8">
          <div className="col-7">
           
            <h3>Quistion 5   <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span></h3>
          </div>
          <ProgressBar percentage={percentage} />
        </div>
      </div>
      <div >
           <div className="row ask-quistion d-flex justify-content-center mt-5">
            {!showResult ? (
        <div>
        
          <div className="col-11 d-flex">
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          {/* <div className="col-1 text-center">
            <h2>{addLeadingZero(activeQuestion + 1)}</h2>
          </div> */}
          <div className="col-lg-9 col-md-12 mt-3 ">
            <h2>
            {/* {question} */}
                        <li >{question}</li>
            {/* <li >{questionId}</li> */}
            
            </h2>
          </div>
        </div>
            <div className="col-11 mt-4">
          <h2>select you response</h2>
        </div>
        <div className="col-11 mt-3 ">
        {choices?.map((answer, index) => (
          <div className={`col-lg-4 col-12 d-flex ${index % 2 !== 1 ? 'question-bg' : ''}`}>
            <div className="col-lg-1 col-2 d-flex justify-content-center align-items-center">
              <input
                class="form-check-input"
                type="radio"
                name={answer}
                checked={checked === answer}
                onChange={handleCheckboxChange}
                onClick={() => onAnswerSelected(answer, index)}
                id={`flexCheckChecked${index}`}
              />
              {/* <h2>{index}</h2> */}
            </div>
            <div className="col-lg-6 col-10 ">
              <h2>{answer}</h2>
            </div>
          </div>
             ))}
        </div>
          {/* <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={
                  selectedAnswerIndex === index ? 'selected-answer' : null
                }
              >
                {answer}
              </li>
            ))}
          </ul> */}
            
      <div className="row question-sec mt-5 p-3" style={{borderRadius:'0px 0 10px 15px'}} >
        <div className="col-lg-1 col-md-2 col-4 d-flex align-items-center back-btn">
          <button 
           onClick={onClickNext}
           disabled={selectedAnswerIndex === null}
          >
          {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
          
        </div>
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center">
        <h3>Quistion 5   <span>
              /{questions.length}
            </span></h3>
        </div>
      </div>
          {/* <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div> */}
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
            </div>
   
    </div>
    </div>
  )
}

const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
};

const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />;
};

export default QuestionSec;
