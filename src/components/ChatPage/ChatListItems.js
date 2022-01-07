import React, { Component } from "react";
import Avatar from "./Avatar";
import './ListofContacts.css'
import ChatContent from "../chatsection/ChatContent";
const ChatListItems=(props)=> {  
  const setindexfunc=()=>{
    props.setindexfunc(props.index);
  }
    return (
      <div
        style={{ animationDelay: `0.${props.animationDelay}s` }}
        
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

        <div className="userMeta" onClick={setindexfunc}>
          <p onClick={props.setpersonfunc}>{props.name}</p>
          <p onClick={props.setemailfunc}>{props.userName}</p>
        </div>
      </div>
    );
  }
 export default ChatListItems