import React, {useState, useContext} from 'react'
import Image from 'next/image';

import Style from './Friend.module.css';
import images from "../../assets";
import Card from './Card/Card';
import Chat from './Chat/Chat';

import {ChatAppContext} from '@/Context/ChatAppContext';

export default function Friend() {
  const {readMessage, sendMessage, friendMsg, account, friendLists, username, loading, currentUsername, currentUserAddress, readUser} = useContext(ChatAppContext);
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendLists.map((friend, index) => {
            return <Card key={index + 1} friend={friend} i={index} readMessage={readMessage} readUser={readUser}/>
          })}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat functionName={sendMessage} readMessage={readMessage}
           friendMsg={friendMsg} account={account} username={username} loading={loading} 
           currentUsername={currentUsername} currentUserAddress={currentUserAddress}
           ></Chat>
          </div>
      </div>
    </div>
  )
}
