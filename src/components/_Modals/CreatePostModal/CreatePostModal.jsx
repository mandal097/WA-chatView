import React from 'react';
import styles from './CreatePostModal.module.scss';
import { CloseOutlined, FileImageFilled } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../config/axios';
import { useUpload } from '../../../hooks/useUpload';
import { useEffect } from 'react';
import Tags from '../SelectUser/Tags';
import { removeMembers } from '../../../redux/AddToGroup'

const CreatePostModal = ({ setShowModal, mediaType, isGroupPost }) => {
    const { currentUser } = useSelector(state => state.user)
    const { currentGroup } = useSelector(state => state.currentGroup)
    const { members } = useSelector(state => state.group);
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false)
    const [media, setMedia] = useState('');
    const [text, setText] = useState('');
    const [showTag, setShowTag] = useState(false);
    const dispatch = useDispatch()
    const { uploadPerc, url } = useUpload(media);

    useEffect(() => {
        if (media && text && uploadPerc === 100) {
            setActive(true)
        }
    }, [media, text, uploadPerc])
    // console.log(isGroupPost);

    const createPost = async (e) => {
        e.preventDefault();
        if (!media && !text) {
            toast.error('Please add all inputs')
        }
        setLoading(true)
        try {
            const data = {
                userId: currentUser._id,
                mediaUrl: url,
                tags: members,
                text,
                mediaType
            }
            const token = localStorage.getItem('token')
            const res = isGroupPost ?

                await axios.post(`/post/create-group-post/${currentGroup?._id}`, data,
                    {
                        headers: {
                            token: `Bearer ${token}`
                        }
                    }) :
                await axios.post('/post/create', data,
                    {
                        headers: {
                            token: `Bearer ${token}`
                        }
                    })

            if (res.data.status === 'err') {
                setActive(false);
                setLoading(false)
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                setActive(false);
                setLoading(false);
                toast.success(res.data.message)
                setMedia('');
                setText('');
                dispatch(removeMembers())
                setTimeout(() => {
                    setShowModal(false)
                }, 200);
            }
            // console.log(url);
            // console.log(res.data);
        } catch (error) {
            setLoading(false)
            toast.error('something went wrong')
        }
    }
    // }


    return (
        <>
            <div className={styles.add_post_modal}>
                <ToastContainer className='toaster' />
                <div className={styles.body}>
                    <div className={styles.close} onClick={() => {
                        dispatch(removeMembers())
                        setShowModal(false)
                    }}>
                        <CloseOutlined className={styles.icon} />
                    </div>
                    <div className={styles.head}>Create Post</div>
                    <div className={styles.wrapper}>
                        <div className={styles.user_details}>
                            <div className={styles.img}>
                                <img src={currentUser?.profilePic} alt="" />
                            </div>
                            <div className={styles.name}>
                                <span>{currentUser?.name}</span>
                            </div>
                        </div>
                        <div className={styles.post_inputs}>


                            {
                                mediaType !== 'image'
                                    ?
                                    <>
                                        <div className={styles.inputs}>
                                            {
                                                uploadPerc === 100 &&
                                                <textarea placeholder="Write something for it..."
                                                    className='textarea'
                                                    value={text}
                                                    onChange={(e) => setText(e.target.value)}></textarea>
                                            }
                                        </div>
                                        <div className={styles.media}>

                                            <input
                                                // style={{ display: 'none' }}
                                                type="file"
                                                id='video'
                                                accept='video/*'
                                                onChange={(e) => setMedia(e.target.files[0])}
                                            />
                                            <div className={styles.perc}> {uploadPerc > 0 && "Uploading" + uploadPerc + "%"}</div>
                                            <label htmlFor='video' className={styles.add_media}>Change</label>
                                            <div className={styles.add_media} onClick={() => setShowTag(true)}> {members?.length ? members?.length + ' Tagged friends' : 'Tag friends 👨🏾‍🤝‍👨🏾'} </div>
                                        </div>
                                    </>
                                    :

                                    <>
                                        <div className={styles.inputs}>
                                            {
                                                uploadPerc === 100 &&
                                                <textarea placeholder="Write something for it..."
                                                    value={text}
                                                    onChange={(e) => setText(e.target.value)}></textarea>
                                            }
                                        </div>
                                        <div className={styles.media}>
                                            {media
                                                ? <img src={URL.createObjectURL(media)} alt="" />
                                                : <label className={styles.dummy} htmlFor='img'>
                                                    <div className={styles.add}>
                                                        <FileImageFilled className={styles.icon} />
                                                        <span>Choose your media</span>
                                                    </div>
                                                </label>
                                            }
                                        </div>
                                        <div className={styles.perc}> {uploadPerc > 0 && "Uploading" + uploadPerc + "%"}</div>
                                        <label htmlFor='img' className={styles.add_media}>Change</label>
                                        <div className={styles.add_media} onClick={() => setShowTag(true)}> {members?.length ? members?.length + ' Tagged friends' : 'Tag friends 👨🏾‍🤝‍👨🏾'} </div>
                                        <input
                                            style={{ display: 'none' }}
                                            type="file"
                                            id='img'
                                            accept='image/*'
                                            onChange={(e) => setMedia(e.target.files[0])}
                                        />
                                    </>
                            }
                        </div>
                        <button className={`${styles.submit}  ${!active && styles.in_active}`}
                            onClick={createPost}
                            disabled={!active}
                        >{!loading ? "Post" : "Posting..."}  </button>

                    </div>
                </div>
            </div>
            {
                showTag && <Tags
                    setShowTag={setShowTag}
                />
            }
        </>
    )
}

export default CreatePostModal