import React, {useContext} from 'react'
import Image from 'next/image'

import Style from './Model.module.css'
import images from "../../assets";
import { ChatAppContext } from '@/Context/ChatAppContext';
import { Loader } from '..';

export default function Model({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName,}) {
    const [name, setName] = React.useState("");
    const [accountAddress, setAccountAddress] = React.useState("");

    const {loading} = useContext(ChatAppContext);
  return (
    <div className={Style.Model}>
        <div className={Style.Model_box}>
          <div className={Style.Model_box_left}>
            <Image src={image} alt="buddy" width={700} height={700}></Image>
          </div>
          <div className={Style.Model_box_right}>
            <h1>
              {title} <span>{head}</span>
            </h1>
            <p>{info}</p>
            <small>{smallInfo}</small>

            {
              loading == true? (
                <Loader/>
              ): (
<div className={Style.Model_box_right_name}>
              <div className={Style.Model_box_right_name_info}>
                <Image src={images.username} alt="user" width={30} height={30}></Image>
                <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}></input>
              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image src={images.account} alt="account" width={30} height={30}></Image>
                <input type="text" placeholder={address||"Enter address..."} value={accountAddress} onChange={(e)=>setAccountAddress(e.target.value)}></input>
              </div>
              <div className={Style.Model_box_right_name_btn}>
              <button onClick={() => functionName({name, accountAddress} )}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
                </button>
                <button onClick={() => openBox(false)}>
                  {""}
                  <Image src={images.close} alt="close" width={30} height={30}></Image>
                  {""}
                  Cancle
                </button>
              </div>
            </div>
              )}
          </div>
        </div>
      </div>
  )
}

