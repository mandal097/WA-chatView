import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Comment.module.scss';
import {
    HeartFilled,
    // HeartFilled,
    HeartOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../config/axios';


const Replies = () => {
    const { currentUser } = useSelector(state => state.user)
    return (

        <div className={styles.comment} style={{ margin: '1rem 0' }}> {/*replies to comments */}
            <div className={styles.img}>
                <img src={currentUser?.profilePic} alt="" />
            </div>
            <div className={styles.comment_wrapper}>
                <div className={styles.comment_details}>
                    <Link to={`/profile/${currentUser?._id}`} className={styles.link}>{currentUser?.name}</Link>
                    <p>Lorem ipsum dolor sit amet consectett.</p>
                    <div className={styles.cta_}>
                        <small>1 h </small>
                        <small>5 likes </small>
                        <div className={styles.like}>
                            {/* <HeartFilled className={styles.icon}/> */}
                            <HeartOutlined className={styles.icon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Comment = ({ details }) => {
    const [show, setShow] = useState(false)
    const repliesRef = useRef(null);
    const { currentUser } = useSelector(state => state.user);
    const [liked, setLiked] = useState(details.likes?.includes(currentUser._id));
    const [clicked, setClicked] = useState(true)
    console.log(liked);

    const showReplies = (param) => {
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
                break;
            case false:
                setLiked(true);
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
                                <small>1 h </small>
                                <small>5 likes </small>
                                <small>1 reply </small>

                                <div className={`${styles.like} ${clicked && styles.pop}`} onClick={likeDislikeComment}>
                                    {
                                        liked
                                            ? <HeartFilled className={styles.icon} />
                                            : <HeartOutlined className={styles.icon} />
                                    }

                                </div>
                               
                            </div>
                        </div>


                        {
                            !show &&
                            <div className={styles.show_reply} onClick={() => showReplies('show')}>
                                _____ show replies
                            </div>
                        }

                        <div ref={repliesRef} style={{ display: 'none' }}>
                            <Replies />
                            <Replies />
                            <Replies />
                            <Replies />
                        </div>

                        {show &&
                            <div className={styles.show_reply} onClick={() => showReplies('hide')}>
                                _____ hide replies
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment