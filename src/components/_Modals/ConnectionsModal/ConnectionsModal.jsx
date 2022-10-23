import React, { useEffect } from 'react';
import Modal from '../ModalLayout';
import styles from './ConnectionsModal.module.scss';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';



const Card = ({ f }) => {
    const [obj, setObj] = useState({});
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/user/get-profile/${f}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    toast.error(res.data.message)
                    setLoading(false)
                }
                if (res.data.status === 'success') {
                       setLoading(false)
                    setObj(res.data.data)

                }
            } catch (error) {
                toast.error('Something went wrong')
                setLoading(false)
            }
        }
        fetchFriends()
    }, [f])
if(loading)return <Loading font='6rem' color='var(--text)'/>
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={obj.profilePic} alt="" />
            </div>
            <Link to={`/profile/${obj._id}`} className={styles.link}>{obj.name}</Link>
        </div>
    )
}






const ConnectionsModal = ({ setShowConnectionModal, active, setActive, friend }) => {
    console.log(friend);
    return (
        <Modal
            // overflow='scroll'
            width='50rem'
            height='70vh'
            margin='6rem 0'
            zIndex='100'
            head='Connections'
            onClick={() => setShowConnectionModal(false)}
        >
            <div className={styles.head}>
                <div className={`${styles.filter}  ${active === 'followers' && styles.active}`}
                    onClick={() => setActive('followers')}
                >Followers</div>
                <div className={`${styles.filter}  ${active === 'followings' && styles.active}`}
                    onClick={() => setActive('followings')}
                >Followings</div>
            </div>
            <div className={`${styles.list} ${'custom_scroll'}`}>
                {
                    active === 'followers' ?
                        friend.followers?.map(f => (
                            <Card key={f} f={f} />
                        ))
                        :
                        friend.followings?.map(f => (
                            <Card key={f} f={f} />
                        ))
                }
                {
                    active === 'followers' && friend.followers.length === 0 &&
                    <span style={{
                        fontSize: '1.6rem',
                        color: 'var(--textSoft)',
                        padding: '0 2rem'
                    }}
                    >NO {active}</span>
                }
                {
                    active === 'followings' && friend.followings.length === 0 &&
                    <span style={{
                        fontSize: '1.6rem',
                        color: 'var(--textSoft)',
                        padding: '0 2rem'
                    }}
                    >NO {active}</span>
                }
            </div>
        </Modal>
    )
}

export default ConnectionsModal