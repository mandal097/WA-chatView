import React, { useEffect } from 'react';
import styles from './Details.module.scss';
import {
    BankFilled,
    HomeFilled,
    MailFilled,
    InstagramFilled,
    PhoneFilled,
    ClockCircleFilled,
    UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from '../../../config/axios';
import {capitalizeFirstLetter} from '../../../helpers/strings';

const Details = ({ id }) => {
    const { currentUser } = useSelector(state => state.user);
    // const { currentProfile } = useSelector(state => state.profile);
    const [currentProfile, setCurrentProfile] = useState({});
    const [me, setMe] = useState(false)
    // console.log(id);

    useEffect(() => {
        if (String(id) === String(currentUser.id)) {
            setMe(true)
        } else {
            setMe(false)
        }
    }, [id, currentUser])
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/user/get-profile/${id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (!me) {
                    setCurrentProfile(res.data.data)
                }
            } catch (error) {
                console.log('Something went wrong');
            }

        }
        fetchProfile()
    }, [id, me])
    return (
        <>
            <ul>
                <li>
                    <div className={styles.icon_}><UserOutlined className={styles.icon} /></div>
                    <div className={styles.fields}><p>{me ? capitalizeFirstLetter(currentUser.name) : capitalizeFirstLetter(currentProfile?.name)}</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><MailFilled className={styles.icon} /></div>
                    <div className={styles.fields}><p>{me ? currentUser.email : currentProfile?.email}</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><PhoneFilled className={styles.icon} /></div>
                    <div className={styles.fields}> <p>{me ? currentUser.phone : currentProfile?.phone}</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><ClockCircleFilled className={styles.icon} /></div>
                    <div className={styles.fields}><span>Joined on</span> <p>{me ? currentUser.createdAt : currentProfile?.createdAt?.slice(0, 4)}</p></div>
                </li>

                {(currentProfile?.city  || currentUser?.city) &&
                    <li>
                        <div className={styles.icon_}><HomeFilled className={styles.icon} /></div>
                        <div className={styles.fields}><span>Lives in</span> <p>{me ? currentUser.city : currentProfile?.city}</p></div>
                    </li>
                }
                {(currentProfile?.schoolCollege || currentUser?.schoolCollege) &&
                    <li>
                        <div className={styles.icon_}><BankFilled className={styles.icon} /></div>
                        <div className={styles.fields}><span>went to</span> <p>{me ? currentUser.schoolCollege : currentProfile?.schoolCollege}</p></div>
                    </li>
                }
                {(currentProfile?.insta || currentUser?.insta) &&
                    <li>
                        <div className={styles.icon_}><InstagramFilled className={styles.icon} /></div>
                        <div className={styles.fields}><a href={currentProfile?.insta} target='blank_'>www.instagram.com</a></div>
                    </li>
                }
            </ul>
        </>
    )
}

export default Details