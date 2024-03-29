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
    UserSwitchOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './SidebarAdmin.module.scss';

const SidebarAdmin = () => {
    const [active, setActive] = useState('manage');
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [activeCard, setActiveCard] = useState('c_home');
    const location = useLocation();
    const path = location.pathname.split('/')[3]

    useEffect(() => {
        setActiveCard(path)
    }, [path])

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
                            className={`${styles.card} ${activeCard === undefined && styles.active_card}`}
                            onClick={() => setActiveCard(undefined)}>
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
                                        to={`/groups/${currentGroup?._id}/test`}
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
                                        to={`/groups/${currentGroup?._id}/test`}
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
                            to={`/groups/${currentGroup?._id}/admin_assist`}
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
                            to={`/groups/${currentGroup?._id}/member-requests`}
                            className={`${styles.card} ${activeCard === 'member-requests' && styles.active_card}`}
                            onClick={() => setActiveCard('member-requests')}>
                            <div className={styles.left}>
                                <UserAddOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Member Requests</span>
                            </div>
                        </Link>

                        <Link
                            to={`/groups/${currentGroup?._id}/invite-members`}
                            className={`${styles.card} ${activeCard === 'invite-members' && styles.active_card}`}
                            onClick={() => setActiveCard('invite-Members')}>
                            <div className={styles.left}>
                                <UserSwitchOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Invite members</span>
                            </div>
                        </Link>

                        <Link
                            to={`/groups/${currentGroup?._id}/manage-rules`}
                            className={`${styles.card} ${activeCard === 'manage-rules' && styles.active_card}`}
                            onClick={() => setActiveCard('manage-rules')}>
                            <div className={styles.left}>
                                <ReadOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Group Rules</span>
                            </div>
                        </Link>

                        <Link
                            to={`/groups/${currentGroup?._id}/pending-posts`}
                            className={`${styles.card} ${activeCard === 'pending-posts' && styles.active_card}`}
                            onClick={() => setActiveCard('pending-posts')}>
                            <div className={styles.left}>
                                <AppstoreAddOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Pending Post</span>
                            </div>
                        </Link>

                        <Link
                            to={`/groups/${currentGroup?._id}/admin_activities`}
                            className={`${styles.card} ${activeCard === 'admin_activities' && styles.active_card}`}
                            onClick={() => setActiveCard('admin_activities')}>
                            <div className={styles.left}>
                                <RadarChartOutlined className={styles.icon} />
                            </div>
                            <div className={styles.right}>
                                <span>Activity Log</span>
                            </div>
                        </Link>

                        <Link
                            to={`/groups/${currentGroup?._id}/edit`}
                            className={`${styles.card} ${activeCard === 'edit' && styles.active_card}`}
                            onClick={() => setActiveCard('edit')}>
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