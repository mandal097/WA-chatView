import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dummy from '../../components/Groups/_GroupCreation/DummyPage/Dummy';
import Tags from '../../components/_Modals/SelectUser/Tags';
import { removeMembers } from '../../redux/AddToGroup';
import styles from './CreateGroup.module.scss';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

const CreateGroup = () => {
    const { currentUser } = useSelector(state => state.user);
    const { members } = useSelector(state => state.group);
    const [showTag, setShowTag] = useState(false)
    const [disable, setDisabled] = useState(true);
    const [groupName, setGroupName] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const [hide, setHide] = useState('visible');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (groupName && privacy && hide) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [hide, groupName, privacy, members]);


    const goBack = () => {
        dispatch(removeMembers());
        navigate('/groups/feed')
    }

    const createGroup = async (e) => {
        e.preventDefault();
        if (!groupName) {
            toast.error('Please write group name')
        }
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post('/groups/create', {
                groupName: groupName,
                members: members.length > 0 ? members : [],
                isPrivate: privacy,
                visbility: hide
            },
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
            if (res.data.status === 'err') {
                setLoading(false)
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                setLoading(false);
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate(`/groups/${res.data.data?._id}`)
                }, 500);
            }
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            console.log('lll');
            toast.error('something went wrong')
        }
    }
    return (
        <div className={styles.create_group}>
            <ToastContainer className='toaster' />
            <div className={styles.sidebar}>
                <div className={styles.close}>
                    <button onClick={goBack}>
                        <CloseOutlined className={styles.icon} />
                    </button>
                </div>
                <h1>Create group</h1>
                <div className={styles.admin_card}>
                    <div className={styles.img}>
                        <img src={currentUser?.profilePic} alt="" />
                    </div>
                    <div className={styles.name}>
                        <span>{currentUser?.name}</span>
                        <small>Admin</small>
                    </div>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label htmlFor="">Group name:</label>
                        <input
                            type="text"
                            placeholder='Group Name'
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="">Group privacy:</label>
                        <select name="" id="" onChange={(e) => setPrivacy(e.target.value)}>
                            <option value="public" selected>Public</option>
                            <option value="private">Private</option>
                        </select>
                        {
                            privacy === 'public' ?
                                <p>Members and visitors can post in the group. Admins can review first-time participants.</p>
                                :
                                <p>Private groups can't be changed to public to protect the privacy of group members. </p>
                        }
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="">Hide group:</label>
                        <select name="" id="" onChange={(e) => setHide(e.target.value)}>
                            <option value='visible' selected>Visible</option>
                            <option value='hidden'>Hide</option>
                        </select>
                    </div>
                    <div className={styles.input} onClick={() => setShowTag(true)}>
                        <button>{members?.length ? members?.length + ' Selected friends' : 'Add friends to group 👨🏾‍🤝‍👨🏾'}</button>
                    </div>
                    <button
                        onClick={createGroup}
                        disabled={disable}
                        className={`${styles.create_btn} ${disable && styles.btn_disabled}`}
                    >{loading ? <> <Loading color='var(--text)' font='5rem' /></> : 'Create Group'}</button>
                </div>
            </div>
            <div className={styles.body}>
                <Dummy
                    groupName={groupName}
                    privacy={privacy}
                    hide={hide}
                />
            </div>
            {
                showTag && <Tags setShowTag={setShowTag} btn='add' />
            }
        </div>
    )
}

export default CreateGroup