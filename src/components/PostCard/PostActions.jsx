import React from 'react';
import styles from './PostActions.module.scss';
import {
    // HeartFilled,
    HeartOutlined,
    MessageOutlined,
    BookOutlined,
    SendOutlined
} from '@ant-design/icons';

const PostActions = ({onClick }) => {
    return (
        <>
            <div className={styles.icons_}>
                <div className={styles.left}>
                    <div className={styles.icons}>
                        {/* <HeartFilled  className={styles.icon}/> */}
                        <HeartOutlined className={styles.icon} />
                    </div>
                    <div className={styles.icons} onClick={onClick}>
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

        </>
    )
}

export default PostActions