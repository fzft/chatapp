import React, {useContext} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ChatAppContext } from '@/Context/ChatAppContext';
import Style from './NavBar.module.css';
import {Model, Error} from '@/Components/index';
import images from "../../assets";


 
const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "alluser"
    },
    {
      menu: "CHAT",
      link: "/"
    },
    {
      menu: "CONTACT",
      link: "/"
    },
    {
      menu: "SETTING",
      link: "/"
    },
    {
      menu: "FAQS",
      link: "/"
    },
    {
      menu: "TERMS OF USE",
      link: "/"
    },
  ]

  const [active, setActive] = React.useState(2);
  const [open, setOpen] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);

  const {account, username, connectWallet, createAccount, error} = useContext(ChatAppContext);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50}></Image>
        </div>
        <div className={Style.NavBar_box_right}>
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((item, index) => {
                return (
                  <div key={index+1} onClick={()=>setActive(index+1)} className={`Style.NavBar_box_right_menu_item ${active == index+1 ? 
                    Style.active_btn: ""}`}>
                      <Link className={Style.NavBar_box_right_menu_items_link} href={item.link}>
                        {item.menu}
                      </Link>
                    </div>
                )
            })}
          </div>
          {open && 
          (<div className={Style.mobile_menu}>
             {menuItems.map((item, index) => {
                return (
                  <div key={index+1} onClick={()=>setActive(index+1)} className={`Style.mobile_menu_item ${active == index+1 ? 
                    Style.active_btn: ""}`}>
                      <Link className={Style.mobile_menu_items_link} href={item.link}>
                        {item.menu}
                      </Link>
                    </div>
                )
            })}
            <p className={Style.mobile_menu_btn}>
              <Image src={images.close} alt="close" width={50} height={50} 
              onClick={()=>setOpen(false)}></Image>
            </p>
          </div>)}
          {/** connect wallet */}
          <div className={Style.NavBar_box_right_connect}>
            {account == ""?(
              <button className={Style.NavBar_box_right_connect_btn} onClick={connectWallet}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ): (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <Image src={username? images.accountName : images.create2} alt="Account image" width={20} height={20}>
                </Image>
                {''}
                <small>{username || "Create Account"}</small>
              </button>
            )}
          </div>
          <div className={Style.NavBar_box_right_open} onClick={()=>setOpen(true)}>
            <Image src={images.open} alt="open" width={30} height={30}></Image>
          </div>
        </div>
      </div>
      {openModel && (
        <div className={Style.modelBox}>
          <Model openBox={setOpenModel} title="WELCOME TO" head="CHAT BUDDY" info="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate maxime assumenda exercitationem voluptatibus, vero aliquid in tempore aut, impedit dolores voluptate recusandae nulla fuga? Praesentium iusto mollitia sint fugit! Placeat?"
          smallInfo="Kindley seclet your name..."
          image={images.hero}
          functionName={createAccount}
          address={account}
          >
          </Model>
        </div>
      )}
      {error == ""?"" : <Error error={error}></Error>}
    </div>
  )
}

export default NavBar

