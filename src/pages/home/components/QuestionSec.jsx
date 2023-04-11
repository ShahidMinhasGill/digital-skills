// Question Types
// 1. MCQs | Multiple Choice | single

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser,fetchQuestions, fetchUserProgress, fetchUserResult, postResponse } from "../service/HomeApi"
import { BsTools } from 'react-icons/bs';
import { toast } from "react-toastify";
import Outcomes from "./Outcomes";
// import { fetchUser } from "../../../components/modals/service/authApi";
const QuestionSec = () => {
  // const [activeQuestion, setActiveQuestion] = useState(0)
  const [showQuestion, setShowQuestion] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  // const [percentage, setPercentage] = useState(0);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const getUser = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(getUser);
  const [sentRespons, setSentRespons] = useState({
    user: 0,
    answer : 0,
    question: 0
  })
  const [userResult, setUserResult] = useState({
    name: '',
    description: '',
  })
  const [result, setResult] = useState({
    completed_percentage: 0,
    completed_question: '',
    question_left: 0,
    last_completed_question: 0,
  })

  const progressResponse = useSelector((state) => state.homeReducer.userProgress);
  useEffect(() => {
    if (showQuestion && result.completed_question) {
      setShowQuestion(false);
    }
  }, [result, showQuestion]);
  useEffect(() => {
    if (progressResponse && progressResponse.length > 0) {
      const data = progressResponse[0];
      setResult({
        completed_percentage: data.completed_percentage,
        completed_question: data.completed_question,
        question_left: data.question_left,
        last_completed_question: data.last_completed_question,
      });
    }
  }, [progressResponse]);
  
  const getQuestions = useSelector((state) => state.homeReducer.questions);
  const currentUser = useSelector((state) => state.homeReducer.user);
const [activeQuestion, setActiveQuestion] = useState(0);
const [questions, setQuestions] = useState([]);
const [loading, setLoading] = useState(true);

const fetchQuestionsformat = async () => {
  try {
    const formattedQuestions = await Promise.all(
      getQuestions.data.map(async (question) => ({
        question: question.question_text,
        questionId: question.id,
        // choices: ['Strongly Disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly Agree'],
        choices: question.question_answers.map(answer => answer),        
      }))
    );
    setQuestions(formattedQuestions);
    setLoading(false);
  } catch (error) {
    console.error(error);
  }
};


useEffect(() => {
  dispatch(fetchQuestions());
  dispatch(fetchUser());
  dispatch(fetchUserResult());
}, []);
// useEffect(() => {
// }, [token]);

useEffect(() => {
  fetchQuestionsformat();
}, [getQuestions]);
useEffect(() => {
  setResult((prev) => ({
    ...prev,
    // completed_percentage: prev.completed_percentage + (100/25),
    completed_question: questions[activeQuestion]?.question,
    // question_left: question.length - activeQuestion,
  }))
  // console.log('question_left',result.question_left);
}, [activeQuestion]);

useEffect(() => {
  // Get the progress bar state from localStorage
  const storedState = localStorage.getItem('progressBarState');
  if (storedState) {
    setResult(JSON.parse(storedState));
  }
}, []);

useEffect(() => {
  // Update localStorage whenever the progress bar state is updated
  localStorage.setItem('progressBarState', JSON.stringify(result));
}, [result]);



if (loading) {
  return <div>Loading...</div>;
}

const question = questions[activeQuestion]?.question;
const choices = questions[activeQuestion]?.choices;
const answerId = questions[activeQuestion]?.answerId;
console.log('choices',choices);
const questionId = questions[activeQuestion]?.questionId;

  function handleCheckboxChange(event) {
    const { name } = event.target;
    setChecked(name === checked ? '' : name);
  }
  const nextStep = () => {
  
    if (result.completed_percentage >= 100) return;
      setResult((prev) => ({
        ...prev,
        completed_percentage: prev.completed_percentage + (100 / getQuestions?.data?.length),
      }));
  };
 
  const handleBack = ()=>{
    // if (result.completed_percentage >= 100) return;
    setResult((prev) => ({
      ...prev,
      completed_percentage: prev.completed_percentage - (100 / getQuestions?.data?.length),
    }));
    setActiveQuestion((prev) => prev - 1)
  }
  const onClickHome = ()=>{
    setResult((prev) => ({
      ...prev,
      completed_percentage: prev.completed_percentage = 0,
      question_left: 0,
      // completed_question: 0,
    }));
    // dispatch(fetchQuestions());
    setShowResult(false)

    // console.log('completed_question', result.completed_percentage);
    // setActiveQuestion((prev) => prev - 1)
    // setActiveQuestion((prev) => prev = 0)
    setActiveQuestion(0)
  }
  const onClickNext = () => { 
    if (!token) {
      // User ID not found, show error message
      toast.error('Please Login first');
    } else{
      dispatch(postResponse(sentRespons));
      setSelectedAnswerIndex(null)
      setChecked(null) 
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1)
        nextStep()
      } else {
        // dispatch(fetchUserResult());
        nextStep()
        setActiveQuestion(0)
        setActiveQuestion(0)
        dispatch(fetchUserProgress(user?.id))
        setShowResult(true)
        localStorage.removeItem('progressBarState');
      }
    }
  }

  const onAnswerSelected = (answer, index) => {
    setResult((prev) => ({
      ...prev,
      question_left: questions.length - activeQuestion - 1,
    }))
    setChecked(answer === checked ? '' : answer);
    setSentRespons(prevState => ({
      ...prevState,
      user :currentUser?.id,
      answer: answer?.id,
      question: questionId,
    }))
    setSelectedAnswerIndex(answer)
  }
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
  return (
    <div className="quiz-container" >
      <div className="row toop-sec">
       <div className="col-8 d-flex align-items-center ">
          <button onClick={onClickHome}>Back to Homepage</button>
        </div>
             <div className="col-lg-8 col-md-12 ">
              <h3><BsTools className="tool-icon"/>Digital skill audit  
              {/* <p style={{marginLeft:'51px',fontSize:'21px'}}>Charting Your Path</p> */}
              </h3>
             
              
          </div>
             <div className="col-lg-11 col-md-12 ">
              <p>  
              wich of the follwing elements of digital marketing are part of your marketing strategy?
              <br />
              <br />
              Select your response to each of the statements below:
             </p>
          </div>
      </div>
           <div className="row question-sec p-3" style={{borderRadius:'10px 10px 0px 0px'}}>
        <div className="col-3 d-flex align-items-center back-btn">
          <button onClick={handleBack}
          disabled={(activeQuestion === 0)}
          > Back</button>
        </div>
        <div className="col-6">
          <div className="col-7 mx-auto ">
           
            <h3>Question <span className="active-question-no " style={{marginLeft:'5px'}}>
              {(activeQuestion + 1)}
            </span>   
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span></h3>
          </div>
          <ProgressBar percentage={result.completed_percentage} />
        </div>
      </div>
      <div >
           <div className="row ask-quistion d-flex justify-content-center mt-5">
            {!showResult ? (
        <div >
        
          <div className="col-11 d-flex mx-auto">
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <div className="col-lg-11 col-md-12 mt-3 m-3 ">
    {showQuestion ? (
      <h2>{question}</h2>
    ) : (
      <div>
        <h2>{result.completed_question}</h2>
      </div>
    )}
  </div>
        </div>
            <div className="col-9 mt-4 m-3 mx-auto">
          <h2>Select your response</h2>
        </div>
        <div className="col-10 mt-3 mx-auto">
        {choices?.map((answer, index) => (
          <div  onClick={() => onAnswerSelected(answer, index)} className={`col-lg-6 col-12 d-flex  ${index % 2 !== 1 ? 'question-bg' : 'question-bg2'}`}>
            <div className="col-lg-1 col-2 d-flex justify-content-center align-items-center">
              <input
                class="form-check-input"
                type="radio"
                name={answer}
                checked={checked === answer}
                onChange={handleCheckboxChange}
               
                id={`flexCheckChecked${index}`}
              />
              {/* <h2>{index}</h2> */}
            </div>
            <div className="col-lg-8 col-10 ">
              <h2>{answer.answer_test}</h2>
            </div>
          </div>
             ))}
        </div>
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
        <h3>Question <span className="active-question-no" style={{marginLeft:'15px',fontSize:'24px'}}>
              {(activeQuestion + 1)}
            </span>   
            <span className="total-question" style={{marginTop:'10px'}}>
              /{addLeadingZero(questions.length)}
            </span></h3>
        </div>
      </div>

        </div>
        
      ) : (
        <div className="result">
          <h3>Result</h3>
          <Outcomes />

          <div>
    </div>
          {/* Discripton:<span> {userResult.description}</span> */}
          {/* <p>
          Completed Question:<span> {progressResponse.completed_question}</span>
          </p>
          <p>
          Question left:<span> {progressResponse.question_left}</span>
          </p>
          <p>
          Last Completed Question:<span> {progressResponse.last_completed_question}</span>
          </p> */}
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
