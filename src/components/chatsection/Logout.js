import React, { useState, useEffect,useContext,useRef} from "react";
import classes from "./chatContent.module.css";
import AuthContext from '../store/auth-context'

const Logout = () => {
    const authCtx = useContext(AuthContext);
    const logouthandler=()=>{
    authCtx.logout();
  }
  return (
 <div className={classes.main__chatcontent}>
     <div className={classes.content__header}>
       <div className={classes.blocks}>
        <div className={classes['current-chatting-user']}>
          
        </div>
       </div>
       <div className={classes.blocks}>
         <div className={classes.settings}>
          <button className={classes['btn-nobg']} onClick={logouthandler}>
             LOGOUT
           </button>
           
         </div>
       </div>
     </div>
     </div>
     )};
  export default Logout;
