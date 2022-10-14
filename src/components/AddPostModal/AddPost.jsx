import React from 'react';
import styles from './addPost.module.scss';
import { CameraFilled ,VideoCameraFilled} from '@ant-design/icons';

const AddPost = () => {
    return (
        <div className={styles.add_post_modal}>
            <div className={styles.top}>
                <img src="https://scontent.fdel27-2.fna.fbcdn.net/v/t1.6435-9/56649304_774018922980197_3401248377671778304_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Rk-DgYTjclIAX_S4vy2&_nc_ht=scontent.fdel27-2.fna&oh=00_AT9eSCDgEQoj87gX4Easc5gX55BljC8ZloWsghBThq7HJA&oe=636F8453" alt="image_" />
                <div className={styles.whats_new}>What's in your mind?</div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.upload_option}>
                    <CameraFilled className={styles.icon} style={{color:'lightgreen'}}/>Photo
                </div>
                <div className={styles.upload_option}>
                <VideoCameraFilled className={styles.icon} style={{color:'coral'}} />Video
                </div>
                {/* <div className={styles.upload_option}>
                    <CameraFilled className={styles.icon} />Photo
                </div> */}
            </div>
        </div>
    )
}

export default AddPost