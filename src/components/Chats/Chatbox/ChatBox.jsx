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
import Loading from '../../Loading/Loading';

const ChatBox = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentChat, chatId } = useSelector((state) => state.chat);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState({});
    const socket = useRef()


    useEffect(() => {
        socket.current = socketInit();
            socket.current.on('getMessage', (data) => {
                console.log(data);
                setArrivalMessage({
                    sender: data.sender?._id,
                    content: data.content,
                    createdAt: Date.now()
                })
            })
    }, []);

    useEffect(() => {
        socket.current.emit('addUsers', currentUser._id)
    }, [currentUser])

    // socket io
    useEffect(() => {
            arrivalMessage &&
                !Object.values(currentUser)?.includes(String(arrivalMessage.sender?._id)) &&
                setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentUser])


    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage) {
            toast.error('Please write a message')
        } else {
            socket.current.emit('sendMessage', {
                sender: currentUser._id,
                receiverId: currentChat._id,
                content: newMessage
            })

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
                setMessages([...messages, res.data.data])
                setNewMessage('');
            }
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.get(`/message/${chatId}`, {
                headers: {
                    token: `Bearer ${token}`
                },
            });
            setMessages(res.data.data);
            setLoading(false);
        }
        fetchMessages();
    }, [chatId]);





    if (currentChat === null) return <Default />
    if (loading) return <Loading font='8rem' />
    return (
        <>
            {/* {currentChat === null ? < Default /> : */}
            <div className={styles.chat_box}>
                <ToastContainer className='toaster' />
                {/* ---------------------------all messages--------------------------------*/}
                <div className={styles.chats}>
                    {messages.length === 0 && <h1 style={{ fontSize: '2rem', textAlign: 'center', marginTop: '5rem' }}>No chats found with this user<br />Start chatting... 🖖🖖🖖 </h1>}
                    {
                        messages?.map(m => (
                            <Message key={m?._id}
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
            {/* } */}
        </>
    )
}

export default ChatBox