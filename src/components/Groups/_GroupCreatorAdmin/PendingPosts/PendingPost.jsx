import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './PendingPosts.module.scss'
import axios from '../../../../config/axios';
import { EyeFilled } from '@ant-design/icons';
import Loading from '../../../Loading/Loading';
import PostModal from './PostModal';
import { toast, ToastContainer } from 'react-toastify';

const Card = ({ id, groupId }) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState([]);
    const [showPostModal, setShowPostModal] = useState(false);
    const [loadOnClick, setLoadOnClick] = useState(false);
    const [approved, setApproved] = useState(false);
    const [declined, setDeclined] = useState(false)

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

    const handlePosts = async (params) => {
        try {
            setLoadOnClick(true);
            const res = await axios.put(`/groups/handle-pending-post/${groupId}`, {
                postId: id,
                confirmation: params
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setLoadOnClick(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setLoadOnClick(false);
                if (params === true) {
                    setApproved(true)
                }
                if (params === false) {
                    setDeclined(true)
                }
            }
        } catch (error) {
            toast.error('Something went wrong');
            setLoadOnClick(false);
        }
    }

    if (loading) return <Loading color='var(--text)' font='6rem' />
    return (
        <>
            <ToastContainer className='toaster' />
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
                        <EyeFilled className={styles.icon} />
                    </button>
                    <button onClick={() => handlePosts(true)} >
                        {loadOnClick ? 'Approving...' : approved ? 'Approved' : 'Approve'}
                    </button>
                    <button onClick={() => handlePosts(false)} >
                        {loadOnClick ? 'Declining...' : declined ? 'Declined' : 'Decline'}
                    </button>
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
                <div className={styles.refresh} onClick={() => window.location.reload()} >Refresh</div>
            </div>

            <div className={styles.bottom}>
                {
                    currentGroup?.pendingPost?.map(id => (
                        <Card key={id} id={id} groupId={currentGroup?._id} />
                    ))
                }
                {
                    currentGroup?.pendingPost?.length === 0 &&
                    <h1 style={{ fontSize: '2.3rem', color: 'var(--error)', fontWeight: '200' }}>No pending posts</h1>
                }
            </div>
        </div>
    )
}

export default PendingPost