import React, { useState } from 'react';
import { Input, Submit } from '../../../components/Auth/Inputs';
import AuthLayout from '../AuthLayout';
import styles from './Otp.module.scss';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, VerifiedOutlined } from '@ant-design/icons';

const Otp = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState();

    const submit = (e) => {
        e.preventDefault();
    }
    return (
        <div className={styles.otp}>
            <AuthLayout heading='WeChat'>
                <h4 style={{ marginTop: '0.5rem' }}>Enter the OTP we've just to you</h4>
                <div className={styles.code_icon}>
                    <VerifiedOutlined />
                </div>
                <form onSubmit={submit}>
                    <Input
                        label='OTP'
                        type='number'
                        value={otp}
                        placeholder='Enter OTP here'
                        onchange={(e) => setOtp(e.target.value)}
                    />
                    <div className={styles.resend}>
                        resend otp
                    </div>
                    <Submit value='Submit' />
                    <div className={styles.or}>OR</div>
                    <div className={styles.back} onClick={() => navigate(-1)}><ArrowLeftOutlined className={styles.icon} />Enter email again</div>
                </form>
            </AuthLayout>
        </div>
    )
}

export default Otp