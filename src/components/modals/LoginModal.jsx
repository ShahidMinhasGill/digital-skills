import React, { useEffect, useState } from "react";
import {Row, Col, Modal, Spinner, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "./service/authApi";


const LoginModal = ({ show, onHide, welcomeMessage, hideSignUpShowLogin }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate ()
    // const isLoading = useSelector(state => state.auth.isLoading)
    // const error = useSelector(state => state.auth.error)
    // const token = useSelector(state => state.token)
    // const { isLoading, token, error } = useSelector((state) => auth.state);
    const getUser = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(getUser);
   
    const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loginSuccessful, setLoginSuccessful] = useState("");
    const [incorrectFields, setIncorrectFields] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const loggedInUser = useSelector((state) => state.homeReducer.user);
      const handleUsernameChange = (event) => {
        setUserName(event.target.value);
      };
    useEffect(() => {
        if (formSubmitted && loggedInUser) {
          toast.success('Login Successful!')
          setLoader(false);
          setIncorrectFields("");
          setUserName("");
          setPassword('');
          onHide(false)
        } else if (formSubmitted ){
          setLoginSuccessful("");
          setLoader(false);
        //   toast.error('Incorrect email or password!')
        }
      }, [formSubmitted, loggedInUser]);
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === ""  || password === "" || password.length < 8) {
        if (!error) {
            setError(true);
          }
      } else {
        setLoader(true);
        
        const userData = {
                username: username,
                password: password,
              };
              dispatch(login(userData));
              setFormSubmitted(true);
            //   dispatch(login(userData));
            //   setIncorrectFields("Incorrect email or password!");
        //   if (!token) {
        //     toast.error('Incorrect email or password!')
        //   }
        //   dispatch(login(userData, (data)=> {
        //     console.log('userData1',userData);
        //     if (data) {
        //       setLoginSuccessful("Login Successful!");
        //       setLoader(false);
        //       setIncorrectFields("");
        //       welcomeMessage("Fayaz");
        //     } else {
        //       setLoginSuccessful("");
        //       setLoader(false);
        //       setIncorrectFields("Incorrect email or password!");
        //     }
        //   }));
      }
  };

  return (
    <Modal
    centered
    show={show}
    onHide={onHide}
    className="signup-modal"
>

    <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <div className="main">
            <h1>Login </h1>
            {/* <p className="title">Don't have an account yet?
                <span onClick={hideSignUpShowLogin}> Create it now</span>
            </p> */}
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
            Login
        </button>
        {loader && <p>Loading...</p>}
        {loginSuccessful && <p>{loginSuccessful}</p>}
      </Form>
    </Modal.Body>

</Modal>
    );
};

export default LoginModal;
