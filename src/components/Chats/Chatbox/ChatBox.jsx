import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.scss';
import {
    SmileOutlined,
    PaperClipOutlined,
    AudioOutlined, SendOutlined
} from '@ant-design/icons';
import Message from '../Message/Message';
import Default from './Default';
import { useSelector } from 'react-redux';
import axios from '../../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import socketInit from '../../../socket/index';

const ChatBox = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentChat, chatId } = useSelector((state) => state.chat);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const socket = useRef()

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage) {
            toast.error('Please write a message')
        } else {
            const token = localStorage.getItem('token')
            const res = await axios.post('/message', {
                chatId: chatId,
                content: newMessage
            }, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                setNewMessage('');
            }
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get(`/message/${chatId}`, {
                headers: {
                    token: `Bearer ${token}`
                },
            });
            setMessages(res.data.data);
        }
        fetchMessages();
    }, [chatId]);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    // socket io
    useEffect(() => {
        socket.current = socketInit();
        socket.current.emit('addUsers', currentUser._id)
    }, [currentUser])

    return (
        <>
            {currentChat === null ? < Default /> :
                <div className={styles.chat_box}>
                    <ToastContainer className='toaster' />
                    {/* ---------------------------all messages--------------------------------*/}
                    <div className={styles.chats} ref={scrollRef}>
                        {
                            messages.map(m => (
                                <Message key={m._id}
                                    message={m}
                                />
                            ))
                        }
                    </div>

                    {/* ---------------------------sending message form  */}

                    <form onSubmit={sendMessage} className={styles.form}>
                        <div className={styles.left}>
                            <button><SmileOutlined /></button>
                            <button><PaperClipOutlined /></button>
                        </div>
                        <div className={styles.input}>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                        </div>
                        <div className={styles.right}>
                            {
                                newMessage === ""
                                    ? <button><AudioOutlined /></button>
                                    : <button style={{ color: 'var(--successLight)' }} type='submit' ><SendOutlined /></button>
                            }
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default ChatBox