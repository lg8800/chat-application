import React, { useState, useRef,useContext } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import AuthContext from '../store/auth-context'
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history=useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const password = useRef();
  const authCtx = useContext(AuthContext);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandlerSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      username: userName.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      password: password.current.value,
    };
    axios
      .post("https://lg-chats.herokuapp.com/register", userData)
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
    const userData = {
      username: userName.current.value,
      password: password.current.value,
    };
    axios
      .post("https://lg-chats.herokuapp.com/authenticate", userData)
      .then((response) => {
        authCtx.login(response.data.token);
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        
        setLoading(false);
        history.replace('/chatpage');
      })
      .catch((err) => {
        console.log(err);
        window.alert("Invalid username or password!");
      });
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={isLogin ? submitHandlerLogin : submitHandlerSignup}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="firstname">Your First Name</label>
            <input
              type="text"
              id="firstname"
              ref={firstName}
              required
            />
          </div>
        )}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="lastname">Your Last Name</label>
            <input
              type="text"
              id="lastname"
              ref={lastName}
              required
            />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            ref={userName}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={password}
            required
          />
        </div>

        <div className={classes.actions}>
          <button>
            {loading ? (
              <i className="fa fa-refresh fa-spin"></i>
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;