import React from 'react';
import styles from './SendOtp.module.scss';
import AuthLayout from '../AuthLayout'
import { Input, Submit } from '../../../components/Auth/Inputs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFilled, MailFilled, ArrowLeftOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setOtpState } from '../../../redux/userRedux';

const SendOtp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState('phone');


    const submit = async (e) => {
        e.preventDefault()
        let res;
        if (option === 'phone') {  //opted for phone to send otp
            if (!phone) {
                toast.error('Please enter your phone number')
            } else {
                setLoading(true);
                res = await axios.post('/send-otp', {
                    phone: phone
                });
                if (res.data.status === 'success') {
                    dispatch(setOtpState({ phone: phone, sourceType: 'phone' }))
                    setLoading(false)
                }
            }
        }
        if (option === 'email') { //opted email for sending otp
            if (!email) {
                toast.error('Please enter your email Id')
            } else {
                setLoading(true);
                res = await axios.post('/send-otp', {
                    email: email
                });
                if (res.data.status === 'success') {
                    dispatch(setOtpState({ email: email, sourceType: 'email' }))
                    setLoading(false);
                }
            }
        }
        if (res.data.status === 'err') { //if any backend errors comes
            toast.error(res.data.message)
            setLoading(false);
        }
        if (res.data.status === 'success') {  //if successully otp sent to user
            toast.success(res.data.message)
            setTimeout(() => {
                navigate('/forgot-password')
            }, 1000);
        }
    }
    return (
        <div className={styles.send_otp}>
            <ToastContainer className='toaster' />
            <AuthLayout heading='WeChat'>
                <h4 style={{ marginTop: '0.5rem' }}>Enter your {option} to get OTP</h4>
                <div className={styles.options}>
                    <button
                        onClick={() => {
                            setOption('email');
                            setPhone('')
                        }}
                        className={`${option === 'email' && styles.active}`}>
                        <MailFilled />
                    </button>
                    <button
                        onClick={() => {
                            setOption('phone')
                            setEmail('')
                        }}
                        className={`${option === 'phone' && styles.active}`}>
                        <PhoneFilled />
                    </button>
                </div>
                <form onSubmit={submit}>
                    {
                        option === 'email' ?
                            <Input
                                label='Email'
                                type='email'
                                value={email}
                                placeholder='Write your email'
                                onchange={(e) => setEmail(e.target.value)}
                            /> :
                            <Input
                                label='Phone no.'
                                type='number'
                                value={phone}
                                placeholder='Write your phone'
                                onchange={(e) => setPhone(e.target.value)}
                            />
                    }
                    <div className={styles.req_status}>
                        {loading && <span>Sending OTP...</span>}
                    </div>
                    <Submit value='Send OTP' />
                    <div className={styles.or}>OR</div>
                    <div className={styles.back} onClick={() => navigate('/login')}><ArrowLeftOutlined className={styles.icon} />Go to login</div>
                </form>
            </AuthLayout>
        </div>
    )
}

export default SendOtp;