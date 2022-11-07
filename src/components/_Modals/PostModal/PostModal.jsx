import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../Comment/Comment';
import PostActions from '../../PostCard/PostActions';
import Modal from '../ModalLayout';
import styles from './PostModal.module.scss';
import axios from '../../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import { format } from 'timeago.js';

const PostModal = ({ setShowPostModal, post, comments, type }) => {
    const { currentUser } = useSelector(state => state.user);
    const inputRef = useRef(null)
    const [commentText, setCommentText] = useState('');
    const [placeholder, setPlaceholder] = useState(`comment as ${currentUser?.name}`);
    const [posting, setPosting] = useState(false);

    const focusInput = () => {
        inputRef.current.focus()
    }


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
            // console.log(res.data);
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


console.log(post);

    return (
        <Modal
            width='80vw'
            height='max-content'
            margin='3rem 0'
            zIndex='100000'
            head='♥ Sasta Facebook ♥'
            p_bottom={0}
            gap={0}
            onClick={() => setShowPostModal(false)}
        >
            <ToastContainer className='toaster' />
            <div className={styles.post_modal}>
                <div className={styles.img}>
                    {type === 'image'
                        ? <img src={post?.mediaUrl} alt="" />
                        :  <video src={post.mediaUrl} alt="post" controls autoPlay/>
                    }
                </div>
                <div className={styles.right}>

                    <div className={styles.head}>
                        <div className={styles.img_}>
                            <img src={post?.userId?.profilePic} alt="" />
                        </div>
                        <Link to={`/profile/${currentUser?._id}`} className={styles.link}>{post?.userId?.name}</Link>
                        <button>Follow</button>
                        {/* <button>Following</button> */}
                    </div>

                    <div className={`${styles.comments_div} ${'custom_scroll'}`}>
                        {
                            comments?.map(comment => (
                                <Comment
                                    key={comment._id}
                                    details={comment}
                                    setPlaceholder={setPlaceholder}
                                    inputRef={inputRef}
                                    post={post}
                                />
                            ))
                        }
                        {
                            comments.length < 1 &&
                            <h1 style={{
                                width: "100%",
                                height: '100%',
                                display: 'grid',
                                placeItems: 'center',
                                fontSize: '2rem',
                                fontWeight: '400'
                            }}>No comments yet</h1>
                        }
                    </div>

                    <PostActions
                        onClick={focusInput}
                        post={post}
                    />
                    <div className={styles.post_time}>
                        <small>{format(post?.createdAt)}</small>
                    </div>

                    <div className={styles.all_comments}>

                    </div>

                    <div className={styles.comment_form} >
                        <div className={styles.img}>
                            <img src={currentUser?.profilePic} alt="" />
                        </div>
                        <input
                            type="text"
                            ref={inputRef}
                            value={commentText}
                            placeholder={`${placeholder}`}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        {
                            !posting
                                ? <button onClick={postComment}><SendOutlined /></button>
                                : <button ><LoadingOutlined /></button>
                        }
                    </div>

                </div>
            </div>
        </Modal>
    )
}

export default PostModal