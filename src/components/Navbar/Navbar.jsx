import React from 'react';
import styles from './Navbar.module.scss';
import {
    SearchOutlined,
    HomeOutlined,
    DesktopOutlined,
    UsergroupDeleteOutlined,
    BellFilled,
    MessageFilled,
    UserOutlined,
    UserAddOutlined
} from '@ant-design/icons';

const Navbar = () => {
    const user = false;

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}></div>
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
                        <button className={styles.tools}><MessageFilled /></button>
                        <button className={styles.tools}><BellFilled /></button>
                        <button className={styles.tools}>
                            <img src="https://media.istockphoto.com/photos/young-man-with-laptop-and-coffee-working-indoors-home-office-concept-picture-id1334702614?b=1&k=20&m=1334702614&s=170667a&w=0&h=Ea5KZt7q8D_dm1kHuNG7__R8J--thzE-Yj7Q9nXMg6E=" alt="" />
                        </button>
                    </div>
                </>
            }
            <div className={styles.auth_actions}>
                <button><UserOutlined className={styles.icon}/><span>Login</span></button>
                <button><UserAddOutlined className={styles.icon}/><span>Register</span></button>
            </div>
        </nav>
    )
}

export default Navbar