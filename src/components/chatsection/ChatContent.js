import React, { Component, useState, useRef,createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../ChatPage/Avatar";
import ChatItem from "./ChatItem";
const chatItms = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ];
const ChatContent=()=> {
  
  const messagesEndRef = useRef(null);
  
  const [messagestate,setmessagestate]=useState('');
  const [chatstate,setchatstate]=useState(chatItms);
  const scrollToBottom = () => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom()
  }, [chatstate]);

  
  const changeinstate = (e) => {
    setmessagestate(e.target.value);
  };
  
   const sendmessage=()=>{
    if (messagestate != "") {
          chatItms.push({
            key: 1,
            type: "",
            msg: messagestate,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          });
        
          setchatstate([...chatItms]);
          console.log(chatItms);
          scrollToBottom();
          setmessagestate('');
        }
        scrollToBottom();
  }
  
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>Tim Hover</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {chatstate.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              
              type="text"
              placeholder="Type a message here"
              onChange={changeinstate}
              value={messagestate}
            />
            <button className="btnSendMsg" id="sendMsgBtn" onClick={sendmessage}>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

export default ChatContent;