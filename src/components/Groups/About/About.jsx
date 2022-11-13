import { ClockCircleFilled, EyeFilled, GlobalOutlined, LockFilled, MessageFilled, UsergroupAddOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Desc from '../Desc/Desc';
import styles from './About.module.scss';

const PrivacyStat = ({ span, p, icon }) => {
    return (
        <div className={styles.privacy_stat}>
            <div className={styles.icon_}>
                {icon}
            </div>
            <div className={styles.stat}>
                <span>{span}</span>
                <p>{p}</p>
            </div>
        </div>
    )
}

const AboutGroup = () => {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = location.pathname.split('/')[2]
    return (
        <div className={styles.about_group}>
            <div className={styles.section}>
                <div className={styles.head}>About this group</div>
                <span>SB FlexiFunnels DOer's Community</span>
                <Desc />
                <PrivacyStat
                    span='Private'
                    p="Only members can see who's in the group and what they post."
                    icon={<LockFilled className={styles.icon} />}
                />
                <PrivacyStat
                    span='Public'
                    p="Anyone can see group content and who follows the group."
                    icon={<GlobalOutlined className={styles.icon} />}
                />
                <PrivacyStat
                    span='Visible'
                    p="Anyone can find this group."
                    icon={<EyeFilled className={styles.icon} />}
                />
                <PrivacyStat
                    span='General'
                    // p="Only members can see who's in the group and what they post."
                    icon={<UsergroupAddOutlined className={styles.icon} />}
                />
                <PrivacyStat
                    span='History'
                    p="Group created on 3 September 2019. Name last changed on 29 April 2022"
                    icon={<ClockCircleFilled className={styles.icon} />}
                />

            </div>

            <div className={styles.section}>
                <div className={styles.head} style={{ fontSize: '1.8rem' }}>Members _ <span style={{ color: "var(--text", fontSize: '1.4rem' }}>554</span></div>
                <div className={styles.user_}>
                    <div className={styles.user}>
                        <Link className={styles.img} to={`/profile/${currentUser?._id}`}>
                            <img src={currentUser?.profilePic} alt="profile_image" />
                        </Link>
                        <p>
                            <span>{currentUser?.name.split(' ')[0]}</span> is an admin
                        </p>
                    </div>
                </div>
                <button onClick={()=>navigate(`/groups/${groupId}/members`)} >See All</button>
            </div>

            <div className={styles.section}>
                <div className={styles.head} style={{ fontSize: '1.8rem' }}>Activity </div>
                <PrivacyStat
                    span='11 new posts today'
                    p="159 in the last month"
                    icon={<MessageFilled className={styles.icon} />}
                />
                <PrivacyStat
                    span='554 total followers'
                    p="+ 3 in the last week"
                    icon={<UsergroupAddOutlined className={styles.icon} />}
                />
                <PrivacyStat
                    span='Created on 2 years ago'
                    icon={<ClockCircleFilled className={styles.icon} />}
                />
            </div>
        </div>
    )
}

export default AboutGroup