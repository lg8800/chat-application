
import React, { useEffect,Component,useState,useContext} from "react";
import axios from "axios";
import classes from "./AddContacts.module.css";
import ChatListItems from './ChatListItems'
import 'font-awesome/css/font-awesome.min.css';
import AuthContext from '../store/auth-context'
import UserProfile from '../userProfile/UserProfile'
import { useRecoilValue, useRecoilState } from "recoil";
import {
  chatActiveContact,
  chatMessages,
  loggedInUser,
} from "../../atom/globalState";
const allChatUsers = [
    
  ];

  
const Adduser=(props)=> {
  
  
  const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const [user,setuser]=useState({username:'',firstName:'',lastName:''});
  const authCtx = useContext(AuthContext);
  const [allChats,setallChats]=useState(allChatUsers);
  const [searchval,setsearchval]=useState('');
  const [nodata,setnodata]=useState(false);
  const setsearchvalfunc=(e)=>{
      
      setsearchval(e.target.value);
  }
  
  const submithandler=(e)=>{
    
    e.preventDefault();

     if(searchval.includes('@')&&searchval.includes('.com'))
     {
    //search for email represented by searchval in database of all users
    
    const url =
      "https://chat-lg.azurewebsites.net/user/" +
       searchval
    axios
      .get(url)
      .then((response) => {
       
        if(response.data)
        {
          
          setuser({username:response.data.username,firstName:response.data.firstName,lastName:response.data.lastName});

        }
        else
        {
          setnodata(true);
        }
       
        
      });
   
    setsearchval('');
  }
  else 
  {
    alert("ADD CORRECT EMAIL ADDRESS");
    return;
  }

  }
  const updatecontacts=(e)=>{
    props.setupdatecontacts({username:e.username,firstName:e.firstName,lastName:e.lastName});
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
            <button className={classes.searchbtn} onClick={submithandler}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
       
       
       </div>
       </form>

       {user.username.length>0&&<UserProfile setindexfunc={props.setindexfunc} curindex={props.curindex} user={user} updatecontacts={updatecontacts}/>}
       {user.username.length===0&&nodata&&<div> No user found </div>}
      </div>
    );
  }
  export default Adduser;