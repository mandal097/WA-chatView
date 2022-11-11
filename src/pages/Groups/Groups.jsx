import React from 'react';
import Sidebar from '../../components/Groups/Sidebar/Sidebar';
import styles from './Groups.module.scss'

const Groups = () => {
    return (
        <div className={styles.groups}>
            <div>
                <Sidebar />
            </div>
            <div className={styles.body}>
            </div>
        </div>
    )
}

export default Groups