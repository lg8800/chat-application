import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import "./login.css";
import { loggedInUser } from "../../atom/globalState";

import "font-awesome/css/font-awesome.min.css";
const Login = () => {
  const [login, setlogin] = useState(false);
  const changelogin = () => {
    setlogin((p) => !p);
  };
  const [currentUser, setCurrentUser] = useRecoilState(loggedInUser);
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const password = useRef();
  const emailName = useRef();
  const passwordsignup = useRef();
  const authCtx = useContext(AuthContext);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandlerSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("username value");
    console.log(emailName.current.value);
    const userData = {
      username: emailName.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      password: passwordsignup.current.value,
    };
    console.log(userData);
    axios
      .post("https://chat-lg.azurewebsites.net/register", userData)
      .then((response) => {
        console.log(response.data);
        window.alert(
          "User created successfully!!! Check your email to verify your email address"
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error in creating user");
      });
  };
  const submitHandlerLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("username value");
    console.log(userName.current.value);
    const userData = {
      username: userName.current.value,
      password: password.current.value,
    };
    console.log(userData);
    axios
      .post("https://chat-lg.azurewebsites.net/authenticate", userData)
      .then((response) => {
        authCtx.login(response.data.token);
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setCurrentUser(response.data.user);
        setLoading(false);
        history.replace("/chatpage");
      })
      .catch((err) => {
        console.log(err);
        window.alert("Invalid username or password!");
      });
  };
  return (
    <div className="flexing">
      <div className={`container ${login ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up-container">
          <form onSubmit={submitHandlerSignup}>
            <h1>Create Account</h1>
            <div className="social-container">
              {/* <a href="#" className="social"><i className="fa-facebook-f"></i></a>
        <a href="#" className="social"><i className="fa-google-plus-g"></i></a>
        <a href="#" className="social"><i className="fa-linkedin-in"></i></a> */}
            </div>
            <span>or use your email for registration</span>
            <input type="text" className="input" ref={firstName} required />
            <input className="input" type="text" ref={lastName} required e />

            <input
              className="input"
              type="email"
              id="email"
              ref={emailName}
              required
            />
            <input
              className="input"
              type="password"
              id="password"
              ref={passwordsignup}
              required
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={submitHandlerLogin}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              className="input"
              type="email"
              id="email"
              ref={userName}
              required
            />
            <input
              className="input"
              type="password"
              id="password"
              ref={password}
              required
            />{" "}
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={changelogin} id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={changelogin} id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
