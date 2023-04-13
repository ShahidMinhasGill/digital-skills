import { useState } from 'react';
import { Container, ToggleButton, ToggleButtonGroup, Dropdown } from 'react-bootstrap';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsPersonCircle } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/logo.png'
import SignUpModal from '../../components/modals/SignUpModal';
import LoginModal from '../../components/modals/LoginModal';
function Header() {
  const [value, setValue] = useState([1, 2]);
  const [firstName, setFirstName] = useState("");
  // const [showLogin, setShowLogin] = useState(false);
  // const [showSignUp, setShowSignUp] = useState(false);
  const [state,  setState] = useState({
    showLogin : false,
    showSignUp : false
  })
  const welcomeMessage = (name) => {
    const user = JSON.parse(localStorage.getItem("userDetail"));
    user.first_name = user['full name'].split(" ")[0];
    setFirstName(user?.first_name);
    if (name === "showLogin") {
      setState(prevState => ({
        ...prevState,
        showSignUp: false
      }));
    } else if (name === "showSignUp") {
      setState(prevState => ({
        ...prevState,
        showLogin: false
      }))}
    }

  const [dropdownValue, setDropdownValue] = useState('COMMON BUSINESS PROBLEMS');
  const [dropdownValue2, setDropdownValue2] = useState('WAYS WE CAN HELP');
  const [selected, setSelected] = useState("About us");
  // const [joinus, setJoinus] = useState("Join us");
  const commonBusiness = ["COMMON BUSINESS PROBLEMS", "COMMON BUSINESS PROBLEMS1", "COMMON BUSINESS PROBLEMS2", "COMMON BUSINESS PROBLEMS3"];
  const languages = ["About us", "German", "Russian", "Chinese", "Japanese", "Urdu", "Hindi"];
  const wayshelp = ["WAYS WE CAN HELP", "WAYS WE CAN HELP2", "WAYS WE CAN HELP3", "WAYS WE CAN HELP4"];
  // const handleChange = (val) => {
  //   setValue(val);
  // };
  const handleChange = (event) => {
    setSelected(event.target.value);
    setDropdownValue(event.target.value);
    setDropdownValue2(event.target.value);
    // setJoinus(event.target.value);
  }
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
    setDropdownValue2(e.target.value);
  };
  const token = sessionStorage.getItem('token')
  return (
    <>
    <div className="navclass">

    <Container>
      {/* <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
        <ToggleButton variant="light" value={1}>Line 1</ToggleButton>
        <ToggleButton variant="light" value={2}>Line 2</ToggleButton>
      </ToggleButtonGroup> */}
        <Navbar collapseOnSelect expand="lg" className="navbar navbar-light">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* <BsPersonCircle className="profile-icon" /> */}
        <div className=" col-2 profile-icon " >
         <img src={logo} alt="" />
        </div>
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-nav ms-auto mobileStyle d-flex align-items-center">
            <Link to="/">Mentoring & board</Link>
            <Link to="/">Your Home Page</Link>
            <Link to="/">stauart.saywell1@bethbusiness.com</Link>
            <Link to="#" onClick={() => {
  if (token) {
    // Remove the token from local storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    // Clear the token value from state
    setState(prevState => ({
      ...prevState,
      token: undefined,
      user: undefined
    }));
  } else {
    // Show the login modal
    setState(prevState => ({
      ...prevState,
      showLogin: true
    }));
  }
}}>
  {!token ? 'Login' : 'Logout'}
</Link>
             

            <hr />
            <div className="Search">
              <input id="eval" type="text" placeholder='Search topicsand questions...'/>
              <button>Search</button>
            </div>
          </Nav>
        </Navbar.Collapse>
        

      </Container>
    </Navbar>
      <hr className='divider'/>
      <Container>
      <div className="row ">
        <div className="col-lg-4 col-12 logo " >
        {value.includes(1) && <img src={logo} alt="" />}
        </div>
        <div className="col-lg-8 col-12 dropdwons d-flex justify-content-around align-items-baseline">
        {value.includes(2) && (
        <Nav className="ms-auto dir">
        <select className="select" defaultValue={dropdownValue} onChange={handleChange}>
          {commonBusiness.map((commonBusiness, index) => (
            <option key={index} value={commonBusiness}>{commonBusiness}</option>
          ))}
        </select>
      </Nav>
      )}
        {value.includes(2) && (
        // <Dropdown>
        //   <Dropdown.Toggle variant="light" id="dropdown-basic">{dropdownValue2}</Dropdown.Toggle>
        //   <Dropdown.Menu>
        //     <Dropdown.Item onClick={() => setDropdownValue2('WAYS WE CAN HELP')}>WAYS WE CAN HELP</Dropdown.Item>
        //     <Dropdown.Item onClick={() => setDropdownValue2('dropdownValue2 2')}>dropdownValue2 2</Dropdown.Item>
        //     <Dropdown.Item onClick={() => setDropdownValue2('dropdownValue2 3')}>dropdownValue2 3</Dropdown.Item>
        //   </Dropdown.Menu>
        // </Dropdown>
        <Nav className="ms-auto dir">
        <select className="select" defaultValue={dropdownValue2} onChange={handleChange}>
          {wayshelp.map((wayshelp, index) => (
            <option key={index} value={wayshelp}>{wayshelp}</option>
          ))}
        </select>
      </Nav>
       
      )}
        {value.includes(2) && (
        <Nav className="ms-auto dir">
        <select className="select" defaultValue={selected} onChange={handleChange}>
          {languages.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>
        {/* {firstName ? (
          <div className="welcomeMessage">Hi {firstName}</div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Login</button>
        )} */}
        {/* <button onClick={() => setShowLogin(true)}>Login</button> */}
      </Nav>
      )}
        {value.includes(2) && (
        <Nav className="ms-auto dir">

                      <Link to="/" className='select text-decoration-none join-us'>Join us</Link>
      
        {/* {firstName ? (
          <div className="welcomeMessage">Hi {firstName}</div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Login</button>
        )} */}
        {/* <button onClick={() => setShowLogin(true)}>Login</button> */}
      </Nav>
      )}
        {/* {value.includes(2) && (
        <Nav className="ms-auto dir">
        <select className="select" defaultValue={joinus} onChange={handleChange}>
          {languages.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>
      </Nav>
      )} */}
        </div>
      </div>
   
      </Container>
      <SignUpModal
                    show={state.showSignUp}
                    onHide={() => setState({ ...state, showSignUp: false })}
                    hideSignUpShowLogin={() => setState({ ...state, showLogin: true, showSignUp: false })}
                    // welcomeMessage={() => welcomeMessage("showSignUp")}
                    // hideSignUpShowLogin={() =>  setState(prevState => ({
                    //   ...prevState,
                    //   showLogin: true, showSignUp: false
                    // }))}
                />
              <LoginModal
                show={state.showLogin}
                onHide={() => setState({ ...state, showLogin: false })}
                    
                    // welcomeMessage={() => this.welcomeMessage("showLogin")}
                    hideSignUpShowLogin={() => setState({ ...state,  showLogin: false, showSignUp: true })}
                          />
            
    </Container>
    </div>
    </>
  );
}

export default Header;
