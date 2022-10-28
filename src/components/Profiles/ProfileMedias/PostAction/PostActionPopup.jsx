import React, { useEffect, useRef } from 'react';
import styles from './PostActionPopup.module.scss';
import { DeleteFilled, DownloadOutlined, GlobalOutlined, TagsFilled } from '@ant-design/icons';
import axios from '../../../../config/axios';
import { toast, ToastContainer } from 'react-toastify';

const PostActionPopup = ({ left, top, setShowActionPopup, showActionPopup, post }) => {
    const actionPopupRef = useRef();

    const deletePost = async () => {
        try {
            const res = await axios.delete(`/post/delete/${post._id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    useEffect(() => {
        const checkClick = (e) => {
            if (showActionPopup && !actionPopupRef.current.contains(e.target)) {
                setShowActionPopup(false)
            }
        }
        document.addEventListener('mousedown', checkClick);

        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [showActionPopup, setShowActionPopup, actionPopupRef]);

    // function download(fileUrl, fileName) {
    //     let a = document.createElement("a");
    //     a.href = fileUrl;
    //     a.setAttribute("download", fileName);
    //     a.click();
    //    }

    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.actions_popup} ref={actionPopupRef} style={{
                top: `${top + 40}px`,
                left: `${left}px`
            }}>
                <div className={styles.wrapper}>
                    <ul>
                        <li>
                            <button>
                                <TagsFilled className={styles.icon} />
                                <span>Edit tagged friends</span>
                            </button>
                        </li>
                        <li>
                            <button>
                                <GlobalOutlined className={styles.icon} />
                                <span>Edit location</span>
                            </button>
                        </li>
                        <li>
                            <a href={post.mediaUrl+"?force=true"} download target='blank_'> 
                                <DownloadOutlined className={styles.icon} />
                                <span>Download</span>
                            </a>
                        </li>
                        <li>
                            <button onClick={deletePost}>
                                <DeleteFilled className={styles.icon} />
                                <span>Delete post</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default PostActionPopup