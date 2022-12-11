import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import styles from './UserBadge.module.scss';
import axios from '../../config/axios';

const User = ({ id, size, show ,mr}) => {
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
        <Link to={`/profile/${id}`} className={styles.list_item} style={{ width: size, height: size ,marginRight:mr}}>
            {loading ? <Loading font='3rem' color='white' />
                : <>
                    <img src={details?.profilePic} alt="friends pictures" />
                    {show === 'true' && <div className={styles.bagde_name}>{details.name}</div>}
                </>
            }
        </Link>
    )
}


const UserBadge = ({ array, size, show ,mr}) => {
    return (
        <div className={styles.user_badge} style={{display:'flex',flexDirection:'row'}}>
            {
                array?.slice(0, 10).map(element => (
                    <User key={element} id={element} size={size} show={show} mr={mr} />
                ))
            }

        </div>
    )
}

export default UserBadge