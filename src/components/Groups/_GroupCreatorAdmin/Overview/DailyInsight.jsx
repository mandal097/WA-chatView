import React from 'react';
import styles from './Overview.module.scss';
import {
    UsergroupAddOutlined,
    RobotFilled,
    UngroupOutlined,
    UserSwitchOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Card = ({ icon, text, count, link }) => {
    const { currentGroup } = useSelector(state => state.currentGroup)
    
    return (
        <Link to={`/groups/${currentGroup?._id}/${link}`} className={styles.card}>
            <div className={styles.icon_}>
                {icon}
            </div>
            <div className={styles.text}>
                <span>{text}</span>
                <small>{count} New today</small>
            </div>
            <div className={styles.count}><span>{count}</span></div>
            <div className={styles.icon_}>
                <RightOutlined className={`${styles.icon} ${styles.small_icon}`} />
            </div>

        </Link>
    )
}



const DailyInsight = () => {
    return (
        <div className={styles.body}>
            <h1>Daily insights</h1>

            <div className={styles.flex}>
                <Card
                    icon={<RobotFilled className={styles.icon} />}
                    text='Posts'
                    count='1'
                    link='media'
                />
                <Card
                    icon={<UsergroupAddOutlined className={styles.icon} />}
                    text='Members'
                    count='1'
                    link='members'
                />
                <Card
                    icon={<UngroupOutlined className={styles.icon} />}
                    text='Pending posts'
                    count='1'
                    link='pending-posts'
                />
                <Card
                    icon={<UserSwitchOutlined className={styles.icon} />}
                    text='Member requests'
                    count='1'
                    link='member-requests'
                />

            </div>

        </div>
    )
}

export default DailyInsight