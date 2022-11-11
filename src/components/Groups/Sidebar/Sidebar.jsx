import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.top}>
                <div className={styles.heading}>
                    <span>Groups</span>
                </div>
                <div className={styles.search_box}>
                    <SearchOutlined className={styles.icon} />
                    <input type="search" placeholder='search groups...'  />
                </div>
                <button className={styles.create_group_btn}>
                    <PlusOutlined className={styles.icon} />
                    <span>Create New Group</span>
                </button>
            </div>
            <div className={`${styles.bottom} ${'custom_scroll'}`}>

            </div>
        </div>
    )
}

export default Sidebar