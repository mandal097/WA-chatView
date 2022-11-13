import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Comment.module.scss';
import {
    DeleteFilled,
    HeartFilled,
    // HeartFilled,
    HeartOutlined,
    LoadingOutlined,
    SendOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../config/axios';
import { format } from 'timeago.js'
import LikeModal from '../_Modals/LikesModal/LikeModal';



const Replies = ({ replyDetails }) => {
    const { currentUser } = useSelector(state => state.user);
    const [replyText, setReplyText] = useState('');
    const [liked, setLiked] = useState(replyDetails.likes?.includes(currentUser._id));
    const [clicked, setClicked] = useState(true);
    const [showLikesModal, setShowLikesModal] = useState(false)
    const [likes, setLikes] = useState(replyDetails.likes?.length)
    const [posting, setPosting] = useState(false);
    // console.log(replyDetails);
    const inputRef = useRef(null);


    const handleReply = () => {
        const div_ = inputRef.current
        if (div_.style.display === 'none') {
            div_.style.display = 'flex'
            div_ && div_.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'start'
            });
            setTimeout(() => {
                div_.focus()
            }, 400);
        } else {
            div_.style.display = 'none'
        }
    }




    const likeDislikeComment = async () => {
        switch (liked) {
            case true:
                setLiked(false);
                setLikes((prev) => prev - 1)
                break;
            case false:
                setLiked(true);
                setLikes((prev) => prev + 1)
                break;
            default:
                setLiked(false)
        }
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 300);
        try {
            const res = await axios.put(`/comment/like-dislike/${replyDetails?._id}`, {}, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            // if (res.data.status === 'success') {
            //     toast.success(res.data.message);
            // }
        } catch (error) {
            toast.error('something went wrong')
        }
    }



    const postReply = async () => {
        if (!replyText) {
            return toast.error('Please write somethings')
        }
        try {
            setPosting(true);
            const res = await axios.post(`/comment/${replyDetails?.postId}`, {
                commentText: replyText,
                parentCommentId: replyDetails?.parentCommentId,
                repliedTo: replyDetails?.userId?._id,
                isReply: true
            }, {
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
                setReplyText('');
                setPosting(false);
            }
        } catch (error) {
            toast.error('something went wrong')
            setPosting(false);
        }
    };

    const deleteComment = async () => {
        try {
            const res = await axios.delete(`/comment/delete/${replyDetails?._id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.comment} style={{ margin: '1rem 0' }}> {/*replies to comments */}
                <div className={styles.img}>
                    <img src={replyDetails?.userId?.profilePic} alt="" />
                </div>
                <div className={styles.comment_wrapper}>
                    <div className={styles.comment_details}>
                        <div className={styles.users}>
                            <Link to={`/profile/${replyDetails?.userId?._id}`} className={styles.link}>{(replyDetails?.userId?.name).split(' ')[0]}</Link>
                            {''} <small style={{ fontSize: '1.2rem',color:'var(--text)'}}>replied to</small>  {' '}
                            <Link to={`/profile/${replyDetails?.repliedTo?._id}`} className={styles.link}>{(replyDetails?.repliedTo?.name).split(' ')[0]}</Link>
                        </div>
                        <p>{replyDetails?.commentText}</p>
                        <div className={styles.cta_}>
                            <small>{format(replyDetails?.createdAt)} </small>
                            <small onClick={() => setShowLikesModal(true)}>{likes} likes </small>
                            <small onClick={handleReply}>reply </small>
                            {
                                Object.values(replyDetails?.userId).includes(currentUser._id) &&
                                <div className={styles.delete} onClick={deleteComment}>
                                    <DeleteFilled className={styles.icon} />
                                </div>
                            }

                            <div className={`${styles.like} ${clicked && styles.pop}`} onClick={likeDislikeComment}>
                                {
                                    liked
                                        ? <HeartFilled className={styles.icon} />
                                        : <HeartOutlined className={styles.icon} />
                                }
                            </div>
                        </div>
                    </div>

                    <div className={styles.input} ref={inputRef}>
                        <div className={styles.img}>
                            <img src={currentUser?.profilePic} alt="profile" />
                        </div>
                        <input
                            type="text"
                            autoFocus
                            value={replyText}
                            placeholder={`reply to ${replyDetails?.userId?.name}`}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        {
                            !posting
                                ? <button onClick={postReply}><SendOutlined /></button>
                                : <button ><LoadingOutlined /></button>
                        }
                    </div>

                </div>
            </div>
            {
                showLikesModal &&
                <LikeModal
                    setShowLikesModal={setShowLikesModal}
                    likes={replyDetails?.likes}
                />
            }
        </>
    )
}

export default Replies