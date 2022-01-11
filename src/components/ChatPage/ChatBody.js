import classes from './ChatBody.module.css';
import React, { Component,useState} from "react";
import ListofContacts from './ListofContacts'
import ChatContent from '../chatsection/ChatContent'
import UserProfile from '../userProfile/UserProfile'
import Adduser from './Adduser'
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
    const setuserindex=()=>{
      setindex(-2);
    }
	return (
	<div className={classes.main__chatbody}>
        <ListofContacts adduserindex={setuserindex} setpersonfunc={setpersonfunc} curindex={index} setemailfunc={setemailfunc} setindexfunc={setindexfunc}/>
        
        {index!=-1&&index!=-2&&<ChatContent nameofperson={nameofperson} email={email} index={index}/>}
        {index===-2&&<Adduser curindex={index} setindexfunc={setindexfunc}/>}
      </div>
	)
}

export default ChatBody