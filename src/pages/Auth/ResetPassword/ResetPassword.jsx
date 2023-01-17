import React, { useState } from 'react';
import styles from './ResetPassword.module.scss';
import AuthLayout from '../AuthLayout'
import { InputPassword, Submit } from '../../../components/Auth/Inputs';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../config/axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userRedux';
import { removeMembers } from '../../../redux/AddToGroup';
import { setCurrentChatInitial } from '../../../redux/chatRedux';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        dispatch(logout());
        dispatch(removeMembers());
        dispatch(setCurrentChatInitial())
        navigate('/login');
    };


    const submit = async (e) => {
        e.preventDefault();
        if (!oldPassword || !password || !confirmPassword) {
            return toast.error('All fields are required');
        }
        if (password !== confirmPassword) {
            return toast.error('Password mismatched')
        }
        try {
            setLoading(true);

            const res = await axios.put('/user/reset-password', { password, oldPassword }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data.status === 'err') {  //if backend error comes 
                toast.error(res.data.message);
                setLoading(false);
            }
            if (res.data.status === 'success') { //if  password successfully updated
                toast.success(res.data.message);
                setLoading(false);
                setTimeout(() => {
                    setLoading(false);
                    logoutUser();
                }, 2000);
            };

        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false);
        }

    }
    return (
        <div className={styles.reset_password}>
            <ToastContainer className='toaster' />
            <AuthLayout heading='WeChat'>
                <h4>Reset Password</h4>
                <form onSubmit={submit}>
                    <InputPassword
                        label='Old password'
                        placeholder='enter your old password'
                        value={oldPassword}
                        onchange={(e) => setOldPassword(e.target.value)}
                    />
                    <InputPassword
                        label='New password'
                        placeholder='enter your new password'
                        value={password}
                        onchange={(e) => setPassword(e.target.value)}
                    />
                    <InputPassword
                        label='Confirm new password'
                        placeholder='enter your new password again'
                        value={confirmPassword}
                        onchange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Submit value={loading ? 'Wait..' : 'Reset'} />
                </form>
            </AuthLayout>
        </div>
    )
}

export default ResetPassword