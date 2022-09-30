import React from 'react';
import styles from './ForgotPassword.module.scss';
import AuthLayout from '../AuthLayout'
import { Input, Submit } from '../../../components/Auth/Inputs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneFilled, MailFilled, ArrowLeftOutlined } from '@ant-design/icons';

const ForgotPasword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState('email')

    const submit = (e) => {
        e.preventDefault()
        console.log(email);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/forgot-password/otp')
        }, 2000);
    }
    return (
        <div className={styles.forgotPassword}>
            <AuthLayout heading='WeChat'>
                <h4 style={{ marginTop: '0.5rem' }}>Enter your {option} to get OTP</h4>
                <div className={styles.options}>
                    <button
                        onClick={() => setOption('email')}
                        className={`${option === 'email' && styles.active}`}>
                        <MailFilled />
                    </button>
                    <button
                        onClick={() => setOption('phone')}
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

export default ForgotPasword