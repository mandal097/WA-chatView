import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatInfo.module.scss';
import {
    ArrowLeftOutlined,
    EditFilled,
    UserAddOutlined,
    ExportOutlined,
    CheckOutlined,
    LoadingOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import axios from '../../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { setCurrentChatInitial } from '../../../redux/chatRedux';

const ChatInfo = ({ setShowInfo }) => {
    const [showInput, setShowInput] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const { currentChat,chatId } = useSelector(state => state.chat)

    const renameGroup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const token = localStorage.getItem('token');
            const res = await axios.put('/chats/group/rename-group', { chatId: chatId, chatName: groupName }, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                // setLoading(false)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                console.log(res.data);
                setGroupName('')
                setShowInput(false);
                dispatch(renameGroup({ name: res.data.data.chatName }));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }


    const deleteGroup = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`/chats/group/delete/${chatId}`, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                dispatch(setCurrentChatInitial())
                window.location.reload();
            }
        } catch (error) {
            setLoading(false)
        }
    }




    useEffect(() => {
        const checkClick = (e) => {
            if (showInput && !inputRef.current.contains(e.target)) {
                setShowInput(false)
            }
        }
        document.addEventListener('mousedown', checkClick);

        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [showInput])



    return (
        <div className={styles.info}>
            <ToastContainer className='toaster' />
            <div className={styles.info_header}>
                <h3 className={styles.heading}>
                    <ArrowLeftOutlined className={styles.icon} onClick={() => setShowInfo(false)} /> Group info</h3>
            </div>
            <div className={styles.body}>
                <div className={styles.img_div}>
                    <div className={styles.img}>
                        <img src={currentChat.groupAvatar} alt="" />
                    </div>
                    {
                        !showInput
                            ? <div className={styles._name}>
                                <h3>{currentChat.chatName}</h3>
                                <EditFilled className={styles.icon} onClick={() => setShowInput(true)} />
                            </div>
                            : <div className={styles.input} ref={inputRef}>
                                <input
                                    type="text"
                                    placeholder='group Name'
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                                {
                                    loading
                                        ? <LoadingOutlined className={styles.icon} />
                                        : <CheckOutlined className={styles.icon} onClick={renameGroup} />
                                }
                            </div>
                    }
                    <span>{currentChat.users.length} members</span>
                </div>
                <div className={styles.information}>
                    <h6 >Group Informations</h6>
                    <p>Group is created at {currentChat?.createdAt} </p>
                </div>
                <div className={styles.participants}>
                    <h5>{currentChat.users.length} Participants</h5>
                    <div className={styles.add}>
                        <div className={styles._icon}>
                            <UserAddOutlined className={styles.icon} />
                        </div>
                        <span>Add participants</span>
                    </div>
                    {
                        currentChat?.users.map(u => (
                            <div className={styles.participant} key={u._id}>
                                <div className={styles.img}>
                                    <img src={u.profilePic} alt="" />
                                </div>
                                <span>{u.name}</span>
                                {
                                    Object.values(u).includes(currentChat.groupAdmin._id) &&
                                    <div className={styles.isAdmin}>Admin </div>
                                }
                            </div>

                        ))
                    }
                    <div style={{ backgroundColor: 'var(--bg)', height: '0.7rem' }}></div>
                    <div className={styles.actions}>
                        <div className={styles._icon}>
                            <ExportOutlined className={styles.icon} /></div>
                        <span>Leave group</span>
                    </div>
                    <div className={styles.actions} onClick={deleteGroup}>
                        <div className={styles._icon}>
                            <DeleteOutlined className={styles.icon} /></div>
                        <span>Delete group</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatInfo