import React, { useEffect } from 'react';
import Modal from '../ModalLayout';
import styles from './ConnectionsModal.module.scss';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';
import { useState } from 'react';



const Card = ({ f }) => {
    const [obj, setObj] = useState({});
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                // setLoading(true)
                const res = await axios.get(`/user/get-profile/${f}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    toast.error(res.data.message)
                    // setLoading(false)
                }
                if (res.data.status === 'success') {
                    //    setLoading(false)
                    setObj(res.data.data)

                }
            } catch (error) {
                toast.error('Something went wrong')
                // setLoading(false)
            }
        }
        fetchFriends()
    }, [f])

    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={obj.profilePic} alt="" />
            </div>
            <span>{obj.name}</span>
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
                >Followings</div>
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
            </div>
        </Modal>
    )
}

export default ConnectionsModal