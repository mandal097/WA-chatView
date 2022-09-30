import React from 'react';
import AuthLayout from '../AuthLayout';
import styles from './Login.module.scss'
import { Input, InputPassword, Submit } from '../../../components/Auth/Inputs';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault();
    console.log(email, password)
  }
  return (
    <div className={styles.login}>
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
            placeholder='Write your email'
            onchange={(e) => setPassword(e.target.value)}
          />

          <Submit value="Login" />
          <div className={styles.to_register}>
            <span>Don't have an Account ?</span>
            <Link to='/register' className='link'>Sign Up</Link>
          </div>
          <div className={styles.to_register}>
            <Link to='/forgot-password' className='link'>Forgot Password</Link>
          </div>

        </form>
      </AuthLayout>
    </div>
  )
}

export default Login