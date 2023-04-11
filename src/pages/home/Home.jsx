import React, { useEffect } from "react";
import QuestionSec from "./components/QuestionSec";
import Outcomes from "./components/Outcomes";
// import { GetQuestionList } from "./service/createHomeApi";

export default function Home() {

  return (
    <div className=" home">
      <div className="container">
        {/* <div className="row top-section" style={{border:'1px solid red'}}>

          <div className="col-2">
            <button>Back to Home</button>
          </div>
          <div className="col-12 mt-3">
            <h2>Leadership questionnaire</h2>
            <div className="col-lg-7 col-10" style={{border:'1px solid red'}}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                porttitor massa. Interdum et malesuada fames ac ante ipsum
                primis in faucibus. Nullam rhoncus vel massa et viverra.
              </p>
          </div>
          </div>
        </div> */}
        <div className="row d-flex justify-content-center">

        <div className="col-10 mt-5" >
        <QuestionSec />
        </div>
        </div>
      </div>
      {/* <div className="container-fluid">
      </div> */} 


    </div>
  );
}
