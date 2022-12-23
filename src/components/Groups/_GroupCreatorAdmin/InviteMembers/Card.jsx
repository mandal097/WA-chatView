import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { CheckOutlined, DeleteFilled, MessageFilled, UserAddOutlined } from '@ant-design/icons';
import axios from '../../../../config/axios';
import { setCurrentChat } from '../../../../redux/chatRedux';
import { useDispatch, useSelector } from 'react-redux';
import { pushMembersInvites } from '../../../../redux/currentGroup';
import Loading from '../../../Loading/Loading';
import { groupActivityLogs } from '../../../../helpers/groupActivities';

const Card = ({ user, currentGroup }) => {
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inviteLoading, setInviteLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    const [removed, setRemoved] = useState(false) //for showing removed message in button
    const [invited, setInvited] = useState(false) //for showing invite message in button

    useEffect(() => {
        if (currentGroup?.membersInvited.includes(user?._id)) {
            setInvited(true)
        } else {
            setInvited(false)
        }
    }, [currentGroup, user?._id])

    const startChat = async () => {
        const res = await axios.post('/chats/create-chat', {
            userId: user?._id
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
    };

    const inviteUserForMember = async () => {
        try {
            setInviteLoading(true);
            const res = await axios.put(`/groups/handle-members/invite-member/${currentGroup?._id}`, {
                memberId: user?._id
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setInviteLoading(false);
            }
            if (res.data.status === 'success') {
                // setInvited(true)
                dispatch(pushMembersInvites(user._id))
                toast.success(res.data.message);
                setInviteLoading(false);
                groupActivityLogs(currentGroup?._id, `invites ${user?.name} for member.`)
            }
        } catch (error) {
            toast.error('Something went wrong')
            setInviteLoading(false);
        }
    };
    const cancelInviteUserForMember = async () => {
        try {
            setCancelLoading(true);
            const res = await axios.put(`/groups/handle-members/cancel-member-invite/${currentGroup?._id}`, {
                memberId: user?._id
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setCancelLoading(false);
            }
            if (res.data.status === 'success') {
                dispatch(pushMembersInvites(user._id))
                toast.success(res.data.message);
                setCancelLoading(false);
                setRemoved(true);
                groupActivityLogs(currentGroup?._id, `remove ${user?.name} from member invite.`)
                setTimeout(() => {
                    setInvited(false);
                }, 300);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setCancelLoading(false);
        }
    };

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
                <button onClick={startChat}> <MessageFilled className={styles.icon} /> Message</button>
                <button onClick={inviteUserForMember} className={`${invited && styles.active}`}>
                    {inviteLoading
                        ?
                        <Loading font='4rem' color='var(--text)' />
                        :
                        invited ?
                            <>
                                <CheckOutlined className={styles.icon} />Invited
                            </>
                            :
                            <>
                                <UserAddOutlined className={styles.icon} />Invite
                            </>
                    }
                </button>

                {
                    invited &&
                    <button className={styles.cancel} onClick={cancelInviteUserForMember}>
                        {cancelLoading
                            ?
                            <Loading font='4rem' color='var(--text)' />
                            :
                            removed ?
                                <>
                                    <CheckOutlined className={styles.icon} />Removed
                                </>
                                :
                                <>
                                    <DeleteFilled className={styles.icon} />
                                </>
                        }
                    </button>
                }

            </div >
        </>
    )
}

export default Card