import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import styles from './UserBadge.module.scss';
import axios from '../../config/axios';

const User = ({ id }) => {
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/user/get-profile/${id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'success') {
                    setDetails(res.data.data)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
            }

        }
        fetchDetails()
    }, [id])
    return (
        <Link to={`/profile/${id}`} className={styles.list_item}>
            {loading ? <Loading font='3rem' color='white' />
                : <>
                    <img src={details?.profilePic} alt="friends pictures" />
                    <div className={styles.bagde_name}>{details.name}</div>
                </>
            }
        </Link>
    )
}


const UserBadge = ({ array }) => {
    return (
        <div className={styles.user_badge}>
            {
                array?.slice(0, 10).map(element => (
                    <User key={element} id={element} />
                ))
            }

        </div>
    )
}

export default UserBadge