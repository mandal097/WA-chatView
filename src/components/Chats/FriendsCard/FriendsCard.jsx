import React, { useState } from 'react';
import styles from './FriendsCard.module.scss';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '../../../redux/chatRedux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import {capitalizeFirstLetter} from '../../../helpers/strings';

const NewConvCard = ({ conv, type, newUser, setNewConverstations }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user)
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (type === 'existedChat') {
      const filter = conv.users.find((c) => c._id !== currentUser._id)
      setDetails(filter);
    }
  }, [currentUser, conv, type]);


  const startChat = () => {
    dispatch(setCurrentChat({ currentChat: details, chatId: conv._id }))
  }

  const startNewChat = async () => {
    const res = await axios.post('/chats/create-chat', {
      userId: newUser._id
    }, {
      headers: {
        token: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data.status === 'err') {
      toast.error(res.data.message);
    }
    if (res.data.status === 'success') {
      toast.success(res.data.message);
      setTimeout(() => {
        setNewConverstations(false)
      }, 1200);

    }
  }

  return (
    <>
      <ToastContainer className='toaster' />
      {
        type === 'existedChat' ? (

          <div className={styles.chat_card} onClick={startChat}>
            <div className={styles.img}>
              <img src={details?.profilePic} alt='profile pic' />
            </div>
            <span className={styles.name}>{capitalizeFirstLetter(details?.name)}</span>
          </div>
        ) : (
          <div className={styles.chat_card} onClick={startNewChat}>
            <div className={styles.img}>
              <img src={newUser?.profilePic} alt='profile pic' />
            </div>

            <span className={styles.name}>{capitalizeFirstLetter(newUser?.name)}</span>
          </div>
        )
      }
    </>
  )
}

export default NewConvCard;