import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.scss';
import {
    SmileOutlined,
    PaperClipOutlined,
    AudioOutlined, SendOutlined
} from '@ant-design/icons';
import Message from '../Message/Message';
import { data } from './dummydata';
import Default from './Default';

const ChatBox = ({currentChat}) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);   
    const scrollRef = useRef();

    useEffect(() => {
        setMessages(data)
    }, []);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [newMessage]);

    return (
        <>
            {!currentChat ? < Default /> :
                <div className={styles.chat_box}>
                    {/* ---------------------------all messages--------------------------------*/}
                    <div className={styles.chats} ref={scrollRef}>
                        {
                            messages.map(m => (
                                <Message key={m.id} own={m.own} message={m.text} />
                            ))
                        }
                    </div>

                    {/* ---------------------------sending message form  */}

                    <div className={styles.form}>
                        <div className={styles.left}>
                            <button><SmileOutlined /></button>
                            <button><PaperClipOutlined /></button>
                        </div>
                        <div className={styles.input}>
                            <input
                                type="text"
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                        </div>
                        <div className={styles.right}>
                            {
                                newMessage === ""
                                    ? <button><AudioOutlined /></button>
                                    : <button style={{ color: 'var(--successLight)' }} ><SendOutlined /></button>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ChatBox