import React, { useState } from 'react';
import styles from './ResetPassword.module.scss';
import AuthLayout from '../AuthLayout'
import { InputPassword, Submit } from '../../../components/Auth/Inputs';

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }
    return (
        <div className={styles.reset_password}>
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