import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ActivityLog.module.scss';

const ActivityCard = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={currentUser?.profilePic} alt="" />
            </div>
            <div className={styles.details}>
                <h2><span>{currentUser?.name} </span>changed the group location.</h2>
                <small>20 Nov 2022, 15:22</small>
                <div className={styles.note}>
                    <i>location should be updated .its necessary location should be updated .its necessary location should be updated .its necessary location should be updated .its necessary</i>
                </div>
            </div>
            <button>Add note</button>
        </div>
    )
}


const ActivityLog = () => {
    return (
        <div className={styles.activity_log}>
            <div className={styles.top}>
                <h1>Activity log</h1>
                {/* <div className={styles.btns}></div> */}
            </div>
            <div className={styles.bottom}>
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
            </div>
        </div>
    )
}

export default ActivityLog