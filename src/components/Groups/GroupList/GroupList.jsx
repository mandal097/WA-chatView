import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './GroupList.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';


const Card = ({ count, group }) => {
    const { currentUser } = useSelector(state => state.user)
    // console.log(count);
    return (
        <div className={styles.card_}>
            <div className={styles.card} style={{ alignItems: count === 'all' ? 'flex-start' : 'center' }}>
                <div className={styles.img}>
                    <img src={group?.groupCoverImg} alt="img" />
                </div>
                <div className={styles.details}>
                    <Link className={styles.link} to={`/groups/${group?._id}`}>{group?.groupName}</Link>
                    <div className={styles.counters}>
                        <p>Public · 64K followers · 10+ posts a day · 126 followers</p>
                    </div>
                    {
                        count === 'all' &&
                        <div className={styles.friend}>
                            <div className={styles.img}>
                                <img src={currentUser?.profilePic} alt="" />
                            </div>
                            <p>1 friend is a follower</p>
                        </div>
                    }
                </div>
                <button>Join</button>
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
            console.log(res.data.data);
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