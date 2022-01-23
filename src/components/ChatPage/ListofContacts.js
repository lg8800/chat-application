
import React, { useEffect,Component,useState,useContext} from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  chatActiveContact,
  chatMessages,
  loggedInUser,
} from "../../atom/globalState";
import classes from "./ListofContacts.module.css";
import ChatListItems from './ChatListItems'
import 'font-awesome/css/font-awesome.min.css';
import AuthContext from '../store/auth-context'
const allChatUsers = [
  ];
const ChatList=(props)=> {
  
        
        
        
  const authCtx = useContext(AuthContext);
  const currentUser = useRecoilValue(loggedInUser);
 
  const [allChats,setallChats]=useState(allChatUsers);
  const [deleteuserid,setdeleteuserid]=useState(-1);
  const [searchval,setsearchval]=useState('');
   const loadContacts = () => {
    axios
      .get("https://chat-lg.azurewebsites.net/contacts/"+currentUser.username, {
        headers: {
          Authorization: "Bearer" + authCtx.token,
        },
      })
      .then((response) => {
       
        setallChats(response.data);
        authCtx.setuserhandler(response.data);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      loadContacts();

    }
  }, [authCtx.isLoggedIn]);
  const setsearchvalfunc=(e)=>{
      setsearchval(e.target.value);
  }
  const addnewuser=()=>{
    props.adduserindex();
  }
 
 useEffect(()=>{
  if(props.updatecontacts.username.length>0)
  {
  
  var j=0;
  for(var i=0;i<allChats.length;i++)
  {
    if(allChats[i].username===props.updatecontacts.username)
    {
      j=1;
      break;
    }
  }
 
   //paste the func of adding to the database the props.updateuser and the call loadcontacts();
   if(j===0)
   {
    axios
      .post("https://chat-lg.azurewebsites.net/contacts/"+currentUser.username,props.updatecontacts)
      .then((response) => {
        
      
        props.setindexfunc(-1);
       loadContacts();
      })
      .catch((err) => {
       window.alert(err.message);
      });
    }
    else 
    {
      window.alert("user already exists");
       props.setindexfunc(-1);
    }

    }
    },[props.updatecontacts]);
 useEffect(()=>{
   if(deleteuserid!=-1)
   {
   }
 },[deleteuserid])
    return (
      <div className={classes.main__chatlist}>
        <button className={classes.btn} onClick={addnewuser}>
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>
        <div className={classes.chatlist__heading}>
          <h2>List of Contacts</h2>
          <button className={classes.btnnobg}>
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className={classes.chatList__search}>
          <div className={classes.search_wrap}>
            <input type="text" placeholder="Search Here" onChange={setsearchvalfunc} required />
            <button className={classes.searchbtn}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className={classes.chatlist__items}>
          {allChats.length>0&&allChats.filter((val)=>{
            if(searchval===""){
              return val
            } else if(val.firstName.toLowerCase().includes(searchval.toLowerCase())){
              return val
            }
          }).map((item, index) => {
            return (
              <ChatListItems
                setpersonfunc={props.setpersonfunc}
                key={index}
                setindexfunc={props.setindexfunc}
                name={item.firstName}
                userName={item.username}
                curindex={props.curindex}   
                index={index}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
                deleteuserid={deleteuserid}
                setdeleteuserid={setdeleteuserid}
              />
            );
          })}

        </div>
      </div>
    );
  }
  export default ChatList;