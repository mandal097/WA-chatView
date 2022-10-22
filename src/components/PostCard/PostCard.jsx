import React from 'react';
import styles from './PostCard.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TaggedUser from '../_Modals/TaggedUsersModal/TaggedUser';
import Loading from '../Loading/Loading';
import {
    // HeartFilled,
    HeartOutlined,
    MessageOutlined,
    MoreOutlined,
    BookOutlined,
    SendOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Comment from '../Comment/Comment';

const PostCard = ({ post, loading }) => {
    const { currentUser } = useSelector(state => state.user);
    const [showTagsModal, setShowTagModal] = useState(false);

    const [commentText, setCommentText] = useState('');

    const postComment = async (e) => {
        e.preventDefault()
        if (!commentText) {
            return toast.error('Please write something')
        }
        try {
            console.log(commentText);
        } catch (error) {
            toast.error('something went wrong')
        }
    }
    if (loading) return <Loading font='8rem' color='white' />
    return (
        <div className={styles.postcard} key={post._id}>
            <ToastContainer className='toaster' />
            <div className={styles.post_details}>
                <div className={styles.user_image}>
                    <img src={post.userId?.profilePic} alt="image_" />
                </div>
                <div className={styles.details}>
                    <Link to={`/profile/${post?.userId._id}`} className={`${styles.link} ${styles.name_link}`}>{post.userId?.name}</Link>
                    <small>is with</small> {' '}
                    {post.tags?.slice(0, 3).map(tag => (
                        <Link to={`/profile/${tag._id}`} className={styles.link}>{tag.name}</Link>
                    ))}
                    {post.tags?.length > 4 &&
                        <div className={styles.more_tags}>
                            and <span onClick={() => setShowTagModal(true)}>{post.tags?.length - 3}{' '}others</span>
                        </div>}
                    {showTagsModal && <TaggedUser setShowTagModal={setShowTagModal} post={post} />}
                </div>
                <div className={styles.more}><MoreOutlined className={styles.icon} /></div>
            </div>
            <div className={styles.image}>
                <img src={post.mediaUrl} alt="post" />
            </div>
            <div className={styles.bottom}>
                <div className={styles.icons_}>
                    <div className={styles.left}>
                        <div className={styles.icons}>
                            {/* <HeartFilled  className={styles.icon}/> */}
                            <HeartOutlined className={styles.icon} />
                        </div>
                        <div className={styles.icons}>
                            <MessageOutlined className={styles.icon} />
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

                <div className={styles.counters}>
                    <small>89 likes</small>
                </div>

                <div className={styles.post_captions}>
                    <span>{post.userId?.name}</span>
                    <p>{post.text}</p>
                    <div>more</div>
                </div>

                <div className={styles.counters}>
                    <small> view all 310 comments</small>
                </div>

                <div className={styles.post_time}>
                    <small>22 hrs ago</small>
                </div>

                <Comment />
                <Comment />
                <div className={styles.comment_form}>
                    <div className={styles.img}>
                        <img src={currentUser?.profilePic} alt="" />
                    </div>
                    <input
                        type="text"
                        value={commentText}
                        placeholder={`comment as ${currentUser?.name}`}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={postComment}><SendOutlined /></button>
                </div>
            </div>
        </div>
    )
}

export default PostCard