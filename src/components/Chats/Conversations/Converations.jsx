import React, { useEffect } from 'react';
import styles from './Conversations.module.scss';
import ChatsCard from '../FriendsCard/FriendsCard';
import axios from '../../../config/axios';
import { useState } from 'react';

const Converations = () => {
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        const fetchChats = async () => {
            const token = localStorage.getItem('token')
            const res = await axios.get('/chats/get-chats', {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            setConversations(res.data.data)
        }
        fetchChats()
    }, [])

    return (
        <div className={styles.conversations}>
            {
                conversations.map((conv) => (
                    <ChatsCard key={conv._id} conv={conv} type='existedChat'/>
                ))
            }
        </div>
    )
}

export default Converations