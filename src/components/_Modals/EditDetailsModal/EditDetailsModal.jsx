import React from 'react';
import styles from './EditDetails.module.scss';
import { Input, Submit } from '../../Auth/Inputs'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from '../ModalLayout';

const EditDetailsModal = ({ setShowEditDetailsModal }) => {
    const { currentUser } = useSelector(state => state.user);
    const [name, setName] = useState(currentUser?.name);
    const [email, setEmail] = useState(currentUser?.email);
    const [phone, setPhone] = useState(currentUser?.phone);
    const [city, setCity] = useState(currentUser?.city ? currentUser?.city : '');
    const [school, setSchool] = useState(currentUser?.school ? currentUser?.school : '');
    const [insta, setInsta] = useState(currentUser?.insta ? currentUser?.insta : '');
    return (
        <Modal
            width='50rem'
            height='70vh'
            center='center'
            zIndex='100'
            head='Customize Intro'
            onClick={() => setShowEditDetailsModal(false)}
        >
            <form className={`${styles.form} ${'custom_scroll'}`}>
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
        </Modal>
    )
}

export default EditDetailsModal