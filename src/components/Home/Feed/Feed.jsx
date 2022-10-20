import React, { useEffect } from 'react';
import styles from './Feed.module.scss';
import axios from '../../../config/axios';
import { useState } from 'react';
import PostCard from '../../PostCard/PostCard'


const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/post/get-all-posts', {
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

    return (
        <div className={styles.feeds}>
            {
                posts?.map((post => (
                    <PostCard key={post._id} post={post} loading={loading} />
                )))
            }
            {
                posts && <h2>No posts founds...</h2>
            }
        </div>
    )
}

export default Feed