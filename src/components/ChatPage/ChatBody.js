import classes from './ChatBody.module.css';
import React, { Component,useState} from "react";
import ListofContacts from './ListofContacts'
import ChatContent from '../chatsection/ChatContent'
import UserProfile from '../userProfile/UserProfile'
const ChatBody=()=> {
	const [nameofperson,setnameofperson]=useState('');
  const [index,setindex]=useState(-1);
  const [email,setemail]=useState('');
  const setindexfunc=(e)=>{
    setindex(e);
  }
	  const setpersonfunc=(e)=>{
      setnameofperson(e.target.innerText);
    }
    const setemailfunc=(e)=>{
      setemail(e.target.innerText);
    }
	return (
	<div className={classes.main__chatbody}>
        <ListofContacts setpersonfunc={setpersonfunc} setemailfunc={setemailfunc} setindexfunc={setindexfunc}/>
        
        {index!=-1&&<ChatContent nameofperson={nameofperson} email={email} index={index}/>}
        
      </div>
	)
}

export default ChatBody