import React, { useRef } from 'react';
import styles from './Navbar.module.scss';
import {
    SearchOutlined,
    HomeOutlined,
    DesktopOutlined,
    UsergroupDeleteOutlined,
    MessageFilled,
    UserAddOutlined,
    QqOutlined,
    LogoutOutlined,
    LoginOutlined,
    ShopOutlined,
    ShoppingFilled
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userRedux';
import { removeMembers } from '../../redux/AddToGroup';
import { setCurrentChatInitial } from '../../redux/chatRedux';
import { useState } from 'react';
import FriendsList from '../FriendsList/FriendsList';
import { useEffect } from 'react';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';

const Navbar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showProfileSidebar, setShowProfileSidebar] = useState(false);
    const [showFriendsList, setShowFriendsList] = useState('');
    const [active, setActive] = useState('')
    const navRef = useRef()
    const location = useLocation();
    const path = location.pathname.split('/')[1]
    const isGroupCreate = location.pathname.split('/')[2]
    // console.log(isGroupCreate);


    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        dispatch(logout());
        dispatch(removeMembers());
        dispatch(setCurrentChatInitial())
        navigate('/login');
    };

    useEffect(() => {
        setActive(path)
    }, [path]);


    if (isGroupCreate === 'create') return null;
    if (path === 'messenger') return null;
    return (
        <nav>
            <div className={styles.navbar} ref={navRef} style={{ borderBottom: isGroupCreate === 'create' && 'none', backgroundColor: isGroupCreate === 'create' && 'var(--bgDark)' }}>
                <div className={styles.logo} onClick={() => navigate('/')}>
                    <QqOutlined className='icon' />
                </div>
                {
                    user &&
                    <><div className={styles.search_box}
                        onClick={() => setShowFriendsList(!showFriendsList)}
                    >
                        <div className={styles.icon}><SearchOutlined /></div>
                    </div>

                        <div className={styles.middle}>
                            <button
                                onClick={() => {
                                    setActive('home')
                                    navigate('/home');
                                }}
                                className={`${styles.items} ${active === 'home' && styles.active}`}><HomeOutlined /></button>
                            <button className={`${styles.items} ${active === 'watch' && styles.active}`}
                                onClick={() => {
                                    setActive('watch')
                                    navigate('/watch')
                                }}
                            ><DesktopOutlined /></button>
                            <button className={`${styles.items} ${active === 'marketplace' && styles.active}`}
                                onClick={() => {
                                    setActive('marketplace')
                                    navigate('/marketplace')
                                }}
                            ><ShopOutlined /></button>
                            <button className={`${styles.items} ${active === 'groups' && styles.active}`}
                                onClick={() => {
                                    setActive('groups')
                                    navigate('/groups/feed')
                                }}
                            ><UsergroupDeleteOutlined /></button>
                        </div>

                        <div className={styles.toolkit}>
                            <div className={styles.auth_actions}>
                                <button
                                    onClick={logoutUser}>
                                    <LogoutOutlined className={styles.icon} /><span>Logout</span>
                                </button>
                            </div>
                            <button className={styles.tools} onClick={() => navigate('/messenger')}><MessageFilled /></button>
                            <button className={styles.tools} onClick={()=>{
                                navigate('/shop')
                                window.location.reload()
                            }}><ShoppingFilled /></button>
                            <button className={styles.tools} onClick={() => setShowProfileSidebar(true)}>
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
            </div>
            {showFriendsList &&
                <FriendsList
                    setShowFriendsList={setShowFriendsList}
                    showFriendsList={showFriendsList}
                />
            }
            {
                showProfileSidebar &&
                <ProfileSidebar
                    showProfileSidebar={showProfileSidebar}
                    setShowProfileSidebar={setShowProfileSidebar}
                    user={user}
                />
            }
        </nav>
    )
}

export default Navbar