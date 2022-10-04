import React from 'react';
import styles from './NewConversations.module.scss';
import ChatsCard from '../FriendsCard/FriendsCard';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import { useState } from 'react';
import { useEffect } from 'react';

const NewConverstations = ({ setNewConverstations }) => {
    const [allUser, setAllUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('/user/get-all-users', {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAllUser(res.data.data);
        }
        fetchUser();
    }, [])
    return (
        <div className={styles.new_conversations}>
            <div className={styles.btn_wrapper}>
                <button onClick={() => setNewConverstations(false)}>
                    <ArrowLeftOutlined className={styles.icon} />
                    <span>Go to chats</span>
                </button>
            </div>
            {
                allUser.map(user => (
                    <ChatsCard key={user._id} type='newchat' newUser={user} setNewConverstations={setNewConverstations} />
                ))
            }
        </div>
    )
}

export default NewConverstations