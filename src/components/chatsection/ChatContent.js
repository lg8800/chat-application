import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  chatActiveContact,
  chatMessages,
  loggedInUser,
} from "../../atom/globalState";
import "./chatContent.css";
import Avatar from "../ChatPage/Avatar";
import ChatItem from "./ChatItem";
import axios from "axios";
import { message } from "antd";

var stompClient = null;
var token = null;

const ChatContent = (props) => {
  const currentUser = useRecoilValue(loggedInUser);
  const [messages, setMessages] = useRecoilState(chatMessages);
  const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      token = localStorage.getItem("token");
      connect();
      loadContacts();
    }
  }, []);

  useEffect(() => {
    if (activeContact === undefined) {
      return;
    }
    const url =
      "http://localhost:8081/messages/" +
      activeContact.id +
      "/" +
      currentUser.id;
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer" + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      });
  }, [activeContact]);

// id
// _id

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8081/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log("connected");
    console.log(currentUser);
    stompClient.subscribe(
      "/user/" + currentUser.id + "/queue/messages",
      onMessageReceived
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    const active = JSON.parse(
      sessionStorage.getItem("recoil-persist")
    ).chatActiveContact;

    if (active.id === notification.senderId) {
      const url =
        "http://localhost:8081/messages/" +
        currentUser.id +
        "/" +
        notification.id;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer" + token,
          },
        })
        .then((message) => {
          const newMessages = JSON.parse(
            sessionStorage.getItem("recoil-persist")
          ).chatMessages;
          console.log(message.data);
          newMessages.push(message.data);
          setMessages(newMessages);
        });
    } else {
      message.info("Received a new message from " + notification.senderName);
    }
  };

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: currentUser.id,
        recipientId: activeContact.id,
        senderName: currentUser.name,
        recipientName: activeContact.name,
        content: msg,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));
      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    }
  };

  const loadContacts = () => {
    axios
      .get("http://localhost:8081/users/", {
        headers: {
          Authorization: "Bearer" + token,
        },
      })
      .then((response) => {
        setContacts(response.data);
      });
  };

  return <div>Hello</div>;

  // return (
  // <div className="main__chatcontent">
  //   <div className="content__header">
  //     <div className="blocks">
  //       <div className="current-chatting-user">
  //         <Avatar
  //           isOnline="active"
  //           image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
  //         />
  //         <p>{props.nameofperson}</p>
  //       </div>
  //     </div>

  //     <div className="blocks">
  //       <div className="settings">
  //         <button className="btn-nobg">
  //           <i className="fa fa-cog"></i>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  //   <div className="content__body">
  //     <div className="chat__items">
  //       {chatstate.map((itm, index) => {
  //         return (
  //           <ChatItem
  //             animationDelay={index + 2}
  //             key={index}
  //             user={itm.type ? itm.type : "me"}
  //             msg={itm.msg}
  //             image={itm.image}
  //           />
  //         );
  //       })}
  //       <div ref={messagesEndRef} />
  //     </div>
  //   </div>
  //   <div className="content__footer">
  //     <div className="sendNewMessage">
  //       <button className="addFiles">
  //         <i className="fa fa-plus"></i>
  //       </button>
  //       <input
  //         type="text"
  //         placeholder="Type a message here"
  //         onChange={changeinstate}
  //         value={messagestate}
  //       />
  //       <button className="btnSendMsg" id="sendMsgBtn" onClick={sendMessage}>
  //         <i className="fa fa-paper-plane"></i>
  //       </button>
  //     </div>
  //   </div>
  // </div>
  // );
};

export default ChatContent;
