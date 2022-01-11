
import React, { useEffect,Component,useState,useContext} from "react";
import axios from "axios";
import classes from "./AddContacts.module.css";
import ChatListItems from './ChatListItems'
import 'font-awesome/css/font-awesome.min.css';
import AuthContext from '../store/auth-context'
const allChatUsers = [
    
  ];
const Adduser=(props)=> {
  const authCtx = useContext(AuthContext);
  const [allChats,setallChats]=useState(allChatUsers);
  const [searchval,setsearchval]=useState('');
  
  const setsearchvalfunc=(e)=>{
      console.log(e.target.value);
      setsearchval(e.target.value);
  }
  const submithandler=(e)=>{
    
    e.preventDefault();

    //search for email represented by searchval in database of all users
    const url =
      "https://chat-lg.azurewebsites.net/user/" +
       searchval
    axios
      .get(url)
      .then((response) => {

        console.log(response.data);
        //setMessages(response.data);
      });
    console.log("submitting form");
    setsearchval('');

  }
    return (
      <div className={classes.main__chatlist}>
       
        <div className={classes.chatlist__heading}>
          <h2>Search All Users</h2>
          <button className={classes.btnnobg}>
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <form>
        <div className={classes.form} >
        <div className={classes.chatList__search}>
          <div className={classes.search_wrap}>
            <input type="email" placeholder="Search Here" value={searchval} onChange={setsearchvalfunc} required />
            <button className={classes.searchbtn}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
       
       <button className={classes.display} onClick={submithandler} >SUBMIT</button>
       
       </div>
       </form>
     
      </div>
    );
  }
  export default Adduser;