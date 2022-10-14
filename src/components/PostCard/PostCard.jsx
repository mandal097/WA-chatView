import React from 'react';
import styles from './PostCard.module.scss';
import {MoreOutlined} from '@ant-design/icons';

const PostCard = () => {
    return (
        <div className={styles.postcard}>
            <div className={styles.post_details}>
                <div className={styles.user_image}>
                    <img src="https://scontent.fdel27-2.fna.fbcdn.net/v/t1.6435-9/56649304_774018922980197_3401248377671778304_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Rk-DgYTjclIAX_S4vy2&_nc_ht=scontent.fdel27-2.fna&oh=00_AT9eSCDgEQoj87gX4Easc5gX55BljC8ZloWsghBThq7HJA&oe=636F8453" alt="image_" />
                </div>
                <div className={styles.details}>amarnath kumar mandal </div>
                <div className={styles.more}><MoreOutlined className={styles.icon} /></div>
            </div>
            <div className={styles.post_captions}>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, ullam qui necessitatibus a quidem natus, explicabo temporibus quas quaerat officia quae minus et hic accusamus laboriosam cupiditate reprehenderit dicta voluptatem.</p>
            </div>
            <div className={styles.image}>
                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX845-9s&_nc_ht=scontent.fdel27-5.fna&oh=00_AT_SW9iHdBGJo9taA8-mPOFF8aE5sUgedu0PPn1J50jz1g&oe=63709154" alt="" />
            </div>
        </div>
    )
}

export default PostCard