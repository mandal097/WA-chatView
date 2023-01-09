import React from 'react';
import styles from './Overview.module.scss';
import { AlertFilled, RightOutlined, RobotFilled, UngroupOutlined, UserSwitchOutlined } from '@ant-design/icons'

const Card = ({ icon, text, count }) => {
    return (
        <div className={styles.card}>
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

        </div>
    )
}

const Overview = () => {
    return (
        <div className={styles.overview}>
            <div className={styles.body}>
                <h1>Daily insights</h1>

                <div className={styles.flex}>
                    <Card
                        icon={<RobotFilled className={styles.icon} />}
                        text='Filled required'
                        count='1'
                    />
                    <Card
                        icon={<AlertFilled className={styles.icon} />}
                        text='Filled required'
                        count='1'
                    />
                    <Card
                        icon={<UngroupOutlined className={styles.icon} />}
                        text='Filled required'
                        count='1'
                    />
                    <Card
                        icon={<UserSwitchOutlined className={styles.icon} />}
                        text='Filled required'
                        count='1'
                    />

                </div>

            </div>
            <div className={styles.body}>
                <h1>Insights summary</h1>
                <span>In the last 7 days</span>

                <div className={styles.flex}>

                </div>

            </div>
        </div>
    )
}

export default Overview