import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './GroupList.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';
import UserBadge from '../../UserBadge/UserBadge';


const CommonFriends = ({ group }) => {
    const [commonFriends, setCommonFriends] = useState([]);
    useEffect(() => {
        const getCommonFriends = async () => {
            const res = await axios.get(`/groups/common-friends/${group?._id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res.data);
            setCommonFriends(res.data.data);
        }
        getCommonFriends()
    }, [group?._id]);

    return (
        <div className={styles.friend}>
            <UserBadge array={commonFriends} size='2.3rem' show='false' mr='-0.7rem' />
            <p>{commonFriends?.length} common friends from your followings</p>
        </div>
    )
}


const Card = ({ count, group }) => {
    const { currentUser } = useSelector(state => state.user);
    const [sending, setSending] = useState(false) // loading purpose for sending request to join member
    const [requested, setRequested] = useState(false);


    useEffect(() => {
        if (group?.membersRequests?.includes(currentUser?._id)) {
            setRequested(true);
        } else {
            setRequested(false);
        }
    }, [group, currentUser])


    const handleRequests = async () => {
        try {
            setSending(true);
            const res = await axios.put(`/groups/member-request/${group?._id}`, {}, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setSending(false);
            }
            if (res.data.status === 'success') {
                setSending(false);
                setRequested(true)
                toast.success(res.data.message);
                console.log(res.data);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setSending(false);
        }
    };



    return (
        <div className={styles.card_}>
            <div className={styles.card} style={{ alignItems: count === 'all' ? 'flex-start' : 'center' }}>
                <div className={styles.img}>
                    <img src={group?.groupCoverImg} alt="img" />
                </div>
                <div className={styles.details}>
                    <Link className={styles.link} to={`/groups/${group?._id}`}>{group?.groupName}</Link>
                    <div className={styles.counters}>
                        <p>{group?.isPrivate} · {group?.members?.length} members </p>
                    </div>
                    {
                        count === 'all' &&
                        <CommonFriends currentUser={currentUser} group={group} />
                    }
                </div>
                {group?.members?.includes(currentUser?._id)
                    ?
                    <button> Joined</button>
                    : <button onClick={handleRequests}> {requested ? 'Requested' : sending ? 'wait...' : 'Join'}
                    </button>
                }
            </div>

        </div>
    )
}





const GroupList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');
    const count = searchParams.get('count');
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleQuery = () => {
        setSearchParams({ 'q': searchQuery, 'count': 'all' });
    };

    useEffect(() => {
        let length;
        if (count === 'all') {
            length = 0;
        } else {
            length = count
        }
        const fetchGroups = async () => {
            setLoading(true)
            // const res = await axios.get(`/groups`, {
            const res = await axios.get(`/groups/search?q=${searchQuery}&count=${length}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.error(res.data.message);
                setGroups(res.data.data)
            }
            setLoading(false)
            // console.log(res.data.data);
        }
        fetchGroups()
    }, [searchQuery, count])

    return (
        <div className={styles.group_list} style={{ backgroundColor: count === 'all' ? 'var(--bgLight)' : 'var(--bgDark)' }}>
            <h2 style={{ color: count === 'all' ? 'var(--text)' : 'var(--textSoft)' }}>Groups</h2>

            {
                loading && <Loading font='10rem' color='white' />
            }
            {
                groups.map(group => (
                    <Card key={group?._id} count={count} group={group} />
                ))
            }
            {
                groups.length === 0 && <h1 style={{ fontSize: '2rem', color: 'var(--text)' }}>No groups found for : {searchQuery}</h1>

            }
            {
                count !== 'all' && groups.length !== 0 &&
                <button className={styles.button} onClick={() => {
                    handleQuery()
                }}>See All</button>
            }
        </div>
    )
}

export default GroupList