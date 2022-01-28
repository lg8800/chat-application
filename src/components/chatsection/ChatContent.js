import React, { useState, useEffect,useContext,useRef} from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  chatActiveContact,
  chatMessages,
  loggedInUser,
} from "../../atom/globalState";
 import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import classes from "./chatContent.module.css";
import Avatar from "../ChatPage/Avatar";
import AuthContext from '../store/auth-context'
import ChatItem from "./ChatItem";
import axios from "axios";
import { message } from "antd";
import {PushToTalkButton,PushToTalkButtonContainer,ErrorPanel} from '@speechly/react-ui'
import {useSpeechContext} from '@speechly/react-client'
var stompClient=null;
var counter=0;
const ChatContent = (props) => {
   const messagesEndRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const currentUser = useRecoilValue(loggedInUser);
  const[deletemsgid,setdeletemsgid]=useState(-1);
  const [messagestate,setmessagestate]=useState('');
  const [messages, setMessages] = useRecoilState(chatMessages);
  const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const [contacts, setContacts] = useState([]);
  const {segment} =useSpeechContext();
  
  useEffect(() => {
    return () => {
      
    };
  }, [])
  useEffect(() => {
    
  }, [messages])
    
  useEffect(() => {
   if (localStorage.getItem("token") !== null) {
    stompClient==null&&connect();
  }
  }, [authCtx.isLoggedIn])
  useEffect(() => {
    if (localStorage.getItem("token") !== null&&props.index!=-1) {
   setActiveContact({name:props.nameofperson,email:authCtx.users[props.index].username})
  }
  }, [props.nameofperson,props.index])
  useEffect(() => {
    if (activeContact === undefined) {
      return;
    }
    const url =
      "https://chat-lg.azurewebsites.net/messages/" +
      activeContact.email +
      "/" +
      currentUser.username;
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer" + authCtx.token,
        },
      })
      .then((response) => {
        
        setMessages(response.data);
      });
  }, [activeContact.name,deletemsgid]);
   const scrollToBottom = () => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom()
  }, [messages]);
  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("https://chat-lg.azurewebsites.net/ws");
    stompClient=Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + currentUser.username + "/queue/messages",
      onMessageReceived
    );
  };
  const onError = (err) => {
    window.alert("YES");
    
  };
  const changeinstate = (e) => {
    setmessagestate(e.target.value);
  };
  const onMessageReceived = (msg) => {
  
    const notification = JSON.parse(msg.body);
    const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
      .chatActiveContact;
    
    if (active.email === notification.senderId) {
      const url =
        "https://chat-lg.azurewebsites.net/messages/" +
        notification.senderId +
        "/" +
        currentUser.username
        ;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer" + authCtx.token,
          },
        })
        .then((message) => {
          // const newMessages = JSON.parse(
          //   sessionStorage.getItem("recoil-persist")
          // ).chatMessages;
         
        setMessages(message.data);
         
          
          scrollToBottom();
        });
    } else {
     
      toast.info('Received a new message from ' + notification.senderName, {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
    
    
    }
  };
 
  const sendMessage = () => {
    if (messagestate.trim() !== "") {
      
     
      const message = {
        senderId: currentUser.username,
        recipientId: activeContact.email,
        senderName: currentUser.firstName,
        recipientName: activeContact.name,
        content: messagestate,
        timestamp:new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));
      
      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);

      scrollToBottom();
      setmessagestate('');
    }
    else 
    {
      window.alert("Cant submit empty message");//khaali msg not allowed
    }
  };
  const logouthandler=()=>{
    authCtx.logout();
  }
  useEffect(()=>{
    if(deletemsgid!=-1)
    {
    }
  },[deletemsgid])
  
  useEffect(() => {
    if(segment&&segment.isFinal)
    {
      setmessagestate((prev)=>prev+" "+segment.words.map((w)=>w.value).join(" "));
    }
  }, [segment])
  const profilesectionhandler=()=>{
    //take to profile page of this person (props.nameofperson)
    props.setindexfunc(-3);
  }
     return (
 <div className={classes.main__chatcontent}>
     <div className={classes.content__header}>
       <div className={classes.blocks}>
        <div className={classes['current-chatting-user']}>
          <Avatar
           isOnline="active"
           image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
          />
           <div onClick={profilesectionhandler}>{props.nameofperson}</div>
           
        </div>
       </div>

       <div className={classes.blocks}>
         <div className={classes.settings}>
          <button className={classes['btn-nobg']} onClick={logouthandler}>
             LOGOUT
           </button>
           
         </div>
       </div>
     </div>
     <div className={classes.content__body}>
       <div className={classes.chat__items}>
         {messages.map((itm, index) => {

           return (
          <ChatItem
          key={index}
         animationDelay={index + 2}
               id={itm.id}
               user={itm.type ? itm.type : "me"}
               msg={itm.content}
               timestamp={itm.timestamp}
               sender={itm.senderId}
               currentUser={currentUser.username}
               setdeletemsgid={setdeletemsgid}
               deletemsgid={deletemsgid}
            />

          );
         })}

         <div ref={messagesEndRef} />
       </div>
     </div>
     <div className={classes.content__footer}  >
       <div className={classes.sendNewMessage}>
        
         <input
           type="text"
          placeholder="Type a message here"
           onChange={changeinstate}
           value={messagestate}
        />

      
        <PushToTalkButton intro="PUSH TO TALK" tapToTalkTime="60000" size="2.5rem" />
        
        
        <button className={classes.btnSendMsg} id="sendMsgBtn" onClick={sendMessage}>
           <i className="fa fa-paper-plane"></i>
         </button>
       </div>
     </div>
     


   </div>
   );
 };

export default ChatContent;
