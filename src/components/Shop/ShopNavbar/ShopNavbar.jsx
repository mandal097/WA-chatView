import React from 'react';
import styles from './ShopNavbar.module.scss'
import {
    LoginOutlined,
    // ArrowLeftOutlined,
    LogoutOutlined,
    QqOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/userRedux';
import { removeMembers } from '../../../redux/AddToGroup';
import { setCurrentChatInitial } from '../../../redux/chatRedux';

const ShopNavbar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    const dispatch = useDispatch();


    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        dispatch(logout());
        dispatch(removeMembers());
        dispatch(setCurrentChatInitial())
        navigate('/login');
    };


    return (
        <nav>
            <div className={styles.shop_navbar}>
                <div className={styles.logo} onClick={() => navigate('/shop')}>
                    <QqOutlined className='icon' />
                </div>
                <div className={styles.middle}>
                    <SearchOutlined className={styles.icon}/>
                    <input type="text" placeholder='what you are looking for...' />
                </div>
                <div className={styles.right}>

                    {
                        user
                            ? <button className={styles.auth_btn} onClick={logoutUser}>
                                <LogoutOutlined className={styles.icon} /><span>Logout</span>
                            </button>
                            : <button className={styles.auth_btn}
                                onClick={() => navigate('/login')}>
                                <LoginOutlined className={styles.icon} /><span>Login</span>
                            </button>

                    }

                    <button onClick={() => navigate('/shop/cart')}><ShoppingCartOutlined className={styles.icon} /></button>
                    <button onClick={() => {
                        navigate(`/profile/${user?._id}`)
                        window.location.reload()
                    }}>
                        <img src={user?.profilePic ? user.profilePic : 'https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg?size=338&ext=jpg&ga=GA1.1.148670595.1674319787'} alt="" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default ShopNavbar