import React, { Component,useState,useEffect } from "react";
import Avatar from "./Avatar";
import './ListofContacts.css'
import ChatContent from "../chatsection/ChatContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'
const ChatListItems=(props)=> {  
  const [activeclass,setactiveclass]=useState(false);
  
  const setindexfun=(e)=>{
  
  if(props.curindex!==-2)
  {
    setactiveclass(true);
    props.setindexfunc(props.index);
    props.setindexwithname({username:props.userName,firstName:props.name,lastName:props.lastName})
  }
  else 
  {
   
    props.setindexfunc(-1);
  }
  }
  const handleuserdeletefunc=()=>{
    props.setdeleteuserid(props.index);
  }
  const handlesubmission=(e)=>{
    //props.setpersonfunc
    props.setpersonfunc(e);
    props.setindexwithname({username:props.userName,firstName:props.name,lastName:props.lastName});
  }
    return (
      <div className={`chatlist__item ${props.curindex===props.index ? "active" : ""} `} 
      >
        <Avatar
          image={
            props.image ? props.image : "http://placehold.it/80x80"
          }
          isOnline={props.isOnline}
        />
        
        <div className="userMeta"  onClick={setindexfun}>
        
          <p style={{color:"white"}} onClick={handlesubmission}>{props.name.toUpperCase()}</p>
          

          
       
        </div>
      </div>
    );
  }
 export default ChatListItems