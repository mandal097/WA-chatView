import { EyeFilled, EyeInvisibleFilled, GlobalOutlined, LockFilled } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../../CreatePost/CreatePost';
import PrivacyStat from '../../PrivacyStat/PrivacyStat';
import styles from './Dummy.module.scss';

const Dummy = ({ hide, groupName, privacy }) => {
    const { members } = useSelector(state => state.group)
    return (
        <div className={styles.dummy_page}>
            <div className={`${styles.wrapper} ${'custom_scroll'}`}>
                <div className={styles.img}>
                    <img src='/assets/images/chat.jpg' alt="coverimage" />
                </div>
                <h1>{groupName === '' ? 'Group name' : groupName}</h1>
                <div className={styles.privacy}>
                    {
                        privacy === 'private' ?
                            <>
                                <LockFilled className={styles.icon} /> Private group
                            </>
                            :
                            <>
                                <GlobalOutlined className={styles.icon} />  Public group
                            </>
                    }
                    · {members.length + 1} member
                </div>
                <div className={styles.navs}>
                    <span>About</span>
                    <span>Post</span>
                    <span>Members</span>
                    <span>Media</span>
                </div>
                <div className={styles.about}>
                    <h2>About</h2>
                    {
                        privacy === 'private'
                            ?
                            <PrivacyStat
                                span='Private'
                                p="Only members can see who's in the group and what they post."
                                icon={<LockFilled className={styles.icon} />}
                            />
                            :
                            <PrivacyStat
                                span='Public'
                                p="Anyone can see group content and who follows the group."
                                icon={<GlobalOutlined className={styles.icon} />}
                            />
                    }
                    {
                        hide === 'hidden'
                            ?
                            <PrivacyStat
                                span='Hidden'
                                p="Only members can find this group."
                                icon={<EyeInvisibleFilled className={styles.icon} />}
                            />
                            :
                            <PrivacyStat
                                span='Visible'
                                p="Anyone can find this group."
                                icon={<EyeFilled className={styles.icon} />}
                            />
                    }
                </div>
                <div className={styles.about} >
                    <div className={styles.overlay} style={{ backgroundColor: 'transparent' }}></div>
                    <CreatePost />
                </div>
            </div>
        </div>
    )
}

export default Dummy