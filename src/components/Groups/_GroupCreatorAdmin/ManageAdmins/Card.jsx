import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
// import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from '../../../../config/axios';
import Loading from '../../../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../../../../redux/chatRedux';
import { followFriend } from '../../../../redux/userRedux';
import { DeleteFilled, MessageFilled, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import PopUp from './PopUp';

const Card = ({ userId }) => {
    const { currentUser } = useSelector(state => state.user);
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [loading, setLoading] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [type, setType] = useState('')
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/user/get-profile/${userId}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'success') {
                    setUser(res.data.data)
                    setLoading(false)
                    console.log(res);
                }
            } catch (error) {
                setLoading(false)
            }

        }
        fetchDetails()
    }, [userId]);



    const followUsers = async (e) => {
        e.preventDefault()
        dispatch(followFriend(userId))
        try {
            const res = await axios.put('/user/connections/follow', { friendId: userId }, {
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
            userId: userId
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



    if (loading) return <Loading font='5rem' color='var(--text)' />
    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.user_card}>
                <div className={styles.img}>
                    <img src={user?.profilePic} alt="" />
                </div>
                <div className={styles.details}>
                    <span onClick={() => navigate(`/profile/${user._id}`)}>
                        {user?.name}
                    </span>
                </div>
                {!currentUser.followings?.includes(user._id)
                    ? String(user._id) !== String(currentUser._id) && <button onClick={followUsers} > <UserAddOutlined className={styles.icon} /> Follow</button>
                    : <button onClick={startChat}> <MessageFilled className={styles.icon} /> Message</button>
                }
                {!currentGroup?.admins.includes(user._id) &&
                    <button button style={{ marginLeft: '0' }} onClick={() => {
                        setType('admin')
                        setShowPop(true)
                    }}> <PlusOutlined className={styles.icon} />Invite</button>}

                {!currentGroup?.admins.includes(user._id) &&
                    <button button
                        className={styles.remove}
                        onClick={() => {
                            setType('delete')
                            setShowPop(true);
                        }}> <DeleteFilled className={styles.icon} /></button>}
            </div >
            {
                showPop &&
                <PopUp
                    showPop={showPop}
                    setShowPop={setShowPop}
                    type={type}
                    user={user}
                />
            }
        </>
    )
}

export default Card