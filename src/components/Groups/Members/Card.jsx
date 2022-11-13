import React, { useState } from 'react';
import styles from './Card.module.scss';
import {
    UserAddOutlined,
    MessageFilled
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { followFriend } from '../../../redux/userRedux';
import axios from '../../../config/axios'
import { toast, ToastContainer } from 'react-toastify';
import { setCurrentChat } from '../../../redux/chatRedux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Card = ({ id }) => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await axios.get(`/user/get-profile/${id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (res.data.status === 'err') {
                    toast.error(res.data.message)
                    // setLoading(false)
                }
                if (res.data.status === 'success') {
                    setUser(res.data.data)
                }
            } catch (error) {
                toast.error('Something went wrong')
            }
        }
        fetchUser();
    }, [id])

    console.log(user);

    const followUsers = async (e) => {
        e.preventDefault()
        dispatch(followFriend(id))
        try {
            const res = await axios.put('/user/connections/follow', { friendId: id }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }


    const startChat = async () => {
        const res = await axios.post('/chats/create-chat', {
            userId: id
        }, {
            headers: {
                token: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const filter = res.data.data[0]?.users.find((c) => c._id !== currentUser._id);
        dispatch(setCurrentChat({ currentChat: filter, chatId: res.data.data[0]._id }));
        if (filter) {
            navigate('/messenger');
        }
    }

    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.user_card}>
                <div className={styles.img}>
                    <img src={user?.profilePic} alt="" />
                </div>
                <div className={styles.details}>
                    <span onClick={() => navigate(`/profile/${user._id}`)}>
                        {user.name}
                    </span>
                </div>
                {!currentUser.followings?.includes(user._id)
                    ? String(user._id) !== String(currentUser._id) && <button onClick={followUsers} > <UserAddOutlined className={styles.icon} /> Follow</button>
                    : <button onClick={startChat}> <MessageFilled className={styles.icon} /> Message</button>
                }
            </div >
        </>
    )
}

export default Card