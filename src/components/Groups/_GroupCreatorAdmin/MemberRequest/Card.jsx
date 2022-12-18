import React from 'react';
import styles from './Card.module.scss';
import {
    CheckCircleOutlined,
    CheckOutlined,
    DeleteFilled,
    UserAddOutlined
} from '@ant-design/icons';
import axios from '../../../../config/axios'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../../../Loading/Loading';
import { useDispatch } from 'react-redux';
import { updateMembers } from '../../../../redux/currentGroup';

const Card = ({ id, user, groupId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmLoad, setConfirmLoad] = useState(false);
    const [removeLoad, setRemoveLoad] = useState(false);
    const [confirm, setComfirm] = useState(false);
    const [remove, setRemove] = useState(false)

    const confirmRequest = async () => {
        setConfirmLoad(true);
        try {
            const res = await axios.put(`/groups/handle-members-request/confirm-r/${groupId}`, {
                requestedId: id
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setConfirmLoad(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setConfirmLoad(false);
                setComfirm(true)
                setTimeout(() => {
                    dispatch(updateMembers(id))
                }, 1000);
            }
            console.log(res);
        } catch (error) {
            setConfirmLoad(false)
            toast.error('Something went wrong');
        }
    }
    const removeRequest = async () => {
        try {
            setRemoveLoad(true);
            const res = await axios.put(`/groups/handle-members-request/remove-r/${groupId}`, {
                requestedId: id
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setRemoveLoad(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setRemoveLoad(false);
                setRemove(true)
            }
        } catch (error) {
            toast.error('Something went wrong');
            setRemoveLoad(false)
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
                <button onClick={confirmRequest}>
                    {confirmLoad ? <Loading font='4rem' color="var(--text)" /> :
                        <>
                            {
                                confirm ?
                                    <>
                                        < CheckOutlined className={styles.icon} />Confirmed
                                    </>
                                    : <>
                                        <UserAddOutlined className={styles.icon} />Confirm
                                    </>
                            }
                        </>
                    }
                </button>
                <button onClick={removeRequest}>
                    {removeLoad ? <Loading font='4rem' color="var(--text)" /> :
                        <>
                            {remove ?
                                <>
                                    <CheckCircleOutlined className={styles.icon} />Removed
                                </>
                                : <>
                                    <DeleteFilled className={styles.icon} />Remove
                                </>
                            }
                        </>
                    }
                </button>

            </div >
        </>
    )
}

export default Card