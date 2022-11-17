import {
    AppstoreAddOutlined,
    AreaChartOutlined,
    CalendarOutlined,
    CrownOutlined,
    HomeOutlined,
    RadarChartOutlined,
    ReadOutlined,
    SettingOutlined,
    UserAddOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './SidebarAdmin.module.scss';

const SidebarAdmin = () => {
    const [active, setActive] = useState('manage');
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [activeCard, setActiveCard] = useState('c_home');

    return (
        <div className={styles.SidebarAdmin}>
            <div className={styles.top}>
                <div className={styles.heading}>
                    <span>Groups</span>
                </div>
                <div className={styles.card}>
                    <div className={styles.img}>
                        <img src={currentGroup?.groupCoverImg} alt="cover" />
                    </div>
                    <span>{currentGroup?.groupName}</span>
                </div>
            </div>
            <div className={`${styles.bottom}`}>
                <div className={styles.navs}>
                    <div className={styles.navs_wrap}>
                        <button className={`${styles.nav_items}  ${active === 'browse' && styles.active_nav}`} onClick={() => setActive('browse')}>
                            <span className='link'>Browse</span>
                        </button>
                        <button className={`${styles.nav_items}  ${active === 'manage' && styles.active_nav}`} onClick={() => setActive('manage')}>
                            <span className='link'>Manage</span>
                        </button>
                    </div>
                </div>
                <div className={styles.sections}>
                    <div style={{ borderBottom: active === 'manage' && '1px solid var(--border)' }}>

                        <Link
                        to={`/groups/${currentGroup?._id}`}
                         className={`${styles.card} ${activeCard === 'c_home' && styles.active_card}`}
                            onClick={() => setActiveCard('c_home')}>
                            <div className={styles.left}>
                                <HomeOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Community Home</span>
                            </div>
                        </Link>
                        {
                            active === 'manage'
                                ?

                                <Link
                                to={`/groups/${currentGroup?._id}/overview`}
                                 className={`${styles.card} ${activeCard === 'overview' && styles.active_card}`}
                                    onClick={() => setActiveCard('overview')}>
                                    <div className={styles.left}>
                                        <AreaChartOutlined className={styles.icon} />
                                    </div>
                                    <div className={styles.right}>
                                        <span>Overview</span>
                                    </div>
                                </Link>
                                :
                                <>
                                    <Link
                                    to={`/groups/${currentGroup?._id}/overview`}
                                     className={`${styles.card} ${activeCard === 'rooms' && styles.active_card}`}
                                        onClick={() => setActiveCard('rooms')}>
                                        <div className={styles.left}>
                                            <VideoCameraOutlined className={styles.icon} />
                                        </div>
                                        <div className={styles.right}>
                                            <span>Rooms</span>
                                        </div>
                                    </Link>
                                    <Link
                                    to={`/groups/${currentGroup?._id}/overview`}
                                     className={`${styles.card} ${activeCard === 'events' && styles.active_card}`}
                                        onClick={() => setActiveCard('events')}>
                                        <div className={styles.left}>
                                            <CalendarOutlined className={styles.icon} />
                                        </div>
                                        <div className={styles.right}>
                                            <span>Events</span>
                                        </div>
                                    </Link>
                                </>
                        }

                    </div>
                    {active === 'manage' && <>
                        <div className={styles.heading}>
                            <span>Admin Tools</span>
                        </div>
                        <Link
                        to={`/groups/${currentGroup?._id}/overview`}
                         className={`${styles.card} ${activeCard === 'admin_assist' && styles.active_card}`}
                            onClick={() => setActiveCard('admin_assist')}>
                            <div className={styles.left}>
                                <CrownOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Admin Assist</span>
                            </div>
                        </Link>

                        <Link
                        to={`/groups/${currentGroup?._id}/overview`}
                         className={`${styles.card} ${activeCard === 'm_request' && styles.active_card}`}
                            onClick={() => setActiveCard('m_request')}>
                            <div className={styles.left}>
                                <UserAddOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Member Request</span>
                            </div>
                        </Link>

                        <Link
                        to={`/groups/${currentGroup?._id}/overview`}
                         className={`${styles.card} ${activeCard === 'g_rules' && styles.active_card}`}
                            onClick={() => setActiveCard('g_rules')}>
                            <div className={styles.left}>
                                <ReadOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Group Rules</span>
                            </div>
                        </Link>

                        <Link
                        to={`/groups/${currentGroup?._id}/overview`}
                         className={`${styles.card} ${activeCard === 'pending_post' && styles.active_card}`}
                            onClick={() => setActiveCard('pending_post')}>
                            <div className={styles.left}>
                                <AppstoreAddOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Pending Post</span>
                            </div>
                        </Link>

                        <Link
                        to={`/groups/${currentGroup?._id}/overview`}
                         className={`${styles.card} ${activeCard === 'activity_log' && styles.active_card}`}
                            onClick={() => setActiveCard('activity_log')}>
                            <div className={styles.left}>
                                <RadarChartOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Activity Log</span>
                            </div>
                        </Link>

                        <Link
                        to={`/groups/${currentGroup?._id}/overview`}
                         className={`${styles.card} ${activeCard === 'setting' && styles.active_card}`}
                            onClick={() => setActiveCard('setting')}>
                            <div className={styles.left}>
                                <SettingOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Settings</span>
                            </div>
                        </Link>
                    </>}


                </div>
            </div>
        </div>
    )
}

export default SidebarAdmin