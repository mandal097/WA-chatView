import React from 'react';
import styles from './GroupNameAvatar.module.scss';
import { ArrowLeftOutlined, ArrowRightOutlined, CameraOutlined } from '@ant-design/icons';
import axios from '../../../../config/axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { removeMembers } from '../../../../redux/AddToGroup';
// import uploadFile from '../../../../helpers/upload';
import { useUpload } from '../../../../hooks/useUpload';

const GroupNameAvatar = ({ setShowCreateGroup }) => {
    const { members } = useSelector(state => state.group);
    const [groupName, setGroupName] = useState('');
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(undefined);
    const dispatch = useDispatch();
    const { uploadPerc, url } = useUpload(img)

    const handleChange = (e) => {
        setImg(e.target.files[0]);
    }


    const createGroup = async (e) => {
        e.preventDefault()
        if (!groupName) {
            toast.error("Please give name to your group ")
        }
        try {
            // console.log(url);
            setLoading(true)
            const token = localStorage.getItem('token');
            const res = await axios.post('/chats/group/create-group', {
                name: groupName,
                users: members,
                groupAvatar: url
            }, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            console.log(res.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message);
            };
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setTimeout(() => {
                    dispatch(removeMembers());
                    setShowCreateGroup(false);
                }, 1000);
            };
            setLoading(false)
        } catch (error) {
            toast.error('something went wrong')
            setLoading(false)
        }
    };

    return (
        <div className={styles.group_name_avatar}>
            <ToastContainer className='toaster' />
            <div className={styles.header}>
                <div className={styles.header_wrapper}>
                    <ArrowLeftOutlined className={styles.icon} onClick={() => setShowCreateGroup(false)} />
                    <h2>New Group</h2>
                </div>
            </div>
            <div className={styles.img}>
                {
                    img ? <img src={URL.createObjectURL(img)} alt="" /> :
                        <img src="https://images.unsplash.com/photo-1533105045747-b9d71a0955f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YWN0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                }
                <label className={styles.add_img} htmlFor='groupAvatar'><CameraOutlined className={styles.icon} /></label>
                <input
                    type="file"
                    id="groupAvatar"
                    style={{ display: 'none' }}
                    accept='image/*'
                    onChange={handleChange}
                />
            </div>
            <div className={styles.name}>
                <input
                    type="text"
                    placeholder='Group subject'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>

            {!img &&
                <p style={{ fontSize: '1.6rem', textAlign: 'center' }}>Plase upload group avatar <br /></p>
            }
            {img &&
                <p style={{ fontSize: '1.6rem', textAlign: 'center' }}>Wait until your file is uploading <br />{uploadPerc}</p>
            }
            <button onClick={createGroup} style={{
                visibility: uploadPerc !== 100 ? 'hidden' : 'visible'
                // visibility: uploadPerc !== 100 ? 'not-allowed' : 'default'
            }}>
                {
                    loading ? "Wait...  " :
                        <>
                            Create Group <ArrowRightOutlined className={styles.icon} />
                        </>
                }
            </button>
        </div>
    )
}

export default GroupNameAvatar