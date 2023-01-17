import React, { useEffect, useRef } from 'react';
import Details from '../Profiles/Details/Details';
import styles from './ProfileSidebar.module.scss';
import {
    CloseOutlined,
    EditFilled,
    LogoutOutlined,
    SecurityScanFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentChatInitial } from '../../redux/chatRedux';
import { removeMembers } from '../../redux/AddToGroup';
import { logout } from '../../redux/userRedux';

const ProfileSidebar = ({ showProfileSidebar, setShowProfileSidebar, user }) => {
    const ref = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        const checkClick = (e) => {
            if (showProfileSidebar && !ref.current.contains(e.target)) {
                setShowProfileSidebar(false)
            }
        }
        document.addEventListener('mousedown', checkClick);
        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [showProfileSidebar, setShowProfileSidebar]);

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
        <div className={styles.container}>
            <div className={styles.profile_sidebar} ref={ref}>
                <div className={styles.close} onClick={() => setShowProfileSidebar(false)}>
                    <CloseOutlined className={styles.icon} />
                </div>
                <div className={styles.img}>
                    <img src={user?.profilePic} alt="profile image_" />
                </div>
                <Details id={user?._id} />
                <div className={styles.cta_btns}>

                    <button onClick={handleResetBtn}>
                        <SecurityScanFilled className={styles.icon} />
                        <span>Reset Password</span>
                    </button>

                    <button>
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
    )
}

export default ProfileSidebar