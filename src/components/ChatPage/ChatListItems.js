import React, { Component,useState,useEffect } from "react";
import Avatar from "./Avatar";
import './ListofContacts.css'
import ChatContent from "../chatsection/ChatContent";
const ChatListItems=(props)=> {  
  const [activeclass,setactiveclass]=useState(false);
  console.log("----------------------");
  console.log(props.curindex);
  console.log(props.index);
  console.log("----------------------");
  const setindexfunc=()=>{
    setactiveclass(true);
    props.setindexfunc(props.index);
  }
    return (
      <div 
        
        
        className={`chatlist__item ${props.curindex===props.index ? "active" : ""} `}
      >
        <Avatar
          image={
            props.image ? props.image : "http://placehold.it/80x80"
          }
          isOnline={props.isOnline}
        />
        
        <div className="userMeta"  onClick={setindexfunc}>
          <p onClick={props.setpersonfunc}>{props.name.toUpperCase()}</p>
          
        </div>
      </div>
    );
  }
 export default ChatListItems