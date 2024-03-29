import React, { useEffect } from 'react';
import styles from './PostCard.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TaggedUser from '../_Modals/TaggedUsersModal/TaggedUser';
import Loading from '../Loading/Loading';
import {
    LoadingOutlined,
    MoreOutlined,
    SendOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import PostModal from '../_Modals/PostModal/PostModal';
import { useRef } from 'react';
import PostActions from './PostActions';
import axios from '../../config/axios';
import { format } from 'timeago.js';
import { capitalizeFirstLetter } from '../../helpers/strings';

const PostCard = ({ post, loading }) => {
    const { currentUser } = useSelector(state => state.user);
    const [showTagsModal, setShowTagModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [posting, setPosting] = useState(false);

    const vidRef = useRef()
    const inputRef = useRef()

    const postComment = async (e) => {
        e.preventDefault()
        if (!commentText) {
            return toast.error('Please write something')
        }
        try {
            setPosting(true);
            const res = await axios.post(`/comment/${post?._id}`, { commentText: commentText }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
                setPosting(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setCommentText('');
                setPosting(false);
            }
        } catch (error) {
            toast.error('something went wrong')
            setPosting(false);
        }
    }


    const focusInput = () => {
        const input_ = inputRef.current
        input_ && input_.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'start'
        });
        setTimeout(() => {
            input_.focus()
        }, 400);
    };


    useEffect(() => {
        const fetchComments = async () => {
            // try {
            const res = await axios.get(`/comment/${post?._id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                setComments(res.data.data);
            }
        }
        fetchComments()
    }, [post]);


    if (loading) return <Loading font='8rem' color='white' />
    return (
        <div className={styles.postcard} key={post._id}>
            <ToastContainer className='toaster' />
            <div className={styles.post_details}>
                <div className={styles.user_image}>
                    <img src={post.userId?.profilePic} alt="image_" />
                </div>
                <div className={styles.details}>
                    <Link to={`/profile/${post?.userId._id}`} className={`${styles.link} ${styles.name_link}`}>{capitalizeFirstLetter(post.userId?.name)}</Link>
                    <small>  {post.tags?.length > 0 && 'is with'}</small> {' '}
                    {post.tags?.slice(0, 3).map(tag => (
                        <Link to={`/profile/${tag._id}`} className={styles.link}>{capitalizeFirstLetter(tag.name)}</Link>
                    ))}
                    {post.tags?.length > 4 &&
                        <div className={styles.more_tags}>
                            and <span onClick={() => setShowTagModal(true)}>{post.tags?.length - 3}{' '}others</span>
                        </div>}
                    {showTagsModal && <TaggedUser setShowTagModal={setShowTagModal} post={post} />}
                </div>
                <div className={styles.more}><MoreOutlined className={styles.icon} /></div>
            </div>
            {post.mediaType === 'image'
                ? <div className={styles.image}>
                    <img src={post.mediaUrl} alt="post" />
                </div>
                : <div className={styles.video}>
                    <video src={post.mediaUrl} alt="post" controls ref={vidRef} />
                </div>
            }
            <div className={styles.bottom}>

                {/* ------------------------ */}

                <PostActions
                    type='postCard'
                    post={post}
                    showModal={() => setShowPostModal(true)}
                    vidRef={vidRef}
                    onClick={focusInput} />
                {/* ------------------------------ */}

                <div className={styles.post_captions}>
                    <p>
                        <span>{capitalizeFirstLetter(post.userId?.name)}</span>
                        {post.text}
                        {/* <div >Read less...</div> */}
                    </p>
                </div>

                {
                    comments.length > 0 &&
                    <div className={styles.counters}>
                        <small onClick={() => {
                            vidRef.current?.pause()
                            setShowPostModal(true)
                        }}
                        > view {comments.length > 1 ? "all" : ""} {comments?.length} comment{comments.length > 1 && "'s"}</small>
                    </div>
                }

                <div className={styles.post_time}>
                    <small>{format(post?.createdAt)}</small>
                </div>

                {/* <Comment />
                <Comment /> */}
                <div className={styles.comment_form} >
                    <div className={styles.img}>
                        <img src={currentUser?.profilePic} alt="" />
                    </div>
                    <input
                        type="text"
                        ref={inputRef}
                        value={commentText}
                        placeholder={`comment as ${capitalizeFirstLetter(currentUser?.name)}`}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    {
                        !posting
                            ? <button onClick={postComment}><SendOutlined /></button>
                            : <button ><LoadingOutlined /></button>
                    }
                </div>
            </div>
            {
                showPostModal &&
                <PostModal
                    setShowPostModal={setShowPostModal}
                    post={post}
                    comments={comments}
                    type={post.mediaType}
                    vidRef={vidRef}
                />
            }
        </div>
    )
}

export default PostCard