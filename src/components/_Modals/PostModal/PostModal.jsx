import { SendOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../Comment/Comment';
import PostActions from '../../PostCard/PostActions';
import Modal from '../ModalLayout';
import styles from './PostModal.module.scss';
import axios from '../../../config/axios';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const PostModal = ({ setShowPostModal, post }) => {
    const { currentUser } = useSelector(state => state.user);
    const inputRef = useRef(null)
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const focusInput = () => {
        inputRef.current.focus()
    }

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comment/${post?._id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(res.data);
                if (res.data.status === 'err') {
                    toast.error(res.data.message)
                }
                if (res.data.status === 'success') {
                    setComments(res.data.data);
                }

            } catch (error) {
                toast.error('something went wrong')
            }
        }
        fetchComments()
    }, [post]);


    const postComment = async (e) => {
        e.preventDefault()
        if (!commentText) {
            return toast.error('Please write something')
        }
        try {
            const res = await axios.post(`/comment/${post?._id}`, { commentText: commentText }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setCommentText('');
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    
    return (
        <Modal
            width='80vw'
            height='max-content'
            margin='3rem 0'
            zIndex='100'
            head='♥ Sasta Facebook ♥'
            p_bottom={0}
            gap={0}
            onClick={() => setShowPostModal(false)}
        >
            <ToastContainer className='toaster' />
            <div className={styles.post_modal}>
                <div className={styles.img}>
                    <img src={post?.mediaUrl} alt="" />
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
                                <Comment key={comment._id} details={comment} />
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
                    />
                    <div className={styles.post_time}>
                        <small>22 hrs ago</small>
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
                            placeholder={`comment as ${currentUser?.name}`}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={postComment}><SendOutlined /></button>
                    </div>

                </div>
            </div>
        </Modal>
    )
}

export default PostModal