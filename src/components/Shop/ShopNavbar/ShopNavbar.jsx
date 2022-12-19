import React from 'react';
import styles from './ShopNavbar.module.scss'
import { ArrowLeftOutlined, LogoutOutlined, QqOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShopNavbar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    return (
        <nav>
            <div className={styles.shop_navbar}>
                <div className={styles.logo} onClick={() => navigate('/shop')}>
                    <QqOutlined className='icon' />
                </div>
                <div className={styles.middle}></div>
                <div className={styles.right}>
                    <button className={styles.auth_btn}  onClick={() =>{
                        navigate('/')
                        window.location.reload()
                         }}>
                        <ArrowLeftOutlined className={styles.icon} /><span>Back</span>
                    </button>
                    <button className={styles.auth_btn}>
                        <LogoutOutlined className={styles.icon} /><span>Logout</span>
                    </button>
                    <button onClick={() => navigate('/shop/cart')}><ShoppingCartOutlined className={styles.icon} /></button>
                    <button>
                        <img src={user?.profilePic} alt="" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default ShopNavbar