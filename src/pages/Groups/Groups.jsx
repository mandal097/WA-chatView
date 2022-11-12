import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Groups/Sidebar/Sidebar';
import styles from './Groups.module.scss'

const Groups = () => {
    return (
        <div className={styles.groups}>
            <div>
                <Sidebar />
            </div>
            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    )
}

export default Groups