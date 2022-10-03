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

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser);

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        dispatch(logout());
        setTimeout(() => {
            navigate('/login');
        }, 1000);

    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo} onClick={() => navigate('/')}><GlobalOutlined className='icon' /></div>
            {
                user &&
                <>
                    <div className={styles.search_box}>
                        <div className={styles.icon}><SearchOutlined /></div>
                        <input type="text" />
                    </div>
                    <div className={styles.middle}>
                        <button className={styles.items}><HomeOutlined /></button>
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
                        <button className={styles.tools}><MessageFilled /></button>
                        <button className={styles.tools}><BellFilled /></button>
                        <button className={styles.tools}>
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
    )
}

export default Navbar