import React from 'react';
import styles from './CreatePostModal.module.scss';
import { CloseOutlined, FileImageFilled } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../config/axios';
import { useUpload } from '../../../hooks/useUpload';
import { useEffect } from 'react';

const CreatePostModal = ({ setShowModal }) => {
    const { currentUser } = useSelector(state => state.user)
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState('');
    const [text, setText] = useState('');
    // const [uploadMedia, setUploadMedia] = useState(undefined);

    const { uploadPerc, url } = useUpload(img);

    useEffect(() => {
        if (img && text && uploadPerc === 100) {
            setActive(true)
        }
    }, [img, text,uploadPerc])


    const createPost = async (e) => {
        e.preventDefault();
        if (!img && !text) {
            toast.error('Please add all inputs')
        }
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post('/post/create', {
                userId: currentUser._id,
                mediaUrl: url,
                tags: ['633be8ffc375f1dc68973285', '634e6706a7a2c27d585d42b7'],
                text
            },
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
            if (res.data.status === 'err') {
                setActive(false);
                setLoading(false)
                // setUploadMedia(undefined);
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                setActive(false);
                setLoading(false);
                setImg('');
                setText('')
                toast.success(res.data.message)
                setTimeout(() => {
                    setShowModal(false)
                }, 200);
            }
            // console.log(url);
            console.log(res.data);
        } catch (error) {
            setLoading(false)
            toast.error('something went wrong')
        }
    }
    // }


    return (
        <div className={styles.add_post_modal}>
            <ToastContainer className='toaster' />
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
                            <textarea placeholder="What's new in your mind?"
                                value={text}
                                onChange={(e) => setText(e.target.value)}></textarea>
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
                    <button className={`${styles.submit}  ${!active && styles.in_active}`}
                        onClick={createPost}
                        disabled={!active}
                    >{!loading ? "Post" : "Posting..."}  </button>

                </div>
            </div>
        </div>
    )
}

export default CreatePostModal