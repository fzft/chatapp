import React, {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Style from './Card.module.css';
import images from "../../../assets";


export default function Card({readMessage, friend, i, readUser}) {
  return (
    <Link href={{pathname:'/',query: {name: `${friend.name}`, address: `${friend.pubkey}`}}}>
      <div className={Style.Card} onClick={()=>(readMessage(friend.pubkey), readUser(friend.pubkey))}>
        <div className={Style.Card_box}>
          <div className={Style.Card_box_left}>
            <Image src={images.accountName} alt="username" width={50} height={50} className={Style.Card_box_left_img}></Image>
          </div>
          <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>
              <h4>{friend.name}</h4>
              <small>{friend.pubkey.slice(21)}...</small>
            </div>
            <div className={Style.Card_box_right_end}>
              <small>{i+1}</small>
            </div>
          </div>
          </div>
      </div>
    </Link>
  )
}
