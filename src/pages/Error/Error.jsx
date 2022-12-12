import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Error.module.scss';

const Error = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.error}>
            <div className={styles.absolute}>404</div>
            <div className={styles.wrapper}>
                <h1>Oops!</h1>
                <h1>🤐</h1>
                <p>The page you are looking for might have been  removed had its name is changed or is temporarily unavailable </p>
                <div className={styles.btns}>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                    <button onClick={() => navigate('/')}>Go to home page</button>
                </div>
            </div>
        </div>
    )
}

export default Error