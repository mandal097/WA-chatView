import React, { useEffect, useRef } from 'react';
import Details from '../Profiles/Details/Details';
import styles from './ProfileSidebar.module.scss';
import {
    CloseOutlined,
    EditFilled,
    LogoutOutlined,
    SecurityScanFilled,
    UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentChatInitial } from '../../redux/chatRedux';
import { removeMembers } from '../../redux/AddToGroup';
import { logout } from '../../redux/userRedux';
import EditProfileModal from '../_Modals/EditProfileModal/EditProfileModal';
import { useState } from 'react';

const ProfileSidebar = ({ showProfileSidebar, setShowProfileSidebar, user }) => {
    const ref = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    useEffect(() => {
        const checkClick = (e) => {
            if (showProfileSidebar && !ref.current.contains(e.target) && !showEditProfileModal) {
                setShowProfileSidebar(false)
            }
        }
        document.addEventListener('mousedown', checkClick);
        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [showProfileSidebar, setShowProfileSidebar, showEditProfileModal]);

    useEffect(() => {
        if (showEditProfileModal === true) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [showEditProfileModal]);

    const goToProfile = () => {
        navigate(`/profile/${user?._id}`);
        setShowProfileSidebar(false);
    }

    const handleResetBtn = () => {
        navigate(`/reset-password`);
        setShowProfileSidebar(false);
    }


    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        dispatch(logout());
        dispatch(removeMembers());
        dispatch(setCurrentChatInitial())
        navigate('/login');
        setShowProfileSidebar(false);
    };

    return (
        <>
            <div className={styles.container}>
                <div
                    className={styles.profile_sidebar}
                    ref={ref}
                    style={{ translate: showEditProfileModal ? '30rem' : '0' }}
                >
                    <div className={styles.close} onClick={() => setShowProfileSidebar(false)}>
                        <CloseOutlined className={styles.icon} />
                    </div>
                    <div className={styles.img}>
                        <img src={user?.profilePic} alt="profile image_" />
                    </div>

                    <div className={styles.cta_btns} style={{ borderBottom: '1px solid var(--border)' }}>

                        <button onClick={goToProfile}>
                            <UserOutlined className={styles.icon} />
                            <span>Go to profile</span>
                        </button>
                    </div>

                    <Details id={user?._id} />

                    <div className={styles.cta_btns} style={{ borderTop: '1px solid var(--border)' }}>

                        <button onClick={handleResetBtn}>
                            <SecurityScanFilled className={styles.icon} />
                            <span>Reset Password</span>
                        </button>

                        <button onClick={() => setShowEditProfileModal(true)}>
                            <EditFilled className={styles.icon} />
                            <span>Edit Details</span>
                        </button>

                        <button onClick={logoutUser}>
                            <LogoutOutlined className={styles.icon} />
                            <span>Logout</span>
                        </button>

                    </div>
                </div>
            </div>
            {
                showEditProfileModal &&
                <EditProfileModal setShowEditProfileModal={setShowEditProfileModal} />
            }
        </>
    )
}

export default ProfileSidebar