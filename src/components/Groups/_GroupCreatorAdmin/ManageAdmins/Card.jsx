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
import { CheckOutlined, DeleteFilled, MessageFilled, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import PopUp from './PopUp';
import { pullAdminInvites } from '../../../../redux/currentGroup';
import { groupActivityLogs } from '../../../../helpers/groupActivities';

const Card = ({ userId, requested, currentAdmin }) => {
    const { currentUser } = useSelector(state => state.user);
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [loading, setLoading] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [type, setType] = useState('')
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cancelLoad, setCancelLoad] = useState(false); //for showing loading when cancelling invite
    const [cancelled, setCancelled] = useState(false);  //for cancelled message after cancelling invite

    const [removed, setRemoved] = useState(false) //for showing removed message in button
    const [invited, setInvited] = useState(false) //for showing invite message in button

    useEffect(() => {
        if (currentGroup?.adminsInvited.includes(userId)) {
            setInvited(true)
        } else {
            setInvited(false)
        }
    }, [currentGroup, userId])

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
                    // console.log(res);
                }
            } catch (error) {
                setLoading(false)
            }

        }
        fetchDetails()
    }, [userId]);

    useEffect(() => {
        if (currentGroup?.adminsInvited?.includes(user?._id)) {
            setInvited(true)
        }
    }, [currentGroup, user])


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
    };

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


    const cancelInvite = async (e) => {
        try {
            setCancelLoad(true);
            const res = await axios.put(`/groups/handle-admins/cancel-invite/${currentGroup?._id}`, {
                memberId: userId
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.success(res.data.message)
                setCancelLoad(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setCancelLoad(false);
                setCancelled(true);
                groupActivityLogs(currentGroup?._id, `remove ${user?.name} from admin invite.`)
                setTimeout(() => {
                    dispatch(pullAdminInvites(userId))
                }, 2000);
            }
        } catch (error) {
            toast.error('something went wrong')
            setCancelLoad(false);
        }
    };



    if (loading) return <Loading font='5rem' color='var(--text)' />
    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.user_card}>
                <div className={styles.img}>
                    <img src={user?.profilePic} alt="" />
                </div>
                <div style={{ marginRight: 'auto' }} className={styles.details}>
                    <span

                        onClick={() => navigate(`/profile/${user._id}`)}>
                        {user?.name}
                    </span>
                </div>
                {requested ?
                    <button onClick={cancelInvite}
                        style={{ marginLeft: 'auto' }}
                        className={`${styles.remove} ${cancelLoad && styles.removed_}`}
                    >
                        {cancelLoad ? <Loading font='4rem' color='var(--text)' /> :
                            cancelled ?
                                <>
                                    <CheckOutlined className={styles.icon} /> {' Removed'}
                                </>
                                :
                                <>
                                    <DeleteFilled className={styles.icon} /> {' Cancel'}
                                </>
                        }
                    </button>
                    : <>
                        {!currentUser.followings?.includes(user._id)
                            ? String(user._id) !== String(currentUser._id) && <button onClick={followUsers} > <UserAddOutlined className={styles.icon} /> Follow</button>
                            : <button onClick={startChat}> <MessageFilled className={styles.icon} /> Message</button>
                        }
                        {!currentGroup?.admins.includes(user._id) &&
                            <button button style={{ marginLeft: '0' }}
                                className={` ${invited && styles.invited_}`}
                                onClick={() => {
                                    setType('admin')
                                    setShowPop(true)
                                }}>
                                {invited
                                    ? <>
                                        <CheckOutlined className={styles.icon} />Invited
                                    </>
                                    : <>
                                        <PlusOutlined className={styles.icon} />Invite
                                    </>
                                }
                            </button>}

                        {!currentGroup?.admins.includes(user._id) &&
                            <button button
                                className={`${styles.remove} ${removed && styles.removed_}`}
                                onClick={() => {
                                    setType('delete')
                                    setShowPop(true);
                                }}>
                                {removed ? 'Removed' : <DeleteFilled className={styles.icon} />}
                            </button>
                        }
                    </>}

                {
                    String(userId) !== String(currentUser?._id) &&
                    currentGroup?.admins.includes(userId) &&
                    currentAdmin &&
                    <button button
                        className={`${styles.remove} ${removed && styles.removed_}`}
                        onClick={() => {
                            setType('removeAdmin')
                            setShowPop(true)
                        }}>
                        {removed ? 'Removed' : <DeleteFilled className={styles.icon} />}
                    </button>
                }
            </div >
            {
                showPop &&
                <PopUp
                    showPop={showPop}
                    setShowPop={setShowPop}
                    groupId={currentGroup?._id}
                    type={type}
                    setRemoved={setRemoved}
                    setInvited={setInvited}
                    user={user}
                />
            }
        </>
    )
}

export default Card