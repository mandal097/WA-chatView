import React from 'react';
import styles from './Card.module.scss';
import {
    DeleteFilled,
    UserAddOutlined
} from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../../config/axios'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../../../Loading/Loading';

const Card = ({ id, user, groupId }) => {
    // const { currentUser } = useSelector(state => state.user);
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmLoad, setConfirmLoad] = useState(false);
    const [removeLoad, setRemoveLoad] = useState(false);
    const [confirm , setComfirm] = useState('Confirm');
    const [remove , setRemove] = useState('Remove')

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
                setComfirm('Added')
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
                setRemove('Removed')
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
                            <UserAddOutlined className={styles.icon} />{confirm}
                        </>}
                </button>
                <button onClick={removeRequest}>
                    {removeLoad ? <Loading font='4rem' color="var(--text)" /> :
                        <>
                            <DeleteFilled className={styles.icon} />{remove}
                        </>}
                </button>

            </div >
        </>
    )
}

export default Card