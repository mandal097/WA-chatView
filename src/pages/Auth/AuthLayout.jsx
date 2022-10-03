import React from 'react';
import styles from './AuthLayout.module.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, heading }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.auth}>
      <div className={styles.wrapper}>
        <div className={styles.back_btn} onClick={()=>navigate(-1)}><ArrowLeftOutlined /></div>
        <h3>{heading}</h3>
        {children}
        <footer>Made with ♥ by Amarnath kumar mandal</footer>
      </div>
    </div>
  )
}

export default AuthLayout