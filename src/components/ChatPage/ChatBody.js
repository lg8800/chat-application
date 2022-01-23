import classes from './ChatBody.module.css';
import React, { Component,useState,useEffect} from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  chatActiveContact,
  chatMessages,
  loggedInUser,
} from "../../atom/globalState";
import ListofContacts from './ListofContacts'
import ChatContent from '../chatsection/ChatContent'
import UserProfile from '../userProfile/UserProfile'
import Adduser from './Adduser'
import Logout from '../chatsection/Logout'
const ChatBody=()=> {

	const [nameofperson,setnameofperson]=useState('');
   const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const [index,setindex]=useState(-1);
  const [email,setemail]=useState('');
  const[updatecontacts,setupdatecontacts]=useState({username:'',firstName:'',lastName:''});
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
    useEffect(() => {
     if(index===-2)
     {
      
      setActiveContact({name:' ',email:' '});
     }
    }, [index])
	return (
	<div className={classes.main__chatbody}>
        <ListofContacts updatecontacts={updatecontacts} adduserindex={setuserindex} setpersonfunc={setpersonfunc} curindex={index} setemailfunc={setemailfunc} setindexfunc={setindexfunc}/>
        {index===-1&&<Logout />}
        
        {index!=-1&&index!=-2&&<ChatContent nameofperson={nameofperson} email={email} index={index}/>}
        {index===-2&&<Adduser curindex={index} setindexfunc={setindexfunc} setupdatecontacts={setupdatecontacts}/>}
        
      </div>
	)
}

export default ChatBody