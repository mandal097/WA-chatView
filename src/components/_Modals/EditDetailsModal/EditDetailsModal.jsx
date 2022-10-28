import React from 'react';
import styles from './EditDetails.module.scss';
import { Input, Submit } from '../../Auth/Inputs'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from '../ModalLayout';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';
import { updateDetails } from '../../../redux/userRedux';
// import { updateCurrentDetails } from '../../../redux/currentProfile';
const EditDetailsModal = ({ setShowEditDetailsModal }) => {
    const { currentUser } = useSelector(state => state.user);
    const [name, setName] = useState(currentUser?.name);
    const [email, setEmail] = useState(currentUser?.email);
    const [phone, setPhone] = useState(currentUser?.phone);
    const [city, setCity] = useState(currentUser?.city);
    const [school, setSchool] = useState(currentUser?.schoolCollege);
    const [insta, setInsta] = useState(currentUser?.insta);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const updateProfile = async (e) => {
        e.preventDefault()
        const obj = {
            name: name,
            email: email,
            phone: phone,
            city: city,
            schoolCollege: school,
            insta: insta
        }
        // dispatch(updateCurrentDetails({ details: obj }))
        try {
            setLoading(true);
            const res = await axios.put(`/user/update-profile`, {
                name,
                email,
                phone,
                city,
                schoolCollege: school,
                insta
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data);
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setLoading(false);
                dispatch(updateDetails({ details: obj }))
            }
        } catch (error) {
            setLoading(true);
            toast.error('something went wrong')
        }
    }


    return (
        <Modal
            width='50rem'
            height='70vh'
            center='center'
            zIndex='100'
            head='Customize Intro'
            onClick={() => setShowEditDetailsModal(false)}
        >
            <form className={`${styles.form} ${'custom_scroll'}`} onSubmit={updateProfile}>
                <Input
                    label='Name'
                    type='text'
                    value={name}
                    onchange={(e) => setName(e.target.value)}
                    placeholder='write your name..'
                    required={true}
                />
                <Input
                    label='Email'
                    type='text'
                    value={email}
                    onchange={(e) => setEmail(e.target.value)}
                    placeholder='write your email..'
                    required={true}
                />
                <Input
                    label='Phone'
                    type='number'
                    value={phone}
                    onchange={(e) => setPhone(e.target.value)}
                    placeholder='write your contact number...'
                    required={true}
                />
                <Input
                    label='City'
                    type='text'
                    value={city}
                    onchange={(e) => setCity(e.target.value)}
                    placeholder='write your city you lives in..'
                    required={true}
                />
                <Input
                    label='School/College'
                    type='text'
                    value={school}
                    onchange={(e) => setSchool(e.target.value)}
                    placeholder='write your school/college..'
                    required={true}
                />
                <Input
                    label='Instagram profile'
                    type='text'
                    value={insta}
                    onchange={(e) => setInsta(e.target.value)}
                    placeholder='give your instagram profile..'
                    required={true}
                />
                <Submit value={loading ? 'Updating...' : 'Update'} color='var(--btn)' />
            </form>
        </Modal>
    )
}

export default EditDetailsModal