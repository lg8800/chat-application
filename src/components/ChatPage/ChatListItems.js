import React, { Component } from "react";
import Avatar from "./Avatar";
import './ListofContacts.css'
import ChatContent from "../chatsection/ChatContent";
const ChatListItems=(props)=> {
  
  
    
    return (
      <div
        style={{ animationDelay: `0.${props.animationDelay}s` }}
        onClick={props.setpersonfunc}
        className={`chatlist__item ${
          props.active ? props.active : ""
        } `}
      >
        <Avatar
          image={
            props.image ? props.image : "http://placehold.it/80x80"
          }
          isOnline={props.isOnline}
        />

        <div className="userMeta">
          <p>{props.name}</p>
          
        </div>
      </div>
    );
  }
 export default ChatListItems