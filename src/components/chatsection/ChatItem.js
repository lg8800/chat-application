import React, { Component } from "react";
import Avatar from "../ChatPage/Avatar";
import classes from "./chatContent.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'

const ChatItem=(props)=> {
        
         const printidofselectedmsg=()=>{
          props.setdeletemsgid(props.id);
         //delete this id msg from database using this id
         }    
    if(props.deletemsgid===props.id)
    {
      
      
    }
    let p=props.timestamp.toString().substr(11,11);
    let hours=parseInt(p.substr(0,2))+5;
    let min=parseInt(p.substr(3,5))+30;
    if(min>=60)
    {
      hours++;
      min-=60;
    }
    if(hours>=24)
    {
      hours=0;
    }
    let y=hours;
    let monthname;
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "November", "December"];
    if(isNaN(props.timestamp.toString().charAt(0))===false)
    {
      let mon=parseInt(props.timestamp.toString().substr(5,2));
      if(mon.toString().charAt(0)===0)
      { 
        monthname=months[mon%10-1];
      }
      else 
      {
      monthname=months[mon%10-1];
      }
    }
    let yp='';
    let mainhours='';
    if(min.toString().length===1)
    {
       yp+='0';
       yp+=min.toString();
    }
    else 
    {
      yp+=min.toString();
    } 
     if(hours.toString().length===1)
    {
       mainhours+='0';
       mainhours+=hours.toString();
    }
    else 
    {
      mainhours+=hours.toString();
    } 

    return (
      <div className={`${classes.chat__item} ${props.sender!==props.currentUser? classes.other:" "}`}>
        <div className={classes.chat__item__content}>
          <div className={classes.chat__msg}>
          {props.msg}
         
          </div>
          <div className={classes.chat__meta}>
          {isNaN(props.timestamp.toString().charAt(0))===false&&<div style={{marginRight:"5px"}}>{mainhours}:{yp}</div>}
            {isNaN(props.timestamp.toString().charAt(0))===false&&<div>{props.timestamp.toString().substr(8,2)}{' '}{monthname}{' '}{props.timestamp.toString().substr(0,4)}</div>}
            
            
            {
              isNaN(props.timestamp.toString().charAt(0))===true&&
            <span>{props.timestamp.toString().substr(3,13)}</span>
            
            }
             {
              isNaN(props.timestamp.toString().charAt(0))===true&&
               <span>&nbsp;&nbsp;&nbsp;{props.timestamp.toString().substr(16,5)}</span>
            
            }
           

            
          
            
          </div>
        </div>
        
        

      </div>
    );
  
}
export default ChatItem;
