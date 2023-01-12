import React from 'react';
import styles from './Overview.module.scss';
import {
    ArrowRightOutlined,
    CameraOutlined,
    LikeOutlined,
    MessageOutlined
} from '@ant-design/icons';

const PostInsights = () => {
    return (
        <div className={styles.sections}>
            <h1>Insights summary</h1>
            <span>In the last 7 days</span>

            <div className={`${styles.insight_card} ${styles.card}`}>
                <div className={styles.icon_}>
                    <CameraOutlined className={styles.icon} />
                </div>
                <div className={styles.text}>
                    <span>Posts</span>
                </div>
                <div className={styles.count}><span>1</span></div>
                <div className={styles.icon_}>
                    <ArrowRightOutlined className={`${styles.icon} ${styles.small_icon}`} />
                </div>
                <div className={styles.count}><span style={{ fontSize: '1.3rem' }}>0%</span></div>
            </div>

            <div className={`${styles.insight_card} ${styles.card}`}>
                <div className={styles.icon_}>
                    <MessageOutlined className={styles.icon} />
                </div>
                <div className={styles.text}>
                    <span>Comments</span>
                </div>
                <div className={styles.count}><span>1</span></div>
                <div className={styles.icon_}>
                    <ArrowRightOutlined className={`${styles.icon} ${styles.small_icon}`} />
                </div>
                <div className={styles.count}><span style={{ fontSize: '1.3rem' }}>0%</span></div>
            </div>

            <div className={`${styles.insight_card} ${styles.card}`}>
                <div className={styles.icon_}>
                    <LikeOutlined className={styles.icon} />
                </div>
                <div className={styles.text}>
                    <span>Reactions</span>
                </div>
                <div className={styles.count}><span>1</span></div>
                <div className={styles.icon_}>
                    <ArrowRightOutlined className={`${styles.icon} ${styles.small_icon}`} />
                </div>
                <div className={styles.count}><span style={{ fontSize: '1.3rem' }}>0%</span></div>
            </div>

        </div>

    )
}

export default PostInsights