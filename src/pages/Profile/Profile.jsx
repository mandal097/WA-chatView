import React from 'react';
import styles from './Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    EditFilled,
    PlusCircleFilled,
    CameraFilled,
    WechatOutlined,
    // CheckCircleFilledCircleFilled,
    CheckCircleFilled
} from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../config/axios';
import EditProfileModal from '../../components/_Modals/EditProfileModal/EditProfileModal';
import Loading from '../../components/Loading/Loading';
import { currentProfileState, setActiveFriend } from '../../redux/currentProfile';
import { followFriend, unFollowFriend } from '../../redux/userRedux';
import { useCallback } from 'react';
import { setCurrentChat } from '../../redux/chatRedux';

const UserBadge = ({ id }) => {
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
                toast.error('Something went wrong')
                setLoading(false)
            }

        }
        fetchDetails()
    }, [id])
    return (
        <Link to={`/profile/${id}`} className={styles.list_item}>
            {loading ? <Loading font='3rem' color='white' />
                : <>
                    <img src={details.profilePic} alt="friends pictures" />
                    <div className={styles.bagde_name}>{details.name}</div>
                </>
            }
        </Link>
    )
}


const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const [currentProfileDetails, setCurrentProfileDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [active, setActive] = useState('posts');
    const [owner, setOwner] = useState(false)
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (showEditProfileModal === true) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [showEditProfileModal]);

    useEffect(() => {
        setActive('posts')
        if (id === currentUser._id) {
            setOwner(true);
        } else {
            setOwner(false)
        }
    }, [id, currentUser, owner]);


    const fetchProfile = useCallback(async () => {
        try {
            // setLoading(true)
            const res = await axios.get(`/user/get-profile/${id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
                setLoading(false)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                dispatch(currentProfileState(res.data.data))
                setLoading(false)
                if (String(id) === String(currentUser._id)) {
                    setCurrentProfileDetails(currentUser);
                    dispatch(currentProfileState(currentUser))
                } else {
                    setCurrentProfileDetails(res.data.data);
                }
            }
        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false)
        }
    }, [id, dispatch, currentUser])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile]);


    const followUsers = async (e) => {
        e.preventDefault()
        dispatch(followFriend(id))
        try {
            const res = await axios.put('/user/connections/follow', { friendId: id }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                console.log(res.data);
            }
        } catch (error) {
            toast.error('something went wrong')

        }
    }

    const unFollowUsers = async (e) => {
        e.preventDefault()
        dispatch(unFollowFriend(id));
        try {
            const res = await axios.put('/user/connections/unfollow', { friendId: id }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    };

    const startChat = async () => {
        const res = await axios.post('/chats/create-chat', {
            userId: id
        }, {
            headers: {
                token: `Bearer ${localStorage.getItem('token')}`
            }
        });


        console.log(res.data.data);
        const filter = res.data.data[0]?.users.find((c) => c._id !== currentUser._id);
        dispatch(setCurrentChat({ currentChat: filter, chatId: res.data.data[0]._id }));
        setTimeout(() => {
            navigate('/messenger');
        }, 600);
    }



    // if (loading) return <Loading font='15rem' color='white' />
    return (
        <>
            {
                loading ? <Loading font='15rem' color='white' />
                    :
                    <div className={styles.profile_container}>
                        <ToastContainer className='toaster' />
                        <div className={styles.profile}>
                            <div className={styles.cover_img}>
                                <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.6435-9/100527609_1077588095956610_3980996785706369024_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jgl8Y1QaPm0AX8WGkmY&_nc_ht=scontent.fdel27-4.fna&oh=00_AT-NiNCq2VXbKrf1BpcUUvqR3-1X3SDULsBEMNZzN92dcw&oe=636E3982" alt="coverImg" />
                                {owner &&
                                    <div className={styles.edit_cover}><CameraFilled className={styles.icon} />Edit Cover Photo</div>
                                }
                            </div>
                            <div className={styles.details}>
                                <div className={styles.profile_img}>
                                    <img src={currentProfileDetails?.profilePic} alt="profilImage" />
                                </div>
                                <div className={styles.profile_details}>
                                    <h3 className={styles.name}>{currentProfileDetails.name}</h3>
                                    <div className={styles.connections}>
                                        <Link
                                            to={`/profile/${id}/friends`}
                                            className={styles.link}
                                            onClick={() => {
                                                setActive('friends')
                                                dispatch(setActiveFriend('followers'))
                                                const scroll = document.getElementById('friends')
                                                if (scroll) {
                                                    scroll.scrollIntoView({ behavior: 'smooth' })
                                                }
                                            }
                                            }
                                        >
                                            <span>{currentProfileDetails.followers?.length ? currentProfileDetails.followers.length : 0}</span> followers</Link>
                                        <Link
                                            to={`/profile/${id}/friends`}
                                            className={styles.link}
                                            onClick={() => {
                                                setActive('friends')
                                                dispatch(setActiveFriend('followings'))
                                                const scroll = document.getElementById('friends')
                                                if (scroll) {
                                                    scroll.scrollIntoView({ behavior: 'smooth' })
                                                }
                                            }
                                            }
                                        >
                                            <span>{currentProfileDetails.followings?.length ? currentProfileDetails.followings.length : 0}</span> followings</Link>
                                    </div>
                                    <div className={styles.user_actions}>
                                        <div className={styles.connections_list}>
                                            {
                                                currentProfileDetails.followers?.map(follower => (
                                                    <UserBadge key={follower} id={follower} />
                                                ))
                                            }

                                        </div>
                                        <div className={styles.actions}>
                                            {owner
                                                ? <>
                                                    <button><PlusCircleFilled className={styles.icon} />Add story</button>
                                                    <button onClick={() => setShowEditProfileModal(true)}>
                                                        <EditFilled className={styles.icon} />Edit Profile
                                                    </button>
                                                </>
                                                : <>
                                                    {currentUser.followings.includes(id)
                                                        ?
                                                        <button button style={{ backgroundColor: 'var(--bgLight)' }}
                                                            onClick={unFollowUsers}
                                                        >
                                                            <CheckCircleFilled className={styles.icon} />
                                                            Unfollow</button>
                                                        :
                                                        <button button style={{ backgroundColor: 'var(--bgLight)' }}
                                                            onClick={followUsers}
                                                        >
                                                            <PlusCircleFilled className={styles.icon} />
                                                            Follow</button>


                                                    }
                                                    <button style={{
                                                        backgroundColor: 'var(--btnLight)'
                                                    }}
                                                    onClick={startChat}
                                                    >
                                                        <WechatOutlined className={styles.icon} />Message
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.navs}>
                                <Link to={`/profile/${currentProfileDetails._id}`} className={`${styles.nav_items}  ${active === 'posts' && styles.active_nav}`} onClick={() => setActive('posts')}>
                                    <span className='link'>Posts</span>
                                </Link>
                                <Link to={`/profile/${currentProfileDetails._id}/about`} className={`${styles.nav_items}  ${active === 'about' && styles.active_nav}`} onClick={() => setActive('about')}>
                                    <span className='link'>About</span>
                                </Link>
                                <Link to={`/profile/${currentProfileDetails._id}/photos`} className={`${styles.nav_items}  ${active === 'photos' && styles.active_nav}`} onClick={() => setActive('photos')}>
                                    <span className='link'>Photos</span>
                                </Link>
                                <Link to={`/profile/${currentProfileDetails._id}/videos`} className={`${styles.nav_items}  ${active === 'videos' && styles.active_nav}`} onClick={() => setActive('videos')}>
                                    <span className='link'>Videos</span>
                                </Link>
                                <Link to={`/profile/${currentProfileDetails._id}/friends`} className={`${styles.nav_items}  ${active === 'friends' && styles.active_nav}`} onClick={() => setActive('friends')}>
                                    <span className='link'>Friends</span>
                                </Link>
                                {/* <Link to='#' className={`${styles.nav_items}  ${active === 'more' && styles.active_nav}`} onClick={() => setActive('more')}>
                            <span className='link'>More</span>
                        </Link> */}
                            </div>
                        </div>
                    </div>
            }
            <div className={styles.outlets} >
                <Outlet />
            </div>

            {
                showEditProfileModal && <EditProfileModal setShowEditProfileModal={setShowEditProfileModal} />
            }

        </>
    )
}

export default Profile