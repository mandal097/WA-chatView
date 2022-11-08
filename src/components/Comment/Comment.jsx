import React, { useEffect, useState } from 'react';
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
import Replies from './Replies';


const Comment = ({ details, post }) => {
    const [show, setShow] = useState(false)
    const { currentUser } = useSelector(state => state.user);
    const [liked, setLiked] = useState(details.likes?.includes(currentUser._id));
    const [clicked, setClicked] = useState(false);
    const [likes, setLikes] = useState(details.likes?.length)
    const [showLikesModal, setShowLikesModal] = useState(false)
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState([]);
    const [posting, setPosting] = useState(false);

    const inputRef = useRef(null)
    const repliesRef = useRef(null);


    const handleReplies = (param) => {
        if (param === 'show') {
            repliesRef.current.style.display = 'block'
            setShow(true)
        } else {
            repliesRef.current.style.display = 'none'
            setShow(false)

        }
    };



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
            const res = await axios.put(`/comment/like-dislike/${details?._id}`, {}, {
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

    const deleteComment = async () => {
        try {
            const res = await axios.delete(`/comment/delete/${details?._id}`, {
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


    const handleReply = () => {
        const div_ = inputRef.current
        if (div_.style.display === 'none') {
            div_.style.display = 'flex'
        } else {
            div_.style.display = 'none'
        }
    }

    const postReply = async () => {
        if (!replyText) {
            return toast.error('Please write somethings')
        }
        try {
            setPosting(true);
            const res = await axios.post(`/comment/${post?._id}`, {
                commentText: replyText,
                parentCommentId: details?._id,
                repliedTo: details?.userId,
                isReply: true
            }, {
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
                // setReplies(prev => [...prev, res.data.data])
                setReplyText('');
                setPosting(false);
            }
        } catch (error) {
            toast.error('something went wrong')
            setPosting(false);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            const res = await axios.get(`/comment/replies/${details?._id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                setReplies(res.data.data);
            }

            // } catch (error) {
            //     toast.error('something went wrong')
            // }
        }
        fetchComments()
    }, [details, post])


    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.comments}>
                <div className={styles.comment}>
                    <div className={styles.img}>
                        <img src={details?.userId?.profilePic} alt="" />
                    </div>
                    <div className={styles.comment_wrapper}>
                        <div className={styles.comment_details}>
                            <Link to={`/profile/${details?.userId?._id}`} className={styles.link}>{details?.userId?.name}</Link>
                            <p>{details?.commentText}</p>
                            <div className={styles.cta_}>
                                <small>{format(details.createdAt)} </small>
                                <small onClick={() => setShowLikesModal(true)}>{likes} likes </small>
                                <small onClick={handleReply}>reply </small>
                                {
                                    Object.values(details?.userId).includes(currentUser._id) &&
                                    <div className={styles.delete} onClick={deleteComment}>
                                        <DeleteFilled className={styles.icon} />
                                    </div>
                                }
                                <div className={`${styles.like} ${clicked && 'pop'}`} onClick={likeDislikeComment}>
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
                                placeholder={`reply to ${details.userId?.name}`}
                                onChange={(e) => setReplyText(e.target.value)}
                            />
                            {
                                !posting
                                    ? <button onClick={postReply}><SendOutlined /></button>
                                    : <button ><LoadingOutlined /></button>
                            }
                        </div>


                        {
                            !show && replies?.length > 0 &&
                            <div className={styles.show_reply} onClick={() => handleReplies('show')}>
                                _____ View {replies.length}  replies
                            </div>
                        }

                        <div ref={repliesRef} style={{ display: 'none' }}>
                            {
                                replies?.map(reply => (
                                    <Replies
                                        key={reply?._id}
                                        replyDetails={reply}
                                        post={post}

                                    />
                                ))
                            }

                        </div>

                        {show &&
                            <div className={styles.show_reply} onClick={() => handleReplies('hide')}>
                                _____ Hide replies
                            </div>
                        }

                    </div>
                </div>
            </div>
            {
                showLikesModal &&
                <LikeModal
                    setShowLikesModal={setShowLikesModal}
                    likes={details?.likes}
                />
            }
        </>
    )
}

export default Comment