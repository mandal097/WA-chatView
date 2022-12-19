import React, { useEffect, useState } from 'react';
import styles from './GroupInvites.module.scss';
import {
    CheckOutlined,
    DeleteFilled,
    DeleteOutlined,
    QqOutlined
} from '@ant-design/icons';
import axios from '../../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../Loading/Loading';
import { Link } from 'react-router-dom'

const Card = ({ ele }) => {
    const [accepted, setAccepted] = useState(false)
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    // console.log(ele);

    const acceptInvite = async () => {
        try {
            setAcceptLoading(true);
            const res = ele?.role === 'member_request' ?
                await axios.put(`/groups/${ele?.groupId?._id}/accept-member-invite`, {}, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                }) :
                await axios.put(`/groups/${ele?.groupId?._id}/accept-admin-invite`, {}, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            // console.log(res.data.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
                setAcceptLoading(false);
            }
            if (res.data.status === 'success') {
                toast.success(`${res.data.message} / Refresh page to show changes`);
                setAcceptLoading(false);
                setAccepted(true)
                console.log(res.data);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setAcceptLoading(false);
        }
    };
    const cancelInvite = async () => {
        try {
            setCancelLoading(true);
            const res = await axios.put(`/groups/${ele?.groupId?._id}/cancel-admin-invite`, {}, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
                setCancelLoading(false);
            }
            if (res.data.status === 'success') {
                toast.success(`${res.data.message} / Refresh page to show changes`);
                setCancelLoading(false);
                setCancelled(true)
                console.log(res.data);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setCancelLoading(false);
        }
    };
    return (
        <div className={styles.card}>
            <ToastContainer className='toaster' />
            <div className={styles.img}>
                <img src={ele?.groupId?.groupCoverImg} alt="group_image" />
            </div>
            <div className={styles.details}>
                <Link className={styles.link} to={`/groups/${ele?.groupId?._id}`}>
                    <h1>
                        {ele?.groupId?.groupName}
                    </h1>
                </Link>
                <div className={styles.sender_details}>
                    <Link className={styles.link} to={`/profile/${ele?.invitedBy?._id}`}>
                        <img src={ele?.invitedBy?.profilePic} alt="admin_pic" />
                        {ele?.invitedBy?.name}{' '}
                    </Link>
                    <p>
                        invite you to be the
                        {ele?.role === 'admin_request' ? ' admin ' : ' member '}
                        of this group</p>
                </div>
            </div>
            <div className={styles.btns}>
                {!accepted ?
                    <button onClick={acceptInvite}>
                        {acceptLoading ? <Loading font='4rem' color='var(--text)' /> :
                            <>
                                <CheckOutlined className={styles.icon} /> {' Confirm'}
                            </>}
                    </button>
                    : <button onClick={() => toast.error('Already accepted')} className={styles.accepted}><CheckOutlined className={styles.icon} />Accepted</button>
                }
                {
                    !cancelled
                        ? <button onClick={cancelInvite}>
                            {cancelLoading ? <Loading font='4rem' color='var(--text)' /> :
                                <>
                                    <DeleteOutlined className={styles.icon} /> {' Cancel'}
                                </>}
                        </button>
                        : <button className={styles.cancelled}>  <DeleteFilled className={styles.icon} /> {' Cancelled'}</button>
                }
            </div>
        </div>
    )
}

const GroupInvites = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchList = async () => {
            setLoading(true);
            const res = await axios.get(`/groups/invited-users`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
                setLoading(false);
            }
            if (res.data.status === 'success') {
                setList(res.data.data.groupInvites)
                setLoading(false);
            }
            // console.log(res.data);
        }
        fetchList()
    }, [])
    return (
        <div className={styles.group_invites}>
            <div className={styles.head}>
                <h1>Group Invites</h1>
            </div>
            <div className={styles.sections}>
                {loading && <Loading font='10rem' color='var(--text)' />}
                {
                    list?.map((ele) => (
                        <Card
                            key={ele._id}
                            ele={ele}
                        />
                    ))
                }
                {list?.length === 0 && <div className={styles.no_invites}>
                    <QqOutlined className={styles.icon} />
                    <span>No invites yet</span>
                </div>}
            </div>
        </div>
    )
}

export default GroupInvites