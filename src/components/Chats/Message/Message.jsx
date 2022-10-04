import React from 'react';
import styles from './Message.module.scss';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

const Message = ({ message }) => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentChat } = useSelector((state) => state.chat);

    const own = Object.values(message.sender).includes(currentUser?._id)

    return (
        <div className={`${styles.message} ${own && styles.own}`}>
            <div className={styles.img}>
                <img src={own ? currentUser?.profilePic : currentChat?.profilePic} alt='profile' />
            </div>
            <div className={`${styles.new_message}  ${own && styles.own_newmessage}`}>
                <p>{message?.content}</p>
                <div className={` ${own ? styles.own_till : styles.till}`}></div>
            </div>
            <div className={` ${own ? styles.own_time : styles.time}`}>{format(message.createdAt)}</div>
        </div>
    )
}

export default Message