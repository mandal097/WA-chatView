import React, { useEffect } from 'react';
import styles from './Feed.module.scss';
import axios from '../../../config/axios';
import { useState } from 'react';
import PostCard from '../../PostCard/PostCard'
import Loading from '../../Loading/Loading';
import CreatePost from '../../CreatePost/CreatePost';


const Feed = () => {
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

    if (loading) return <Loading font='10rem' color='white' />
    return (
        <div className={styles.feeds}>
            <CreatePost />
            {
                posts?.map((post => (
                    <PostCard key={post?._id} post={post} loading={loading} />
                )))
            }
            {
                posts.length === 0 && !loading && <h2  style={{ fontSize: '2.3rem', color: 'var(--error)', fontWeight: '200' }}>follow friends to show there feeds here ☺</h2>
            }
        </div>
    )
}

export default Feed