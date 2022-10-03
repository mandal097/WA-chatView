import React from 'react';
import AuthLayout from '../AuthLayout';
import styles from './Login.module.scss'
import { Input, InputPassword, Submit } from '../../../components/Auth/Inputs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../config/axios';
import { login } from '../../../redux/userRedux'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('All fields are required')
    }
    setLoading(true);
    try {
      const res = await axios.post('user/login', {
        email: email,
        password: password
      });
      if (res.data.status === 'success') {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        dispatch(login(res.data.data))
        setTimeout(() => {
          navigate('/messenger')
        }, 1000);
      }
      if (res.data.status === 'err') {
        toast.error(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={styles.login}>
      <ToastContainer className='toaster' />
      <AuthLayout
        heading='Welcome to WeChat'
      >
        <h4>Login</h4>
        <form onSubmit={submit}>
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

          <Submit value={loading ? "Loading" : "Login"} />
          <p className={styles.or}>OR</p>
          <Submit value='Sign In with Google' color='coral' />
          <div className={styles.to_register}>
            <span>Don't have an Account ?</span>
            <Link to='/register' className='link'>Sign Up</Link>
          </div>
          <div className={styles.to_register}>
            <Link to='/send-otp' className='link'>Forgot Password</Link>
          </div>

        </form>
      </AuthLayout>
    </div>
  )
}

export default Login