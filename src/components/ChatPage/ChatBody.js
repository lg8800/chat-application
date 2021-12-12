import classes from './ChatBody.module.css';
import React from 'react'
import ListofContacts from './ListofContacts'
import ChatContent from '../chatsection/ChatContent'
import UserProfile from '../userProfile/UserProfile'
const ChatBody=()=> {
	return (
	<div className={classes.main__chatbody}>
        <ListofContacts/>
        
        <ChatContent/>
        <UserProfile/>
      </div>
	)
}

export default ChatBody