import classes from './ChatBody.module.css';
import React, { Component,useState} from "react";
import ListofContacts from './ListofContacts'
import ChatContent from '../chatsection/ChatContent'
import UserProfile from '../userProfile/UserProfile'
const ChatBody=()=> {
	const [nameofperson,setnameofperson]=useState('');
	  const setpersonfunc=(e)=>{
      setnameofperson(e.target.innerText);
    }
	return (
	<div className={classes.main__chatbody}>
        <ListofContacts setpersonfunc={setpersonfunc}/>
        
        <ChatContent nameofperson={nameofperson}/>
        <UserProfile nameofperson={nameofperson}/>
      </div>
	)
}

export default ChatBody