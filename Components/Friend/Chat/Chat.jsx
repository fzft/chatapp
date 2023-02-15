import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Style from './Chat.module.css';
import images from "../../../assets";
import { convertTime } from '@/Utils/apiFeature';
import { Loader } from '@/Components';


export default function Chat({functionName, readMessage, friendMsg, account, username, loading, currentUsername, currentUserAddress}) {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({name: "", address: ""});
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
  }, [router.isReady])

  useEffect(() => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  }, []);

  return (
    <div className={Style.Chat}>
      {currentUsername && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
            <Image src={images.accountName} alt="image" width={70} height={70}></Image>
            <div className={Style.Chat_user_info_box}>
              <h4>{currentUsername}</h4>
              <p className={Style.show}>
                {currentUserAddress}
              </p>
            </div>
           </div>
      ):("")}
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsg.map((msg, index) => {
              return ( <div key={index +1 }>
                  {msg.sender === chatData.address ? (
                     <div className={Style.Chat_box_left_title}>
                      <Image src={images.accountName} alt="image" width={50} height={50}></Image>
                      <span>
                        {chatData.name} {""} 
                        <small>Time: {convertTime(msg.timestamp)}</small>
                      </span>
                    </div>
                  ):(
                    <div className={Style.Chat_box_left_title}>
                    <Image src={images.accountName} alt="image" width={50} height={50}></Image>
                    <span>
                      {username} {""} 
                      <small>Time: {convertTime(msg.timestamp)}</small>
                    </span>
                  </div>
                  )}
                  <p key={index+1}>{msg.msg}
                  {""}
                  {""}
                  </p>
              </div>
            )})}
          </div>
        </div>
        {currentUsername && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={50} height={50} />
              <input type="text" placeholder="Type a message" value={message} onChange={(e)=>setMessage(e.target.value)} />
              <Image src={images.file} alt="file" width={50} height={50} />
              {
                loading == true ? (
                  <Loader/>
                ): (
                  <Image src={images.send} alt="send" width={50} height={50} onClick={()=>functionName({message: message, address: chatData.address})} />
                )
              }
            </div>
          </div>
        ):("")}
      </div>
    </div>
  )
}
