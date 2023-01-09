import React, { useEffect } from 'react';
import styles from './Posts.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import PostCard from '../../PostCard/PostCard';
import Details from '../Details/Details';
import CreatePost from '../../CreatePost/CreatePost';
import EditDetailsModal from '../../_Modals/EditDetailsModal/EditDetailsModal';
import axios from '../../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import { updateBio } from '../../../redux/userRedux';

const Card = ({ id }) => {
    const [details, setDetails] = useState({});

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await axios.get(`/user/get-profile/${id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDetails(res.data.data)
        }
        fetchDetails()
    }, [id])

    return (
        <Link to={`/profile/${id}`} className={styles.card}>
            <img src={details?.profilePic} alt="profile_picture" />
            <p>{details?.name?.split(' ')[0]}</p>
        </Link>
    )
}

const Posts = () => {
    const { currentUser } = useSelector(state => state.user);
    const { currentProfile } = useSelector(state => state.profile);
    const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
    const [bioText, setBioText] = useState('');
    const [posting, setPosting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showBioInput, setShowBioInput] = useState(false);
    const [owner, setOwner] = useState(false);
    const [posts, setPosts] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);
    const bioRef = useRef();
    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const dispatch = useDispatch();

    useEffect(() => {
        const checkCLick = (e) => {
            if (showBioInput && !bioRef.current.contains(e.target)) {
                setShowBioInput(false)
            }
        }
        document.addEventListener('mousedown', checkCLick)
        return () => {
            document.removeEventListener('mousedown', checkCLick)
        }
    }, [showBioInput]);

    useEffect(() => {
        if (id === currentUser._id) {
            setOwner(true)
        } else {
            setOwner(false)
        }
    }, [id, currentUser])

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/post/my-posts/${id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setPosts(res.data.data)
                const arr = res.data.data;
                const filter = arr.filter(ele => ele.mediaType !== 'video')
                setFilterPosts(filter)
                setLoading(false)
            } catch (error) {
                console.log('something went wrong');
                setLoading(false)
            }
        }
        getPosts()
    }, [id])


    const addBio = async () => {
        if (!bioText) {
            return toast.error('Write something')
        }
        if (bioText?.length > 50) {
            return toast.error('50 characters allowed')
        }
        try {
            setPosting(true)
            const res = await axios.put(`/user/update-profile`, {
                bio: bioText
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                setPosting(false);
                dispatch(updateBio({ bio: bioText }))
            }
        } catch (error) {
            setPosting(false);
            toast.error('something went wrong')
        }
    }
    return (
        <div className={styles.posts} id='posts'>
            <ToastContainer className='toaster' />
            <div className={styles.left}>
                <div className={`${styles.left_wrapper} ${'custom_scroll'}`}>
                    <div className={styles.intro}>
                        <h3>Intro</h3>
                        {!showBioInput && owner
                            ? <button onClick={() => setShowBioInput(!showBioInput)}>Add Bio</button>
                            : showBioInput && owner && <div className={styles.edit_bio} ref={bioRef}>
                                <textarea
                                    value={bioText}
                                    onChange={(e) => setBioText(e.target.value)}
                                    placeholder='Describe who you are...
                                    in 50 words'
                                ></textarea>
                                <div className={styles.btns}>
                                    <div>{50 - bioText?.length} characters</div>
                                    <button onClick={() => setShowBioInput(!showBioInput)}>Cancel</button>
                                    <button
                                        disabled={!bioText}
                                        style={{ cursor: !bioText ? 'not-allowed' : 'pointer' }}
                                        onClick={addBio}
                                    > {posting ? 'Adding Bio...' : 'Save'}</button>
                                </div>
                            </div>}

                        <Details id={id} />

                        {owner && <button onClick={() => setShowEditDetailsModal(true)}>Edit Intro</button>}
                    </div>


                    <div className={styles.photos}>
                        <div className={styles.head}>
                            <span>Photos</span>
                            <Link className={styles.link} to={`/profile/${currentProfile?._id}/photos`}>See All Photos</Link>
                        </div>
                        <div className={styles.photos_}>
                            {
                                filterPosts?.map(post => (
                                    <div key={post._id}>
                                        <img src={post.mediaUrl} alt="post" />
                                    </div>
                                ))
                            }

                        </div>
                    </div>


                    <div className={styles.followers}>
                        <div className={styles.head}>
                            <span>Followers</span>
                            <Link className={styles.link} to={`/profile/${currentProfile?._id}/friends`}>See All Followers</Link>
                        </div>
                        <div className={styles.friends_count}>
                            {currentProfile?.followers?.length}{' '}
                            Follower{currentProfile?.followers?.length === 1 ? '' : "'s"}
                        </div>
                        <div className={styles.followers_}>
                            {
                                currentProfile?.followers?.map(p => (
                                    <Card key={p} id={p} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.right}>
                {owner && <CreatePost isGroupPost={false} />}
                {
                    posts?.length === 0 && <span style={{
                        fontSize: '3rem',
                        width: '100%',
                        display: 'grid',
                        placeItems: 'center'
                    }}>No Posts </span>
                }
                <>
                    {
                        posts?.map(post => (
                            <>
                                <PostCard key={post._id} post={post} loading={loading} />
                            </>
                        ))
                    }
                </>

            </div>
            {showEditDetailsModal && <EditDetailsModal setShowEditDetailsModal={setShowEditDetailsModal} />}
        </div>
    )
}

export default Posts