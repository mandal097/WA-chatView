import React from 'react';
import styles from './AddPostModal.module.scss';
import { CloseOutlined, FileImageFilled } from '@ant-design/icons';
import { useState } from 'react';

const AddPostModal = ({ setShowModal }) => {
    const [active, setActive] = useState(false);
    const [img, setImg] = useState('');
    return (
        <div className={styles.add_post_modal}>
            <div className={styles.body}>
                <div className={styles.close} onClick={() => setShowModal(false)}>
                    <CloseOutlined className={styles.icon} />
                </div>
                <div className={styles.head}>Create Post</div>
                <div className={styles.wrapper}>
                    <div className={styles.user_details}>
                        <div className={styles.img}>
                            <img src="https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>
                        <div className={styles.name}>
                            <span>Amarnath kumar mandal</span>
                        </div>
                    </div>
                    <div className={styles.post_inputs}>
                        <div className={styles.inputs}>
                            <textarea placeholder="What's new in your mind"></textarea>
                        </div>
                        <div className={styles.media}>
                            {img
                                ? <img src={URL.createObjectURL(img)} alt="" />
                                : <label className={styles.dummy} htmlFor='img'>
                                    <div className={styles.add}>
                                        <FileImageFilled className={styles.icon} />
                                        <span>Choose your media</span>
                                    </div>
                                </label>
                            }
                        </div>
                        <label htmlFor='img' className={styles.add_media}>Change</label>
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            id='img'
                            accept='image/*'
                            onChange={(e) => setImg(e.target.files[0])}

                        />
                    </div>
                    <button className={`${styles.submit}  ${!active && styles.in_active}`}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default AddPostModal