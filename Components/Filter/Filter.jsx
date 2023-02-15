import React, {useContext, useState} from 'react';
import Image from 'next/image';

import Style from './Filter.module.css';
import images from "../../assets";
import { ChatAppContext } from '@/Context/ChatAppContext';
import { Model } from '..';

export default function Filter() {
  const {account, addFriend} = useContext(ChatAppContext);
  const [addFriendFlag, setAddFriendFlag] = useState(false);

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="search" width={20} height={20}>
            </Image>
            <input type="text" placeholder="Search.."></input>
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20}></Image>
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriendFlag(true)}>
            <Image src={images.clear} alt="clear" width={20} height={20}></Image>
            Add FRIEND
          </button>
        </div>
      </div>
      {addFriendFlag && (
        <div className={Style.Filter_model}>
          <Model 
          openBox={setAddFriendFlag}
          title="WELCOME TO"
          head="CHAT BUDDY"
          info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
          smallInfo="Kindly Select Your Friend Name & Address.."
          image={images.hero}
          functionName={addFriend}>
          </Model>
        </div>
      )}
    </div>
  )
}
