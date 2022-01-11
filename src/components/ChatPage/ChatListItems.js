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
  const setindexfun=(e)=>{
    console.log("curindex");
    console.log(props.curindex);
    console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
  if(props.curindex!==-2)
  {
    setactiveclass(true);
    props.setindexfunc(props.index);
  }
  else 
  {
    console.log("ADING USER TO DB----------------");
    console.log(e.target.innerText);
    console.log(props.index);//index of user in all users array selected to be added 
    //add to db of currentuser 
    props.setindexfunc(-1);
  }
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
          
        </div>
      </div>
    );
  }
 export default ChatListItems