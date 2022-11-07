import React from 'react';
import styles from './CreatePost.module.scss';
import { CameraFilled, VideoCameraAddOutlined, VideoCameraFilled } from '@ant-design/icons';
import { useState } from 'react';
import CreatePostModal from '../_Modals/CreatePostModal/CreatePostModal';

const CreatePost = () => {
    const [showModal, setShowModal] = useState(false);
    const [mediaType, setMediaType] = useState('image')

    return (
        <div className={styles.create_post}>
            <div className={styles.top}>
                <img src="https://scontent.fdel27-2.fna.fbcdn.net/v/t1.6435-9/56649304_774018922980197_3401248377671778304_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Rk-DgYTjclIAX_S4vy2&_nc_ht=scontent.fdel27-2.fna&oh=00_AT9eSCDgEQoj87gX4Easc5gX55BljC8ZloWsghBThq7HJA&oe=636F8453" alt="image_" />
                <div className={styles.whats_new} onClick={() => setShowModal(true)}>What's in your mind?</div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.upload_option} onClick={() => {
                    setMediaType('image')
                    setShowModal(true)
                }} >
                    <CameraFilled className={styles.icon} style={{ color: 'lightgreen' }} />Photo
                </div>
                <div className={styles.upload_option} onClick={() => {
                    setMediaType('reels')
                    setShowModal(true)
                }} >
                    <VideoCameraAddOutlined className={styles.icon} style={{ color: 'yellow' }} />Reel
                </div>
                <div className={styles.upload_option} onClick={() => {
                    setMediaType('video')
                    setShowModal(true)
                }} >
                    <VideoCameraFilled className={styles.icon} style={{ color: 'coral' }} />Video
                </div>

            </div>
            {showModal &&
                <CreatePostModal
                    setShowModal={setShowModal}
                    mediaType={mediaType}
                />}
        </div>
    )
}

export default CreatePost