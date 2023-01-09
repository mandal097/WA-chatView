import React, { useEffect } from 'react';
import styles from './Feed.module.scss';
import axios from '../../../config/axios';
import { useState } from 'react';
import PostCard from '../../PostCard/PostCard'
import Loading from '../../Loading/Loading';
import GroupCard from '../GroupCard/GroupCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import CreatePost from '../../CreatePost/CreatePost';


const Feed = () => {
    const { currentGroup } = useSelector(state => state.currentGroup)
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/post/group-posts/${currentGroup?._id}`, {
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
    }, [currentGroup])

    if (loading) return <Loading font='10rem' color='white' />
    return (
        <div className={styles.feeds}>
            <div className={styles.feed_posts}>
                {/* <CreatePost/> */}
                {
                    posts?.map((post => (
                        <PostCard key={post?._id} post={post} loading={loading} />
                    )))
                }
                {
                    !posts && !loading && <h2>No posts founds...</h2>
                }
            </div>
            <div className={styles.friends_groups}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <span>Suggested  for you</span>
                        <p>Groups you might be interested in.</p>
                    </div>
                    <div className={styles.right}>
                        <Link className={styles.link} to='discover'>See all</Link>
                    </div>
                </div>
                <div>
                    <GroupCard />
                </div>
            </div>

        </div>
    )
}

export default Feed