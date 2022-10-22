import React from 'react';
import styles from './Navbar.module.scss';
import {
    SearchOutlined,
    HomeOutlined,
    DesktopOutlined,
    UsergroupDeleteOutlined,
    BellFilled,
    MessageFilled,
    UserAddOutlined,
    GlobalOutlined,
    LogoutOutlined,
    LoginOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userRedux';
import { removeMembers } from '../../redux/AddToGroup';
import { setCurrentChatInitial } from '../../redux/chatRedux';
import { useState } from 'react';
import FriendsList from '../FriendsList/FriendsList';

const Navbar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showFriendsList, setShowFriendsList] = useState('');



    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        dispatch(logout());
        dispatch(removeMembers());
        dispatch(setCurrentChatInitial())
        setTimeout(() => {
            navigate('/login');
        }, 1000);

    }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo} onClick={() => navigate('/')}>
                    <GlobalOutlined className='icon' />
                </div>
                {
                    user &&
                    <>
                        <div className={styles.search_box}
                            onClick={() => setShowFriendsList(!showFriendsList)}
                        >
                            <div className={styles.icon}><SearchOutlined /></div>
                        </div>
                        <div className={styles.middle}>
                            <button 
                            onClick={()=>navigate('/home')}
                            className={styles.items}><HomeOutlined /></button>
                            <button className={styles.items}><DesktopOutlined /></button>
                            <button className={styles.items}><UsergroupDeleteOutlined /></button>
                        </div>
                        <div className={styles.toolkit}>
                            <div className={styles.auth_actions}>
                                <button
                                    onClick={logoutUser}>
                                    <LogoutOutlined className={styles.icon} /><span>Logout</span>
                                </button>
                            </div>
                            <button className={styles.tools} onClick={() => navigate('/messenger')}><MessageFilled /></button>
                            <button className={styles.tools}><BellFilled /></button>
                            <button className={styles.tools} onClick={() => navigate(`/profile/${user?._id}`)}>
                                <img src={user?.profilePic} alt="profile_pic" />
                            </button>
                        </div>
                    </>
                }

                {
                    !user
                    && <div className={styles.auth_actions}>
                        <button
                            onClick={() => navigate('/login')}>
                            <LoginOutlined className={styles.icon} /><span>Login</span>
                        </button>
                        <button
                            onClick={() => navigate('/register')}>
                            <UserAddOutlined className={styles.icon} /><span>Register</span>
                        </button>
                    </div>
                }
            </nav>
            {showFriendsList &&
                <FriendsList
                    setShowFriendsList={setShowFriendsList}
                    showFriendsList={showFriendsList}
                />
            }
        </>
    )
}

export default Navbar