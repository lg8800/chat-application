import { useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
   const submithandler=(e)=>{
   e.preventDefault();
   }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onsubmit={submithandler}>
        {!isLogin &&
        <div className={classes.control}>
        <label htmlFor='firstname'>Your First Name</label>
          <input type='text' id='firstname' required />
        </div>
      }
       {!isLogin &&
        <div className={classes.control}>
        <label htmlFor='lastname'>Your Last Name</label>
          <input type='text' id='lastname' required />
        </div>
      }
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
        </div>
        
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;