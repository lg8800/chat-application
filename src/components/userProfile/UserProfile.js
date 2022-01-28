import React, { Component } from "react";
import "./userProfile.css";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  chatActiveContact,
  chatMessages,
  loggedInUser,
} from "../../atom/globalState";
const UserProfile=(props)=> {
  const submithandler=()=>{
    //add karo props.user ko
    console.log("submit handler");
    console.log(props.curindex);
    
    props.updatecontacts(props.user);
  }
  
  const currentUser = useRecoilValue(loggedInUser);
  console.log("ffkf");
  console.log(props.user);
  console.log("ffkf");
    return (
      <div className="main__userprofile">

        <div className="profile__card classes.user__profile__image">
          <div className="profile__image">
            <img src="https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg" />
          </div>
          <div>
          <h4>{props.user.firstName}</h4>
          <h4>{props.user.lastName}</h4>  
          </div>        
        </div>

        {props.curindex===-2&&<button className={"buttonflex"} onClick={submithandler}>ADD USER TO CONTACTS</button>}
       
      </div>
    );
  }
               
  export default UserProfile;                        