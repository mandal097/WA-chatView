import React from 'react';
import styles from './FriendList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../../../config/axios'
import Loading from '../../../Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';
import { followFriend, unFollowFriend } from '../../../../redux/userRedux';
import { Link } from 'react-router-dom';


const Friend = ({ f }) => { //f == id of the users
    // const { currentProfile } = useSelector(state => state.profile)
    const { currentUser } = useSelector(state => state.user)
    const [loading, setLoading] = useState(false);
    const [friend, setFriend] = useState({});
    const dispatch = useDispatch()



    const unFollowUsers = async (e) => {
        e.preventDefault()
        dispatch(unFollowFriend(f));
        try {
            const res = await axios.put('/user/connections/unfollow', { friendId: f }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            // if (res.data.status === 'success') {
            //     toast.success(res.data.message)
            // }
        } catch (error) {
            toast.error('something went wrong')
        }
    }


    const followUsers = async (e) => {
        e.preventDefault()
        dispatch(followFriend(f))
        try {
            const res = await axios.put('/user/connections/follow', { friendId: f }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            // if (res.data.status === 'success') {
            //     toast.success(res.data.message)
            // }
        } catch (error) {
            toast.error('something went wrong')
        }
    }



    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true)
            const res = await axios.get(`/user/get-profile/${f}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                setLoading(false)
            }
            if (res.data.status === 'success') {
                setFriend(res.data.data)
                setLoading(false)
            }
        }
        fetchProfile()
    }, [f])

    if (loading) return <Loading font='10rem' />
    return (
        <div className={styles.friend} id='friends'>
            <ToastContainer className='toaster' />
            <Link to={`/profile/${friend._id}`} className={styles.img}>
                <img src={friend?.profilePic} alt="user_profile" />
            </Link>
            <div className={styles.name}>
                <Link to={`/profile/${friend._id}`} className={styles.link}>{friend?.name}</Link>
                <small>
                    {friend?.followers ? friend.followers.length : 0} followers
                    {' '}
                    {friend?.followings ? friend.followings.length : 0} followings
                </small>
            </div>
            {
                currentUser.followings.includes(f)
                    ? <button onClick={unFollowUsers}>Unfollow</button>
                    : String(f) !== String(currentUser._id) && <button onClick={followUsers} className={styles.follow_btn}>follow</button>
            }
        </div>
    )
}
const FriendList = ({ active }) => {
    const { currentProfile } = useSelector(state => state.profile);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (active === 'followers') {
            setFriends(currentProfile.followers)
        } else {
            setFriends(currentProfile.followings)
        }
    }, [active, currentProfile]);

    return (
        <div className={styles.friend_list}>
            {
                friends.map((f) => (
                    <Friend key={f} f={f} />
                ))
            }
        </div>
    )
}

export default FriendList