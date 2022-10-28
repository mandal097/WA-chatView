import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, InputPassword, Submit } from '../../../components/Auth/Inputs';
import AuthLayout from '../AuthLayout';
import styles from './Register.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../config/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!name || !email || !phone || !password) {
            toast.error('Please fill all fields')
        }
        try {
            const res = await axios.post('user/registration', {
                name: name,
                email: email,
                phone: phone,
                password: password
            });
            console.log(res);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                setLoading(false);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
        } catch (error) {
            toast.error('something went wrong')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={styles.register}>
            <ToastContainer className='toaster' />
            <AuthLayout
                heading='Welcome to WeChat'
            >
                <h4>Register</h4>
                <form onSubmit={submit}>
                    <Input
                        label='Name'
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
                    <Input
                        label='Phone'
                        type='text'
                        value={phone}
                        placeholder='Write your phone'
                        onchange={(e) => setPhone(e.target.value)}
                    />
                    <InputPassword
                        label='Password'
                        value={password}
                        placeholder='Write your password'
                        onchange={(e) => setPassword(e.target.value)}
                    />

                    <Submit value={loading ? "loading..." : "Register"} />
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