import React from 'react';
import styles from './AuthLayout.module.scss';

const AuthLayout = ({children , heading}) => {
    return (
        <div className={styles.auth}>
          <div className={styles.wrapper}>
           <h3>{heading}</h3>
           {children}
           <footer>Made with ♥ by Amarnath kumar mandal</footer>
          </div>
        </div>
    )
}

export default AuthLayout