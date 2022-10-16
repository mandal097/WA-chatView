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
import axios from '../../../../config/axios';

const Details = ({ id }) => {
    const { currentUser } = useSelector(state => state.user);
    const [currentProfile, setCurrentProfile] = useState({});
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/user/get-profile/${id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (String(id) === String(currentUser._id)) {
                    setCurrentProfile(currentUser)
                } else {
                    setCurrentProfile(res.data.data)
                }
            } catch (error) {
                console.log('Something went wrong');
            }

        }
        fetchProfile()
    }, [id, currentUser])
    return (
        <>
            <ul>
                <li>
                    <div className={styles.icon_}><UserOutlined className={styles.icon} /></div>
                    <div className={styles.fields}><p>{currentProfile?.name}</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><MailFilled className={styles.icon} /></div>
                    <div className={styles.fields}><p>{currentProfile?.email}</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><PhoneFilled className={styles.icon} /></div>
                    <div className={styles.fields}> <p>{currentProfile?.phone}</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><ClockCircleFilled className={styles.icon} /></div>
                    <div className={styles.fields}>Joined on <p>{currentProfile?.createdAt?.slice(0, 4)}</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><HomeFilled className={styles.icon} /></div>
                    <div className={styles.fields}>Lives in <p>New Delhi</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><BankFilled className={styles.icon} /></div>
                    <div className={styles.fields}>went to <p>SS khalsa sr. secc school</p></div>
                </li>
                <li>
                    <div className={styles.icon_}><InstagramFilled className={styles.icon} /></div>
                    <div className={styles.fields}><a href="https://www.facebook.com/aniket.raj.1610092">www.instagram.com</a></div>
                </li>
            </ul>
        </>
    )
}

export default Details