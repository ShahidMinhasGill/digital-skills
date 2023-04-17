import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../service/HomeApi";

const QuestionSec = () => {

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Set the number of items to show per page
  const data = [
    // An array of data to be paginated
    { id: 1, name: 'Before making a decision I always consult information from another people who have been in a simillar postion to make sure iunderstand the full implications of my actions' },
    { id: 2, name: 'A business leader must always prioritz action that improve return on invested capital, above any other outcome' },
    { id: 3, name: 'A leader is only as good as the technical knowledge they bring to the business' },
    { id: 4, name: 'Asking for help signals that you dont know how to do your job' },
    { id: 5, name: 'Employees come to work to earn a salary, not because of a shared vision or shared values with those they work with' },
    { id: 6, name: 'I am happy to dedicate the time it takes to learn things properly' },
    { id: 7, name: 'I frequently ask other people how Im performing in my role' },
    { id: 8, name: 'I need to know someone on a personal level before I consider asking them for any sort of help' },
    { id: 9, name: 'I prioritize spending time focusing on activities where I can directly act to achieve a tangible business outcome versus working with others to achieve their goals' },
    { id: 10, name: 'I rarely compromise when making business decisions because Im usually the most well-informed on the topic' },
    { id: 11, name: 'I set a lot of goals knowing that I will only achieve some of them' },
    { id: 12, name: 'Im comfortable learning quickly even if that means I miss some of the details' },
    { id: 13, name: 'Individual employees must be supervised closely, or they will not perform as well as they could' },
    { id: 14, name: 'Its important to punish mistakes, otherwise theyll keep happening' },
    { id: 15, name: 'Its more important for me to know one area of my business really well, as opposed to a little bit about every part of the business' },
    { id: 16, name: 'Its more important to be acquainted with a lot of people than to have deep connections with a few people' },
    { id: 17, name: 'Leaders are born, not made - they either have the talent and ability or dont' },
    { id: 18, name: 'Problem solving is an individual activity that requires deep thinking alone' },
    { id: 19, name: 'The only people who have valuable advice to offer are those who operate in the same sector, location, or industry' },
    { id: 20, name: 'The people I manage are better equipped at making decisions than I am because they have the best information at hand' },
    { id: 21, name: 'There is a correct answer to every problem in business' },
    { id: 22, name: 'You can only be successful if you know the right people' },
  ];
  const dispatch = useDispatch();
  // const isLoading = questions.isLoading;
  // const error = questions.error;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [percentage, setPercentage] = useState(0);
  const [checkbox, setCheckbox] = useState(0);


  const questions = useSelector((state) => state.homeReducer.questions);
  const currentData = questions.slice(indexOfFirstItem, indexOfLastItem);

  console.log('questions',questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);
 
 
 
  function handleNext() {
    setCheckbox(0) 
    setCurrentPage(currentPage + 1);
  }
  function handleBack() {
    setCheckbox(1)
    // setCheckbox(false)
    // currentPage - 1
    setCurrentPage(currentPage - 1);
  }

  const nextStep = () => {
    if (percentage === 100) return;
    setPercentage((prevPercentage) => prevPercentage  + (100/30));
  };
  const backStep = () => {
    if (percentage === 0) return;
    setPercentage((prevPercentage) => prevPercentage - (100/30));
  };
  function handleChange(event) {
    console.log('event',event);
    if (event.target.checked) {
      setCheckbox(true)
      nextStep();
    } else {
      backStep()
      setCheckbox(false)
    }
  }

  return (
    <div className="">
      <div className="row question-sec p-2" style={{borderRadius:'10px 10px 0px 0px'}}>
        <div className="col-3 d-flex align-items-center back-btn">
          <button onClick={handleBack}>Back</button>
        </div>
        <div className="col-8">
          <div className="col-7">
           
            <h3>Quistion 5 of 25</h3>
          </div>
          <ProgressBar percentage={percentage} />
        </div>
      </div>

          <div >
           <div className="row ask-quistion d-flex justify-content-center mt-5">
            {currentData?.map((question) => (
       <>
        <div className="col-11 d-flex">
          <div className="col-1 text-center">
            <h2>5</h2>
          </div>
          <div className="col-lg-8 col-md-12 ">
            <h2>
            <li key={question.id}>{question.question_text}</li>

            </h2>
          </div>
        </div>
        <div className="col-11 mt-4">
          <h2>select you response</h2>
        </div>
        <div className="col-11  ">
          <div className="col-lg-9 col-12 d-flex question-bg ">
            <div className="col-lg-1 col-2 d-flex justify-content-center align-items-center">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                checked={checkbox}
                id="flexCheckChecked"
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 col-10 ">
              <h2>Strongly Agree</h2>
            </div>
          </div>
        </div>
        <div className="col-11  mt-3">
          <div className="col-lg-9 col-12 d-flex question-bg2 ">
            <div className="col-lg-1 col-2 d-flex justify-content-center align-items-center">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 col-10 ">
              <h2> Agree</h2>
            </div>
          </div>
        </div>
        <div className="col-11  mt-3">
          <div className="col-lg-9 col-12 d-flex question-bg ">
            <div className="col-lg-1 col-2 d-flex justify-content-center align-items-center">
              <input
                class="form-check-input"
                type="radio"
                value=""
                id="flexCheckChecked"
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 col-10 ">
              <h2>Neither Agree Not Disagree</h2>
            </div>
          </div>
        </div>
        <div className="col-11  mt-3">
          <div className="col-lg-9 col-12 d-flex  ">
            <div className="col-lg-1 col-2 d-flex justify-content-center align-items-center">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                onChange={handleChange}
                id="flexCheckChecked"
              />
            </div>
            <div className="col-lg-6 col-10 ">
              <h2>Disagree</h2>
            </div>
          </div>
        </div>
        <div className="col-11  mt-3">
          <div className="col-lg-9 d-flex question-bg ">
            <div className="col-lg-1 col-2 d-flex justify-content-center align-items-center">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 col-10 ">
              <h2>Strongly Disagree</h2>
            </div>
          </div>
        </div>
       </>
            ))}
      
      </div>
          {/* <h2>{question.question_text}</h2> */}
        </div>
  
      <div className="row question-sec mt-5 p-3" style={{borderRadius:'0px 0 10px 15px'}} >
        <div className="col-lg-1 col-md-2 col-4 d-flex align-items-center back-btn">
          <button onClick={handleNext}>Next</button>
          
        </div>
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center">
          <h3>Quistion 5 of 23</h3>
        </div>
      </div>
 
    </div>
  );
};

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
