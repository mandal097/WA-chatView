import React, { useState, useEffect } from 'react';
import Converations from '../../components/Chats/Conversations/Converations';
import NewConverstations from '../../components/Chats/NewConversations/NewConverstations';
import styles from './Message.module.scss';
import ChatBox from '../../components/Chats/Chatbox/ChatBox';
import {
  PlusOutlined,
  HistoryOutlined,
  MoreOutlined,
  SearchOutlined,
  AlignCenterOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  // DownOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';


const Message = () => {
  const [newConverstations, setNewConverstations] = useState(false);
  const { currentChat } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('scroll', () => {
        if (window.scroll < 0) {
          window.scrollY({ top: 30 })
        }
      })
    }, 2000);
  }, [])

  return (
    <div className={styles.messages}>

      {/* ------------------------------------ left side------------------------------------- */}

      <div className={styles.left}>

        <div className={styles.left_header}>
          <div className={styles.left_header_wrapper}>
            <div className={styles.profile}>
              <img src={currentUser?.profilePic} alt="" />
            </div>
            <div className={styles.actions}>
              <button><HistoryOutlined /></button>
              <button onClick={() => setNewConverstations(true)}><PlusOutlined /></button>
              <button><MoreOutlined /></button>
            </div>
          </div>
        </div>

        {/* ------------------------------------ search------------------------------------- */}

        <div className={styles.search}>
          <div className={styles.search_box}>
            <div className='icon'><SearchOutlined color={'green'} /></div>
            <input
              type="text"
              placeholder='Search or start new chat'
            />
          </div>
          <div className='icon'><AlignCenterOutlined /></div>
        </div>

        {newConverstations
          ? <NewConverstations setNewConverstations={setNewConverstations} />
          : <Converations setNewConverstations={setNewConverstations} />
        }
      </div>


      {/* ------------------------------------ right side------------------------------------- */}

      <div className={styles.right}>
        {
          currentChat &&
          <div className={styles.right_header}>
            <div className={styles.right_header_wrapper}>
              <div className={styles.img}>
                <img src={currentChat?.profilePic} alt="profile pic" />
              </div>
              <div className={styles.details}>
                <h4 className={styles.chat_name}>{currentChat?.name}</h4>
                <p>Lorem, ipsum dolor sit amet consecteturoluptatibus consequuntur alias iusto quasi dolores? Vel.</p>
              </div>
              <div className={styles.actions}>
                <button><VideoCameraOutlined /></button>
                <button><PhoneOutlined /></button>
                <button><SearchOutlined /></button>
                <button><MoreOutlined /></button>
              </div>
            </div>
          </div>
        }
        <ChatBox currentChat={currentChat} />
      </div>
      {/* {
        showBtn &&
        <button className={styles.to_bottom} ><DownOutlined /></button>
      } */}
    </div>
  )
}

export default Message