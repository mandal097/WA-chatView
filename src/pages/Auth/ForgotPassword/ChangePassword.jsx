import React, { useState } from 'react';
import { Input, InputPassword, Submit } from '../../../components/Auth/Inputs';
import AuthLayout from '../AuthLayout';
import styles from './ChangePassword.module.scss';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, VerifiedOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ChangePassword = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [phoneEmail, setPhoneEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { otpState } = useSelector((state) => state.user);

    useEffect(() => {
        if (otpState.phone !== '') {
            setPhoneEmail(otpState.phone)
        } else {
            setPhoneEmail(otpState.email)
        }
    }, [otpState])

    const submit = async (e) => {
        e.preventDefault();
        if (!otp || !newPassword || !confirmNewPassword) {
            toast.error('All fields are required');
        } else {
            if (newPassword !== confirmNewPassword) {
                toast.error('Password mismatched')
            } else {
                try {
                    setLoading(true)
                    const res = await axios.post('/user/update-password/forgot', {
                        phone: phoneEmail,
                        otp: +otp,
                        password: newPassword
                    });
                    if (res.data.status === 'err') {  //if backend error comes 
                        toast.error(res.data.message);
                        setLoading(false);
                    }
                    if (res.data.status === 'success') { //if  password successfully updated
                        toast.success(res.data.message);
                        setLoading(false);
                        // setTimeout(() => {
                        //     navigate('/login');                            
                        // }, 1000);
                        // if everything is fine, know according to backend api we have delete the otp document of this user with given credential from OTP table
                        // setTimeout(async () => {

                        //     if (otpState.phone !== '') {
                        //         const res = await axios.delete(`/delete-otp/${phoneEmail}`);
                        //         if (res.data.status === 'err') {
                        //             toast.error(res.data.message)
                        //         }
                        //         if (res.data.status === 'success') {
                        //             toast.error(res.data.message)
                        //         }
                        //     } else {
                        //         const res = await axios.post(`/delete-otp/${phoneEmail}`)
                        //         if (res.data.status === 'err') {
                        //             toast.error(res.data.message)
                        //         }
                        //         if (res.data.status === 'success') {
                        //             toast.error(res.data.message)
                        //         }
                        //     }
                        // }, 2000);
                    };
                } catch (error) {
                    setLoading(false);
                };
            };
        };
    };
    return (
        <div className={styles.change_password}>
            <ToastContainer className='toaster' />
            <AuthLayout heading='WeChat'>
                <h4 style={{ marginTop: '0.5rem' }}>Enter the OTP we've just sent to you</h4>
                <div className={styles.code_icon}>
                    <VerifiedOutlined />
                </div>
                <form onSubmit={submit}>
                    <InputPassword
                        label='New password'
                        type='text'
                        value={newPassword}
                        placeholder='Enter new Password'
                        onchange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputPassword
                        label=' Confirm new password'
                        type='text'
                        value={confirmNewPassword}
                        placeholder='Enter again new Password'
                        onchange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <Input
                        label='OTP'
                        type='number'
                        value={otp}
                        placeholder='Enter OTP here'
                        onchange={(e) => setOtp(e.target.value)}
                    />
                    <div className={styles.resend} onClick={() => navigate('/send-otp')}>
                        resend otp
                    </div>
                    <Submit value={loading ? "loading..." : "Submit"} />
                    <div className={styles.or}>OR</div>
                    <div className={styles.back} onClick={() => navigate(-1)}><ArrowLeftOutlined className={styles.icon} />Enter email / phone again</div>
                </form>
            </AuthLayout>
        </div>
    )
}

export default ChangePassword;