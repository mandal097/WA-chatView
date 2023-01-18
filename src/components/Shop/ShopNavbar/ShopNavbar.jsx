import React from 'react';
import styles from './ShopNavbar.module.scss'
import {
    // ArrowLeftOutlined,
    LogoutOutlined,
    QqOutlined,
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
                <div className={styles.middle}></div>
                <div className={styles.right}>
                    {/* <button className={styles.auth_btn} onClick={() => {
                        navigate('/')
                        window.location.reload()
                    }}>
                        <ArrowLeftOutlined className={styles.icon} /><span>Back</span>
                    </button> */}
                    <button className={styles.auth_btn} onClick={logoutUser}>
                        <LogoutOutlined className={styles.icon} /><span>Logout</span>
                    </button>
                    <button onClick={() => navigate('/shop/cart')}><ShoppingCartOutlined className={styles.icon} /></button>
                    <button onClick={() => {
                        navigate(`/profile/${user?._id}`)
                        window.location.reload()
                    }}>
                        <img src={user?.profilePic} alt="" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default ShopNavbar