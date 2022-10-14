import React, { useEffect } from 'react';
import styles from './Conversations.module.scss';
import ChatsCard from '../FriendsCard/FriendsCard';
import axios from '../../../config/axios';
import { useState } from 'react';
import Loading from '../../Loading/Loading';

const Converations = ({ searchTerm }) => {
    const [conversations, setConversations] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true)
            const token = localStorage.getItem('token')
            const res = await axios.get('/chats/get-chats', {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            setConversations(res.data.data)
            setLoading(false)
        }
        fetchChats()
    }, []);




    useEffect(() => {
        const search = conversations?.filter(conv => conv.users.some(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())));
        setSearchedUsers(search);
    }, [searchTerm, conversations])


    if (loading) return <Loading font='7rem' />
    return (
        <div className={styles.conversations}>
            {searchTerm ?
                searchedUsers?.map((conv) => (
                    <ChatsCard key={conv._id} conv={conv} type='existedChat' />
                )) :
                conversations.map((conv) => (
                    <ChatsCard key={conv._id} conv={conv} type='existedChat' />
                ))
            }
        </div>
    )
}

export default Converations