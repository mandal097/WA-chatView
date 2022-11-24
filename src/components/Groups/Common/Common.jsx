import React, { useEffect, useState } from 'react';
import CreatePost from '../../CreatePost/CreatePost';
import styles from './Common.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';
import PostCard from '../../PostCard/PostCard';
import { EyeFilled, EyeInvisibleFilled, GlobalOutlined, LockFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Desc from '../Desc/Desc';
import PrivacyStat from '../PrivacyStat/PrivacyStat';

const Common = ({ type }) => {
    const { currentUser } = useSelector(state => state.user);
    const { currentGroup } = useSelector(state => state.currentGroup)
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = location.pathname.split('/')[2]

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                if (type === 'featured') {
                    const res = await axios.get(`/post/my-posts/${currentUser?._id}`, {
                        headers: {
                            token: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    setPosts(res.data.data)
                }
                if (type === 'discussion') {
                    const res = await axios.get('/post/get-feed-posts', {
                        headers: {
                            token: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    setPosts(res.data.data)
                }
                if (type === 'videos') {
                    const res = await axios.get('/post/get-feed-posts', {
                        headers: {
                            token: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    const arr = (res.data.data)
                    const filter = arr.filter(ele => ele.mediaType === 'video')
                    setPosts(filter)
                }
                setLoading(false)
            } catch (error) {
                console.log('something went wrong');
                setLoading(false)
            }
        }
        getPosts()
    }, [type, currentUser])

    if (loading) return <Loading font='10rem' color='white' />
    return (
        <div className={styles.discussion}>
            <div className={styles.left}>
                {type === 'discussion' && <CreatePost />}
                <div className={styles.posts}>
                    {
                        posts?.map((post => (
                            <PostCard key={post?._id} post={post} loading={loading} />
                        )))
                    }
                    {
                        !posts && !loading && <h2>No posts founds...</h2>
                    }
                </div>
            </div>

            <div className={styles.about}>
                <h3>About</h3>
                <p>This is a DOer's community.</p>
                <Desc />
                {currentGroup?.isPrivate === 'public'
                    ? <PrivacyStat
                        span='Public'
                        p="Anyone can see group content and who follows the group."
                        icon={<GlobalOutlined className={styles.icon} />}
                    />
                    : <PrivacyStat
                        span='Private'
                        p="Only members can see who's in the group and what they post.."
                        icon={<LockFilled className={styles.icon} />}
                    />}
                {currentGroup?.visibility==='visible'
                    ? <PrivacyStat
                        span='Visible'
                        p="Anyone can find this group."
                        icon={<EyeFilled className={styles.icon} />}
                    />
                    : <PrivacyStat
                        span='Hidden'
                        p="Only members can find this group."
                        icon={<EyeInvisibleFilled className={styles.icon} />}
                    />}
                <button onClick={() => navigate(`/groups/${groupId}/about`)}>Learn More</button>
            </div>
        </div>
    )
}

export default Common