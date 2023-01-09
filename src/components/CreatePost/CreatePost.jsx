import React from 'react';
import styles from './CreatePost.module.scss';
import { CameraFilled, VideoCameraAddOutlined, VideoCameraFilled } from '@ant-design/icons';
import { useState } from 'react';
import CreatePostModal from '../_Modals/CreatePostModal/CreatePostModal';
import { useSelector } from 'react-redux';

const CreatePost = ({isGroupPost}) => {
    const [showModal, setShowModal] = useState(false);
    const [mediaType, setMediaType] = useState('image')
    const {currentUser} = useSelector(state =>state.user)

    return (
        <div className={styles.create_post}>
            <div className={styles.top}>
                <img src={currentUser?.profilePic} alt="image_" />
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
                    isGroupPost={isGroupPost}
                />}
        </div>
    )
}

export default CreatePost