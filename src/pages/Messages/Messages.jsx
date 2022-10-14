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
  TeamOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  // DownOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import AddToGroup from '../../components/Chats/_Group/_GroupCreations/AddToGroup';
import { setCurrentChatInitial } from '../../redux/chatRedux';
import GroupList from '../../components/Chats/_Group/GroupList/GroupList';
import GroupInfo from '../../components/Chats/_Group/GroupInfo/GroupInfo';


const Message = () => {
  const [newConverstations, setNewConverstations] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showGroupList, setShowGroupList] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
            <h4 style={{ fontSize: '1.4rem' }}>{currentUser.name.split(' ')[0]}</h4>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='icon' onClick={() => {
            setShowGroupList(!showGroupList);
          }}><TeamOutlined /></div>
        </div>

        {showGroupModal
          ? <AddToGroup setShowGroupModal={setShowGroupModal} searchTerm={searchTerm} />
          : showGroupList ? <GroupList searchTerm={searchTerm} />
            : newConverstations ? <NewConverstations setNewConverstations={setNewConverstations} searchTerm={searchTerm} />
              : <Converations setNewConverstations={setNewConverstations} searchTerm={searchTerm} />
        }
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
              <div className={styles.details} onClick={() => {
                currentChat?.isGroupChat === true &&
                  setShowInfo(true)
              }
              }>
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

      {
        showInfo && currentChat?.isGroupChat === true &&
        <GroupInfo setShowInfo={setShowInfo} currentChat={currentChat} />
      }

    </div>
  )
}

export default Message