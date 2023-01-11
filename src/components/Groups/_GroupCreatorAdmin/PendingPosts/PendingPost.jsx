import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './PendingPosts.module.scss'
import axios from '../../../../config/axios';
import { EyeFilled } from '@ant-design/icons';
import Loading from '../../../Loading/Loading';
import PostModal from './PostModal';

const Card = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState([]);
    const [showPostModal, setShowPostModal] = useState(false);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/post/get/${id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setPost(res.data.data)
                setLoading(false)
            } catch (error) {
                console.log('something went wrong');
                setLoading(false)
            }
        }
        getPosts()
    }, [id])

    // console.log(post);

    if (loading) return <Loading color='var(--text)' font='6rem' />
    return (
        <>
            <div className={styles.card}>
                <div className={styles.img}>
                    <img src={post?.userId?.profilePic} alt={post?.userId?.name} />
                </div>
                <div className={styles.name}>
                    <small>posted by</small>
                    <span>{post?.userId?.name}</span>
                </div>
                <div className={styles.btns}>
                    <button onClick={() => setShowPostModal(!showPostModal)}>
                        <EyeFilled className={styles.icon} /></button>
                    <button>Approve</button>
                    <button>Decline</button>
                </div>
            </div>
            {
                showPostModal &&
                <PostModal
                    post={post}
                    setShowPostModal={setShowPostModal}
                />
            }
        </>
    )
}

const PendingPost = () => {
    const { currentGroup } = useSelector(state => state.currentGroup)
    return (
        <div className={styles.pending_posts}>
            <div className={styles.top}>
                <h1>Pending posts</h1>
                <div className={styles.search_box}>
                    <input type="text" placeholder='Search by name of user' />
                </div>
            </div>

            <div className={styles.bottom}>
                {
                    currentGroup?.pendingPost?.map(id => (
                        <Card key={id} id={id} />
                    ))
                }
            </div>
        </div>
    )
}

export default PendingPost