import React, { useState, useEffect, useRef } from 'react';
import styles from './GroupInfo.module.scss';
import {
    ArrowLeftOutlined,
    EditFilled,
    UserAddOutlined,
    ExportOutlined,
    CheckOutlined,
    LoadingOutlined,
    DeleteOutlined,
    DownOutlined,
    CameraOutlined,
} from '@ant-design/icons';
import axios from '../../../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { changeAvatar, removeFromGroup, setCurrentChatInitial, setCurrentChatName } from '../../../..//redux/chatRedux';
import { useUpload } from '../../../../hooks/useUpload';
import AddModal from '../AddNewUserModal/AddModal';

const ChatInfo = ({ setShowInfo }) => {
    const { currentChat, chatId } = useSelector(state => state.chat);
    const { currentUser } = useSelector(state => state.user);

    const [showInput, setShowInput] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [groupName, setGroupName] = useState(currentChat.chatName);
    const [groupAvatar, setGroupAvatar] = useState('');
    const [loading, setLoading] = useState(false);
    const { uploadPerc, url } = useUpload(groupAvatar)
    const inputRef = useRef(null);
    const dispatch = useDispatch();

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
                // console.log(res.data);
                setGroupName('')
                setShowInput(false);
                dispatch(setCurrentChatName({ chatName: res.data.data.chatName, chatId: currentChat._id }));
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

    const removeUser = async (id, params) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`/chats/group/${params}`, {
                userId: id,
                chatId: chatId
            }, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                dispatch(removeFromGroup(id))
            }
            if (params === 'exit-group' && res.data.status === 'success') {
                window.location.reload()
            }
        } catch (error) {
            toast.error('Something went wrong');
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

    const handleAvatar = async (e) => {
        
        try {
            setLoading(true)
            const token = localStorage.getItem('token');
            const res = await axios.put('/chats/group/change-avatar', { chatId: chatId, groupAvatar: url }, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                dispatch(changeAvatar({ url: res.data.data.groupAvatar, chatId: currentChat._id }));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

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
                        {
                            groupAvatar ? <img src={URL.createObjectURL(groupAvatar)} alt="" />
                                : <img src={currentChat.groupAvatar} alt="" />
                        }
                        {/* {currentChat.isGroupAdmin && */}
                            <div className={styles.img_backdrop} style={{
                                opacity: groupAvatar && uploadPerc < 100 && 1

                            }}>
                                <label htmlFor="avatar">Upload <br /><CameraOutlined className={styles.icon} /></label>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="avatar"
                                    accept='image/*'
                                    onChange={(e) => setGroupAvatar(e.target.files[0])}
                                />
                            </div>
                        {/* } */}
                    </div>
                    {
                        uploadPerc === 100 &&
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className={styles.change_avatar} onClick={handleAvatar}>{loading ? <LoadingOutlined style={{ fontSize: '3rem' }} /> : 'Upload'}</button>
                        </div>
                    }
                    {
                        !showInput
                            ? <div className={styles._name}>
                                <h3>{currentChat.chatName}</h3>
                                <EditFilled className={styles.icon} onClick={() => setShowInput(true)} />
                            </div>
                            : <div className={styles.input} ref={inputRef}>
                                <input
                                    type="text"
                                    value={groupName}
                                    placeholder='group Name'
                                    autoFocus
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
                    <div className={styles.add} onClick={() => setShowAddModal(true)}>
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
                                    !Object.values(u).includes(currentChat.groupAdmin._id) &&
                                    <>
                                        <div className={styles.down_arrow}>
                                            <DownOutlined className={styles.icon} />
                                            <div className={styles.popup}>
                                                <button onClick={() => removeUser(u._id, 'remove-user')}>Remove</button>
                                            </div>
                                        </div>
                                    </>
                                }
                                {
                                    Object.values(u).includes(currentChat.groupAdmin._id) &&
                                    <div className={styles.isAdmin}>Admin </div>
                                }
                            </div>

                        ))
                    }
                    <div style={{ backgroundColor: 'var(--bg)', height: '0.7rem' }}></div>
                    
                    <div className={styles.actions} onClick={() => removeUser(currentUser._id, 'exit-group')}>
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
            {
                showAddModal && <AddModal setShowAddModal={setShowAddModal} />
            }
        </div >
    )
}

export default ChatInfo