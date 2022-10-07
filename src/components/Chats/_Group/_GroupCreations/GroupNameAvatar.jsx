import React from 'react';
import styles from './GroupNameAvatar.module.scss';
import { ArrowLeftOutlined, ArrowRightOutlined, CameraOutlined } from '@ant-design/icons';
import axios from '../../../../config/axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { removeMembers } from '../../../../redux/AddToGroup';

const GroupNameAvatar = ({ setShowCreateGroup }) => {
    const { members } = useSelector(state => state.group);
    const [groupName, setGroupName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const createGroup = async (e) => {
        e.preventDefault()
        if (!groupName) {
            toast.error("Please give name to your group ")
        }
        try {
            setLoading(true)
            const token = localStorage.getItem('token');
            const res = await axios.post('/chats/group/create-group', {
                name: groupName,
                users: members
            }, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            console.log(res.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message);
            };
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setTimeout(() => {
                    dispatch(removeMembers());
                    setShowCreateGroup(false);
                }, 1000);
            };
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    return (
        <div className={styles.group_name_avatar}>
            <ToastContainer className='toaster' />
            <div className={styles.header}>
                <div className={styles.header_wrapper}>
                    <ArrowLeftOutlined className={styles.icon} onClick={() => setShowCreateGroup(false)} />
                    <h2>New Group</h2>
                </div>
            </div>
            <div className={styles.img}>
                <img src="https://images.unsplash.com/photo-1533105045747-b9d71a0955f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YWN0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                <div className={styles.add_img}><CameraOutlined className={styles.icon} /></div>
            </div>
            <div className={styles.name}>
                <input
                    type="text"
                    placeholder='Group subject'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>
            <button onClick={createGroup}>
                {
                    loading ? "Wait... " :
                        <>
                            Create Group <ArrowRightOutlined className={styles.icon} />
                        </>
                }
            </button>
        </div>
    )
}

export default GroupNameAvatar