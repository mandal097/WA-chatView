import React from 'react';
import styles from './PostCard.module.scss';

const PostCard = () => {
  return (
    <div className={styles.postcard}>
        <div className={styles.post_details}>
            <div className={styles.user_image}>
            <img src="https://scontent.fdel27-2.fna.fbcdn.net/v/t1.6435-9/56649304_774018922980197_3401248377671778304_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Rk-DgYTjclIAX_S4vy2&_nc_ht=scontent.fdel27-2.fna&oh=00_AT9eSCDgEQoj87gX4Easc5gX55BljC8ZloWsghBThq7HJA&oe=636F8453" alt="image_" />
            </div>
        </div>
        <div className={styles.image}></div>
    </div>
  )
}

export default PostCard