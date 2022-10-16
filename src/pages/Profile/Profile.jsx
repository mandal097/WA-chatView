import React from 'react';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import {
    EditFilled,
    PlusCircleFilled,
    CameraFilled,
    WechatOutlined,
    // CheckOutlined
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../config/axios';
import EditProfileModal from '../../components/_Modals/EditProfileModal/EditProfileModal';
import Loading from '../../components/Loading/Loading';


const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const [profileDetails, setProfileDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [active, setActive] = useState('posts');
    const [owner, setOwner] = useState(false)
    const location = useLocation()
    const id = location.pathname.split('/')[2]

    useEffect(() => {
        if (showEditProfileModal === true) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [showEditProfileModal]);

    useEffect(() => {
        if (id === currentUser._id) {
            setOwner(true);
        } else {
            setOwner(false)
        }
    }, [id, currentUser, owner]);


    useEffect(() => {
        const fetchProfile = async () => {
            try {

                setLoading(true)
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
                    setProfileDetails(res.data.data);
                    setLoading(false)
                }
            } catch (error) {
                toast.error('Something went wrong')
                setLoading(false)
            }
        }
        fetchProfile()
    }, [id]);

    if (loading) return <Loading font='15rem' color='white' />
    return (
        <>
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
                            <img src={profileDetails?.profilePic} alt="profilImage" />
                        </div>
                        <div className={styles.profile_details}>
                            <h3 className={styles.name}>{profileDetails.name}</h3>
                            <div className={styles.connections}>
                                <div className={styles.conn_}><span>43</span> followers</div>
                                <div className={styles.conn_}><span>73</span> followings</div>
                            </div>
                            <div className={styles.user_actions}>
                                <div className={styles.connections_list}>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
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
                                            <button style={{ backgroundColor: 'var(--bgLight)' }}>
                                                <PlusCircleFilled className={styles.icon} />
                                                {/* <CheckOutlined  className={styles.icon} /> */}
                                                Follow</button>
                                            <button style={{
                                                backgroundColor: 'var(--btnLight)'
                                            }}>
                                                <WechatOutlined className={styles.icon} />Message
                                            </button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.navs}>
                        <Link to={`/profile/${profileDetails._id}`} className={`${styles.nav_items}  ${active === 'posts' && styles.active_nav}`} onClick={() => setActive('posts')}>
                            <span className='link'>Posts</span>
                        </Link>
                        <Link to={`/profile/${profileDetails._id}/about`} className={`${styles.nav_items}  ${active === 'about' && styles.active_nav}`} onClick={() => setActive('about')}>
                            <span className='link'>About</span>
                        </Link>
                        <Link to={`/profile/${profileDetails._id}/photos`} className={`${styles.nav_items}  ${active === 'photos' && styles.active_nav}`} onClick={() => setActive('photos')}>
                            <span className='link'>Photos</span>
                        </Link>
                        <Link to={`/profile/${profileDetails._id}/videos`} className={`${styles.nav_items}  ${active === 'videos' && styles.active_nav}`} onClick={() => setActive('videos')}>
                            <span className='link'>Videos</span>
                        </Link>
                        <Link to={`/profile/${profileDetails._id}/friends`} className={`${styles.nav_items}  ${active === 'friends' && styles.active_nav}`} onClick={() => setActive('friends')}>
                            <span className='link'>Friends</span>
                        </Link>
                        {/* <Link to='#' className={`${styles.nav_items}  ${active === 'more' && styles.active_nav}`} onClick={() => setActive('more')}>
                            <span className='link'>More</span>
                        </Link> */}
                    </div>
                </div>
            </div>
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