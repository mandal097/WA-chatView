import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import GroupCard from '../GroupCard/GroupCard';
import styles from './Suggestions.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';

const Suggestions = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true)
            const res = await axios.get(`/groups`, {
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
    }, [])

    return (
        <div className={styles.suggestions}>
            <ToastContainer className='toaster' />
            <div className={styles.groups_}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <span>Popular near you</span>
                        <p>Groups that people in your area are in</p>
                    </div>
                    <div className={styles.right}>
                        <Link className={styles.link} to='/groups/discover'>See all</Link>
                    </div>
                </div>
                <div className={styles.group_lists}>
                    {
                        loading && <Loading font='10rem' color='white' />
                    }
                    {
                        groups.map((group) => (
                            <div className={styles.card} key={group._id}>
                                <GroupCard bg='var(--bgDark)' details={group} />
                            </div>
                        ))
                    }
                  
                </div>
            </div>

            <div className={styles.groups_}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <span>More suggestions</span>
                    </div>
                    {/* <div className={styles.right}>
                        <Link className={styles.link} to='discover'>See all</Link>
                    </div> */}
                </div>
                <div className={styles.group_lists}>\
                {
                        loading && <Loading font='10rem' color='white' />
                    }
                    {
                        groups.map((group) => (
                            <div className={styles.card} key={group._id}>
                                <GroupCard bg='var(--bgDark)' details={group} />
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default Suggestions