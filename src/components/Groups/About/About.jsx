import { ClockCircleFilled, EyeFilled, EyeInvisibleFilled, GlobalOutlined, LockFilled, MessageFilled, UsergroupAddOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Desc from '../Desc/Desc';
import PrivacyStat from '../PrivacyStat/PrivacyStat';
import styles from './About.module.scss';
import { format } from 'timeago.js';
import axios from '../../../config/axios';
import Rules from '../_GroupCreatorAdmin/Rules/Rules';

const Card = () => {
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [admin, setAdmin] = useState({});

    console.log(currentGroup);

    useEffect(() => {
        const fetchAdmin = async () => {
            const res = await axios.get(`/user/get-profile/${currentGroup?.admins[0]}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setAdmin(res.data.data)
        }
        fetchAdmin()
    }, [currentGroup])
    return (
        <>
            <div className={styles.head} style={{ fontSize: '1.8rem' }}>Members _ <span style={{ color: "var(--text", fontSize: '1.4rem' }}>554</span></div>
            <div className={styles.user_}>
                <div className={styles.user}>
                    <Link className={styles.img} to={`/profile/${admin?._id}`}>
                        <img src={admin?.profilePic} alt="profile_image" />
                    </Link>
                    <p>
                        <span>{admin?.name}</span> is an admin
                    </p>
                </div>
            </div>
        </>
    )
}


const AboutGroup = () => {
    // const { currentUser } = useSelector(state => state.user);
    const { currentGroup } = useSelector(state => state.currentGroup);
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});

    console.log(currentGroup);

    useEffect(() => {
        const fetchAdmin = async () => {
            const res = await axios.get(`/user/get-profile/${currentGroup?.admins[0]}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data.data);
            setAdmin(res.data.data)
        }
        fetchAdmin()
    }, [currentGroup])
    console.log(admin);

    return (
        <div className={styles.about_group}>
            <div className={styles.section}>
                <div className={styles.head}>About this group</div>
                <span>SB FlexiFunnels DOer's Community</span>
                <Desc />
                {
                    currentGroup?.isPrivate === 'private' ?
                        <PrivacyStat
                            span='Private'
                            p="Only members can see who's in the group and what they post."
                            icon={<LockFilled className={styles.icon} />}
                        /> :
                        <PrivacyStat
                            span='Public'
                            p="Anyone can see group content and who follows the group."
                            icon={<GlobalOutlined className={styles.icon} />}
                        />
                }
                {
                    currentGroup?.visibility === 'visible' ?
                        <PrivacyStat
                            span='Visible'
                            p="Anyone can find this group."
                            icon={<EyeFilled className={styles.icon} />}
                        /> :
                        <PrivacyStat
                            span='Hidden'
                            p="Only members can find this group."
                            icon={<EyeInvisibleFilled className={styles.icon} />}
                        />}
                <PrivacyStat
                    span='General'
                    // p="Only members can see who's in the group and what they post."
                    icon={<UsergroupAddOutlined className={styles.icon} />}
                />
                <PrivacyStat
                    span='History'
                    p={`Group created on   ${currentGroup?.createdAt.slice(0, 10)}. Name last changed on ${currentGroup?.updatedAt.slice(0, 10)}`}
                    // 3 September 2019
                    icon={<ClockCircleFilled className={styles.icon} />}
                />

            </div>

            <div className={styles.section}>
                <Card />
                <button onClick={() => navigate(`/groups/${currentGroup?._id}/members`)} >See All</button>
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
                    span={`Created  ${format(currentGroup?.createdAt.slice(0, 10))}`}
                    icon={<ClockCircleFilled className={styles.icon} />}
                />
            </div>
            <Rules width='100%' col='var(--successLight)'/>
        </div>
    )
}

export default AboutGroup