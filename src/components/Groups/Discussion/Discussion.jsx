import React, { useEffect, useState } from 'react';
import CreatePost from '../../CreatePost/CreatePost';
import styles from './Discussion.module.scss';
import axios from '../../../config/axios';
// import Loading from '../../Loading/Loading';
import PostCard from '../../PostCard/PostCard';
import { EyeFilled, LockFilled } from '@ant-design/icons';

const Discussion = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/post/get-feed-posts', {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setPosts(res.data.data)
                setLoading(false)
            } catch (error) {
                console.log('something went wrong');
                setLoading(false)
            }
        }
        getPosts()
    }, [])

    // if (loading) return <Loading font='10rem' color='white' />
    return (
        <div className={styles.discussion}>
            <div className={styles.left}>
                <CreatePost />
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

                <div className={styles.privacy_desc}>
                    <div className={styles.desc}>
                        <div className={styles.icon_}>
                            <LockFilled className={styles.icon} />
                        </div>
                        <div className={styles.right_}>
                            <h6>Private</h6>
                            <p>Only members can see who's in the group and what they post.</p>
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <div className={styles.icon_}>
                            <EyeFilled className={styles.icon} />
                        </div>
                        <div className={styles.right_}>
                            <h6>Visible</h6>
                            <p>Anyone can find this group.</p>
                        </div>
                    </div>
                </div>
                
                <button>Learn More</button>
            </div>
        </div>
    )
}

export default Discussion