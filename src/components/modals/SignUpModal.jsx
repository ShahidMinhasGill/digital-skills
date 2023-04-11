import React, { useEffect, useState } from "react";
import {Row, Col, Modal, Spinner, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "./service/authApi";

const initialValues = {
    username: "",
    email: "",
    password: "",
    // alreadyExists: "",
    // error: "",
  };
const SignUpModal = ({ show, onHide, welcomeMessage, hideSignUpShowLogin }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate ()
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loding, setLoding] = useState(false);
    const [accountCreated, setAccountCreated] = useState("");
    const [alreadyExists, setAlreadyExists] = useState("");
    const [loader, setLoader] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loginSuccessful, setLoginSuccessful] = useState("");
    const [incorrectFields, setIncorrectFields] = useState("");
    const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    // const isLoading = useSelector(state => state.auth.isLoading)
    // const error = useSelector(state => state.auth.error)
    // const token = useSelector(state => state.token)
    // const { isLoading, token, error } = useSelector((state) => auth.state);
    const token = sessionStorage.getItem('token')
      const [values, setValues] = useState(initialValues);

      useEffect(() => {
     if (token ) {
        if (token && formSubmitted) {
            toast.success('Account Created Successfully!')
            setLoader(false);
            setIncorrectFields("");
            onHide(false)
          } else{
            setLoginSuccessful("");
            setLoader(false);
            // toast.error('Email Already Exists!')
          }
     }
      }, [formSubmitted,token]);
      const handleUsernameChange = (event) => {
        setUserName(event.target.value);
      };
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
      const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
    
        setValues({
          ...values,
          [name]: value,
        });
      };
      
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" ||  email === "" || !emailRegExp.test(email)  || password === "" || password.length < 8) {
        if (!error) {
            setError(true);
          }
      } else {
        setLoader(true); 
        const userData = {
            username: username,
            email: email,
            password: password,
              };
              dispatch(registerUser(userData));
              setFormSubmitted(true);
      }

  };

  return (
    <>
    {loding}
    <Modal
    centered
    show={show}
    onHide={onHide}
    className="signup-modal"
>

    <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <div className="main">
            <h1>Register now</h1>
            <p className="title">Do you already have an account?
                <span onClick={hideSignUpShowLogin}> Log in</span>
            </p>
            {/* <button className="google">
                <img src={logingoogle} alt="logingoogle" className="logingoogle"/>
                Continue with Google
            </button> */}
        </div>
        {/* <p>or sign up with your email</p> */}
        <Row>

            <Col lg={6} md={6} sm={6} xs={12}>
                <div className="namediv">
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        name="username"
                        className="namebox"
                        placeholder="username"
                    />
                    <i className="fa fa-user nameimg"/>
                </div>
                {
                    error && username === "" ? (
                        <div className="error">Please enter your username.</div>
                    ) : ""
                }
            </Col>
        </Row>
        <div className="maildiv">
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                name="email"
                placeholder="Email"
                className="mailbox"
            />
            <i className="fa fa-envelope-square loginmail"/>
        </div>
        {
            error ? (
                <div className="error">
                    {
                        email === "" ? "Please enter your email." :
                            !emailRegExp.test(email) ? "Email is not valid." : ""
                    }
                </div>
            ) : ""
        }
        <div className="paswdiv">
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                name="password"
                className="paswbox"
                placeholder="Password"
            />
            <i className="fa fa-lock loginpassword"/>
        </div>
        {
            error ? (
                <div className="error">
                    {
                        password === "" ? "Please enter your password." :
                        password.length < 8 ? "Password must contain at least 8 characters."
                                : ""
                    }
                </div>
            ) : ""
        }
    


        <button className="loginbtn" type="submit" >
             Create Account
        </button>
        {loader && <p>Loading...</p>}
        {loginSuccessful && <p>{loginSuccessful}</p>}
      </Form>
    </Modal.Body>

</Modal>
    </>

    );
};

    export default SignUpModal;
