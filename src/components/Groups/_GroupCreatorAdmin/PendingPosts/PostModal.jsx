import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './PostModal.module.scss'

const PostModal = ({ setShowPostModal, post }) => {
    const ref = useRef(null);

    useEffect(() => {
        ref?.current?.scrollIntoView({bottom:10, behavior: 'smooth' })
    }, []);

    return (
        <div className={styles.post_modal}  ref={ref}>
            <div
                onClick={() => setShowPostModal(false)}
                className={styles.close}>
                <CloseOutlined className={styles.icon} />
            </div>
            <div className={styles.img}>
                <img src={post?.mediaUrl} alt="" />
            </div>
            <p>{post?.text}</p>
        </div>
    )
}

export default PostModal