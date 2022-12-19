import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Card from './Card';
import styles from './InviteMembers.module.scss';
import axios from '../../../../config/axios';
import { useSelector } from 'react-redux';
import Loading from '../../../Loading/Loading';


const InviteMembers = () => {
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [userList, setUserList] = useState([]);
    const [searchedList, setSearchedList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [showInvites, setShowInvites] = useState(false)

    useEffect(() => {
        const fetchList = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/groups/handle-members/get-list/${currentGroup?._id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (res.data.status === 'err') {
                    toast.error(res.data.message)
                    setLoading(false);
                }
                if (res.data.status === 'success') {
                    console.log(res.data);
                    setLoading(false);
                    setUserList(res.data.data)
                }
            } catch (error) {
                toast.error('Something went wrong')
                setLoading(false);
            }
        }
        fetchList();
    }, [currentGroup]);


    useEffect(() => {
        const search = userList?.filter((user) => {
            if (searchTerm === '') {
                return false
            } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return user
            }
            return false;
        });
        setSearchedList(search);
    }, [searchTerm, userList,])



    return (
        <>
            {showInvites ?
                <div className={styles.invite_members}  >
                    <ToastContainer className='toast' />
                    <div className={styles.top}>
                        <div className={styles.section} style={{ borderTop: 'none', minHeight: 'auto' }}>
                            <div className={styles.heading}>
                                <h3>Invite as member</h3>
                                <button onClick={() => setShowInvites(!showInvites)}>Show user list</button>
                            </div>
                            {
                                userList?.map(user => (
                                    <Card
                                        key={user._id}
                                        user={user}
                                        currentGroup={currentGroup}
                                        type='invited_list'
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>

                : <div className={styles.invite_members}>
                    <ToastContainer className='toast' />
                    <div className={styles.top}>
                        <div className={styles.heading}>
                            <h3>User list <span>88564</span></h3>
                            <button onClick={() => setShowInvites(!showInvites)}>See invited user</button>
                        </div>
                        <p>New people and Pages that join this group will appear here. <Link className={styles.link}>Learn more</Link> </p>
                        <div className={styles.search_box}>
                            <SearchOutlined className={styles.icon} />
                            <input
                                type="search"
                                placeholder='Find user by name...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>


                        {searchTerm ?
                            <div className={styles.section}>
                                <div className={styles.heading}>
                                    <h3>Invite as member</h3>
                                </div>
                                {
                                    searchedList?.map(user => (
                                        <Card
                                            key={user._id}
                                            user={user}
                                            currentGroup={currentGroup}
                                            type='simple_list'
                                        />
                                    ))
                                }
                                {
                                    loading && <Loading font='10rem' color='white' />
                                }
                                {
                                    searchedList?.length === 0 &&
                                    <h1 style={{ fontSize: '2rem', marginTop: '2rem', color: 'var(--textSoft)', fontWeight: '200' }}>No results found for
                                        <span style={{ fontSize: '2rem', color: 'var(--error)' }}>{' '}{searchTerm}</span>
                                    </h1>
                                }
                            </div>

                            : <div className={styles.section}>
                                <div className={styles.heading}>
                                    <h3>Invite as member</h3>
                                </div>
                                {
                                    userList?.map(user => (
                                        <Card
                                            key={user._id}
                                            user={user}
                                            currentGroup={currentGroup}
                                            type='simple_list'
                                        />
                                    ))
                                }
                                {
                                    loading && <Loading font='10rem' color='white' />
                                }
                            </div>
                        }


                    </div>
                </div>}

        </>
    )
}

export default InviteMembers