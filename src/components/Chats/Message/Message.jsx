import React, { useEffect, useRef } from 'react';
import styles from './Message.module.scss';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

const Message = ({ message }) => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentChat } = useSelector((state) => state.chat);
    const scrollRef = useRef();


    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message]);

    const own = Object.values(message?.sender).includes(currentUser?._id);
    return (
        <div className={`${styles.message} ${own && styles.own}`} ref={scrollRef}>
            <div className={styles.img}>
                {
                    currentChat.isGroupChat === true
                        ? <img src={own ? currentUser?.profilePic : message?.sender?.profilePic} alt='profile' />
                        : <img src={own ? currentUser?.profilePic : currentChat?.profilePic} alt='profile' />
                }
            </div>
            <div className={`${styles.new_message}  ${own && styles.own_newmessage}`}>
                {
                    currentChat.isGroupChat && !own && <div className={styles.name}>{message.sender.name.split(' ')[0]}</div>
                }
                <p>{message?.content}</p>
                <div className={` ${own ? styles.own_till : styles.till}`}></div>
            </div>
            <div className={` ${own ? styles.own_time : styles.time}`}>{format(message.createdAt)}</div>
        </div>
    )
}

export default Message