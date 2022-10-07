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
import { useSelector, useDispatch } from 'react-redux';
import AddToGroup from '../../components/Chats/_Group/_GroupCreations/AddToGroup';
import { setCurrentChatInitial } from '../../redux/chatRedux';
import GroupList from '../../components/Chats/_Group/GroupList/GroupList';


const Message = () => {
  const [newConverstations, setNewConverstations] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showGroupList, setShowGroupList] = useState(false);
  const { currentChat } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
            <h4 style={{fontSize:'1.4rem'}}>{currentUser.name.split(' ')[0]}</h4>
            <div className={styles.actions}>
              <button><HistoryOutlined /></button>
              <button onClick={() => {
                setNewConverstations(true);
                setShowGroupList(false);
              }}><PlusOutlined /></button>
              <button onClick={() => {
                setShowGroupModal(!showGroupModal)
                dispatch(setCurrentChatInitial())
              }}><MoreOutlined /></button>
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
          <div className='icon' onClick={() => {
            setShowGroupList(!showGroupList);
          }}><AlignCenterOutlined /></div>
        </div>

        {showGroupModal
          ? <AddToGroup setShowGroupModal={setShowGroupModal} /> :
          showGroupList ? <GroupList /> :
            newConverstations ? <NewConverstations setNewConverstations={setNewConverstations} />
              : <Converations setNewConverstations={setNewConverstations} />
        }
        {/* {showGroupList && <GroupList />}
        {showGroupList && <GroupList />}
        {newConverstations && <NewConverstations />}
        {showGroupList && <GroupList />} */}
        {/* ------------------------------------group creations------------------------------------ */}
      </div>



      {/* ------------------------------------ right side------------------------------------- */}

      <div className={styles.right}>
        {
          currentChat &&
          <div className={styles.right_header}>
            <div className={styles.right_header_wrapper}>
              <div className={styles.img}>
                <img src={
                  currentChat?.isGroupChat === true ?
                    currentChat?.groupAvatar : currentChat.profilePic
                } alt="profile pic" />
              </div>
              <div className={styles.details}>
                <h4 className={styles.chat_name}>{
                  currentChat?.isGroupChat === true ?
                    currentChat.chatName : currentChat.name
                }
                </h4>
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