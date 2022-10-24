import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Modal from '../ModalLayout';
import styles from './LikeModal.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';


const Card = ({ userId }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {

            try {
                setLoading(true)
                const res = await axios.get(`/user/get-profile/${userId}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    toast.error(res.data.message)
                    setLoading(false)
                }
                if (res.data.status === 'success') {
                    setLoading(false);
                    setUser(res.data.data)
                }
            } catch (error) {
                toast.error('Something went wrong')
                setLoading(false)
            }
        }
        fetchUser()
    }, [userId]);

    if (loading) return <Loading font='6rem' color='white' />
    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.user_card}>
                <div className={styles.img}>
                    <img src={user?.profilePic} alt="" />
                </div>
                <div className={styles.details}>
                    <span onClick={() => navigate(`/profile/${user._id}`)}>
                        {user.name}
                    </span>
                    <small>{user?.followers?.length} followers</small>
                </div>
            </div >
        </>
    )
}






const LikeModal = ({ setShowLikesModal, likes }) => {
    return (
        <Modal
            width='50rem'
            height='70vh'
            center='center'
            zIndex='100'
            head='People who liked the post'
            onClick={() => setShowLikesModal(false)}
        >

            <div className={`${styles.likes_list} ${'custom_scroll'}`}>

                {
                    likes?.map(user => (
                        <Card key={user} userId={user} />
                    ))
                }

            </div>
        </Modal >
    )
}

export default LikeModal