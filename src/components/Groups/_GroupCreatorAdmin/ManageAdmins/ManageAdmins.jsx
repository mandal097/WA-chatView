import React from 'react';
import styles from './ManageAdmins.module.scss'
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Card from './Card';

const ManageAdmins = () => {
    const { currentGroup } = useSelector(state => state.currentGroup)

    return (
        <div className={styles.manage_admins}>
            <div className={styles.top}>
                <div className={styles.wrapper}>
                    <h1>Manage admins</h1>
                    <div className={styles.search_box}>
                        <div className={styles.search}>
                            <SearchOutlined className={styles.icon} />
                            <input type="text" placeholder='search by name' />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <h2>Current admins of the group</h2>
                {
                    currentGroup?.admins?.map((id) => (
                        <Card key={id} userId={id} />
                    ))
                }
            </div>
            
            <div className={styles.bottom}>
                <h2>List of all members</h2>
                {
                    currentGroup?.members?.map((id) => (
                        <Card key={id} userId={id} />
                    ))
                }
            </div>

        </div>
    )
}

export default ManageAdmins