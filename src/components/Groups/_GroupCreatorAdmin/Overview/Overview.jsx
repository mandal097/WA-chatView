import React from 'react';
import styles from './Overview.module.scss';
import { UsergroupAddOutlined, RightOutlined, RobotFilled, UngroupOutlined, UserSwitchOutlined, LikeOutlined, MessageOutlined, CameraOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Line } from 'react-chartjs-2';

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

const Overview = () => {

    return (
        <div className={styles.overview}>
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
                        link='test'
                    />
                    <Card
                        icon={<UserSwitchOutlined className={styles.icon} />}
                        text='Member requests'
                        count='1'
                        link='member-requests'
                    />

                </div>

            </div>
            <div className={styles.body} style={{ background: 'transparent', padding: '0' }}>

                <div className={styles.bottom}>

                    <div className={styles.sections}>
                        <h1>Insights summary</h1>
                        <span>In the last 7 days</span>

                        <div className={`${styles.insight_card} ${styles.card}`}>
                            <div className={styles.icon_}>
                                <CameraOutlined className={styles.icon} />
                            </div>
                            <div className={styles.text}>
                                <span>Posts</span>
                            </div>
                            <div className={styles.count}><span>1</span></div>
                            <div className={styles.icon_}>
                                <ArrowRightOutlined className={`${styles.icon} ${styles.small_icon}`} />
                            </div>
                            <div className={styles.count}><span style={{ fontSize: '1.3rem' }}>0%</span></div>
                        </div>

                        <div className={`${styles.insight_card} ${styles.card}`}>
                            <div className={styles.icon_}>
                                <MessageOutlined className={styles.icon} />
                            </div>
                            <div className={styles.text}>
                                <span>Comments</span>
                            </div>
                            <div className={styles.count}><span>1</span></div>
                            <div className={styles.icon_}>
                                <ArrowRightOutlined className={`${styles.icon} ${styles.small_icon}`} />
                            </div>
                            <div className={styles.count}><span style={{ fontSize: '1.3rem' }}>0%</span></div>
                        </div>

                        <div className={`${styles.insight_card} ${styles.card}`}>
                            <div className={styles.icon_}>
                                <LikeOutlined className={styles.icon} />
                            </div>
                            <div className={styles.text}>
                                <span>Reactions</span>
                            </div>
                            <div className={styles.count}><span>1</span></div>
                            <div className={styles.icon_}>
                                <ArrowRightOutlined className={`${styles.icon} ${styles.small_icon}`} />
                            </div>
                            <div className={styles.count}><span style={{ fontSize: '1.3rem' }}>0%</span></div>
                        </div>

                    </div>



                    <div className={styles.sections}>
                       
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Overview