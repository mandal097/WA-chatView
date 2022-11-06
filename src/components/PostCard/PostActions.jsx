import React from 'react';
import styles from './PostActions.module.scss';
import {
    // HeartFilled,
    HeartOutlined,
    MessageOutlined,
    BookOutlined,
    SendOutlined,
    HeartFilled,
    FolderViewOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LikeModal from '../_Modals/LikesModal/LikeModal';

const PostActions = ({ onClick, post, showModal }) => {
    const { currentUser } = useSelector(state => state.user)
    const [liked, setLiked] = useState(post?.likes?.includes(currentUser._id));
    const [likes, setLikes] = useState(post?.likes?.length ? post?.likes?.length : 0);
    const [clicked, setClicked] = useState(false);
    const [showLikesModal, setShowLikesModal] = useState(false)



    const likeDislikePost = async () => {
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
            const res = await axios.put(`/post/like-dislike/${post?._id}`, {}, {
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
            <div className={styles.icons_}>
                <div className={styles.left}>
                    <div className={`${styles.icons} ${clicked && 'pop'}`} onClick={likeDislikePost}>
                        {
                            liked
                                ? <HeartFilled className={`${styles.icon} ${liked && styles.heart}`} />
                                : <HeartOutlined className={`${styles.icon} ${liked && styles.heart}`} />
                        }
                    </div>
                    <div className={styles.icons} onClick={onClick}>
                        <MessageOutlined className={styles.icon} />
                    </div>
                    <div className={styles.icons} onClick={showModal}>
                        <FolderViewOutlined className={styles.icon} />
                    </div>
                    <div className={styles.icons}>
                        <SendOutlined className={styles.icon} />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.icons}>
                        <BookOutlined className={styles.icon} />
                    </div>
                </div>
            </div>

            <div className={styles.counters} onClick={() => setShowLikesModal(true)}>
                <small>{likes} likes</small>
            </div>
            {
                showLikesModal &&
                <LikeModal
                    setShowLikesModal={setShowLikesModal}
                    likes={post?.likes}
                />
            }
        </>
    )
}

export default PostActions