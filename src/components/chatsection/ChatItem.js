import React, { Component } from "react";
import Avatar from "../ChatPage/Avatar";
import classes from "./chatContent.module.css"
const ChatItem=(props)=> {
    

    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`${classes.chat__item} ${props.user ? props.user : ""}`}
      >
        <div className={classes.chat__item__content}>
          <div className={classes.chat__msg}>{props.msg}</div>
          <div className={classes.chat__meta}>
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>
        <Avatar isOnline="active" image={props.image} />
      </div>
    );
  
}
export default ChatItem;
