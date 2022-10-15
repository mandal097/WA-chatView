import React from 'react';
import styles from './EditDetails.module.scss';
import { Input, Submit } from '../../../Auth/Inputs'
import {
    CloseOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const EditDetailsModal = ({ setShowEditDetailsModal }) => {
    const { currentUser } = useSelector(state => state.user);
    const [name, setName] = useState(currentUser?.name);
    const [email, setEmail] = useState(currentUser?.email);
    const [phone, setPhone] = useState(currentUser?.phone);
    const [city, setCity] = useState(currentUser?.city ? currentUser?.city : '');
    const [school, setSchool] = useState(currentUser?.school ? currentUser?.school : '');
    const [insta, setInsta] = useState(currentUser?.insta ? currentUser?.insta : '');
    return (
        <div className={styles.edit_details_modal} >
            <div className={styles.body}>
                <div className={styles.close} onClick={() => setShowEditDetailsModal(false)}>
                    <CloseOutlined className={styles.icon} />
                </div>
                <div className={styles.head}>Customize Intro</div>
                <form className={`${styles.inputs} ${'custom_scroll'}`}>
                    <Input
                        label='Name'
                        type='text'
                        value={name}
                        onchange={(e) => setName(e.target.value)}
                        placeholder='write your name..'
                    />
                    <Input
                        label='Email'
                        type='text'
                        value={email}
                        onchange={(e) => setEmail(e.target.value)}
                        placeholder='write your email..'
                    />
                    <Input
                        label='Phone'
                        type='number'
                        value={phone}
                        onchange={(e) => setPhone(e.target.value)}
                        placeholder='write your contact number...'
                    />
                    <Input
                        label='City'
                        type='text'
                        value={city}
                        onchange={(e) => setCity(e.target.value)}
                        placeholder='write your city you lives in..'
                    />
                    <Input
                        label='School/College'
                        type='text'
                        value={school}
                        onchange={(e) => setSchool(e.target.value)}
                        placeholder='write your school/college..'
                    />
                    <Input
                        label='Instagram profile'
                        type='text'
                        value={insta}
                        onchange={(e) => setInsta(e.target.value)}
                        placeholder='give your instagram profile..'
                    />
                    <Submit value='Update' color='var(--btn)' />
                </form>
            </div>
        </div>
    )
}

export default EditDetailsModal