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
  }
  else 
  {
   
    props.setindexfunc(-1);
  }
  }
  const handleuserdeletefunc=()=>{
    props.setdeleteuserid(props.index);
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
        
          <p style={{color:"white"}} onClick={props.setpersonfunc}>{props.name.toUpperCase()}</p>
          
           <button onClick={handleuserdeletefunc}>
        <FontAwesomeIcon icon={faTrash}/>
        </button>
        </div>
      </div>
    );
  }
 export default ChatListItems