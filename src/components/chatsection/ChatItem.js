import React, { Component } from "react";
import Avatar from "../ChatPage/Avatar";
import classes from "./chatContent.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'

const ChatItem=(props)=> {
        
         const printidofselectedmsg=()=>{
          props.setdeletemsgid(props.id);
         //delete this id msg from database using this id
         }    
    if(props.deletemsgid===props.id)
    {
      console.log("match milgya");
      
    }
    return (
      <div className={`${classes.chat__item} ${props.sender!==props.currentUser? classes.other:" "}`}>
        <div className={classes.chat__item__content}>
          <div className={classes.chat__msg}>
          {props.msg}
          <button onClick={printidofselectedmsg}>
        <FontAwesomeIcon icon={faTrash}/>
        </button>
          </div>
          <div className={classes.chat__meta}>
            
            <span>TIME</span>
          </div>
        </div>
        
        <Avatar isOnline="active" image={props.image} />

      </div>
    );
  
}
export default ChatItem;
