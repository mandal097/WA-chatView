import React from 'react';
import styles from './NewConversations.module.scss';
import ChatsCard from '../FriendsCard/FriendsCard';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../../Loading/Loading';

const NewConverstations = ({ setNewConverstations,searchTerm}) => {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            const res = await axios.get('/user/get-all-users', {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAllUser(res.data.data);
            setLoading(false);
        }
        fetchUser();
    }, []);


    useEffect(() => {
        const search = allUser.filter((user) => {
            if (searchTerm === '') {
                return user
            } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return user
            }
            return false;
        });
        setSearchedUsers(search);
        console.log(search);
    }, [searchTerm, allUser])

    
    if (loading) return <Loading />
    return (
        <div className={styles.new_conversations}>
            <div className={styles.btn_wrapper}>
                <button onClick={() => setNewConverstations(false)}>
                    <ArrowLeftOutlined className={styles.icon} />
                    <span>Go to chats</span>
                </button>
            </div>
            {searchTerm ?
                searchedUsers?.map((user) => (
                    <ChatsCard key={user._id} newUser={user}  type='newchat' searchTerm={searchTerm} />
                )):
                allUser.map(user => (
                    <ChatsCard key={user._id} type='newchat' newUser={user} setNewConverstations={setNewConverstations} />
                ))
            }
        </div>
    )
}

export default NewConverstations