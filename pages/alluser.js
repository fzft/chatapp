import React, {useEffect, useState, useContext} from 'react';

import { UserCard } from '@/Components';
import Style from '../styles/alluser.module.css';
import { ChatAppContext } from '@/Context/ChatAppContext';


export default function alluser() {
    const {userLists, addFriend} = useContext(ChatAppContext);
  return (
    <div>
        <div className={Style.alluser_info}>
            <h1>Find your Friends</h1>
        </div>
        <div className={Style.alluser}>
            {userLists.map((user, index) => {
                return <UserCard key={index + 1} user={user} i={index} addFriend={addFriend}/>
            })}
        </div>
    </div>
  )
}
