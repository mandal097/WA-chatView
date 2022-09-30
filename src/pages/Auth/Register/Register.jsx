import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, InputPassword, Submit } from '../../../components/Auth/Inputs';
import AuthLayout from '../AuthLayout';
import styles from './Register.module.scss'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const submit = (e) => {
        e.preventDefault();
        console.log(name, email, password)
    }
    return (
        <div className={styles.register}>
            <AuthLayout
                heading='Welcome to WeChat'
            >
                <h4>Register</h4>
                <form onSubmit={submit}>
                    <Input
                        label='name'
                        type='text'
                        value={name}
                        placeholder='Write your name'
                        onchange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label='Email'
                        type='email'
                        value={email}
                        placeholder='Write your email'
                        onchange={(e) => setEmail(e.target.value)}
                    />
                    <InputPassword
                        label='Password'
                        value={password}
                        placeholder='Write your password'
                        onchange={(e) => setPassword(e.target.value)}
                    />

                    <Submit value='Register' />
                    <div className={styles.to_togin}>
                        <span>Already have an Account ?</span>
                        <Link to='/login' className='link'>Sign In</Link>
                    </div>

                </form>
            </AuthLayout>
        </div>
    )
}
export default Register