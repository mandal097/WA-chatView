import React from 'react';
import styles from './PostCard.module.scss';
import { MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TaggedUser from '../_Modals/TaggedUsersModal/TaggedUser';
// import Loading from '../Loading/Loading';
// import axios from '../../config/axios';
// import { useEffect } from 'react';

const PostCard = ({ post }) => {
    const [showTagsModal, setShowTagModal] = useState(false);
    return (
        <div className={styles.postcard}>
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
                    {showTagsModal && <TaggedUser setShowTagModal={setShowTagModal} post={post}/>}
                </div>
                <div className={styles.more}><MoreOutlined className={styles.icon} /></div>
            </div>
            <div className={styles.post_captions}>
                <p>{post.text}</p>
            </div>
            <div className={styles.image}>
                <img src={post.mediaUrl} alt="post" />
            </div>
        </div>
    )
}

export default PostCard