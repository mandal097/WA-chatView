import React from 'react';
import { useState } from 'react';
import styles from './InputField.module.scss';
import {
    EyeInvisibleOutlined,
    EyeOutlined
} from '@ant-design/icons'

export const Input = ({ label, type, placeholder, onchange, value }) => {
    return (
        <div className={styles.input}>
            <label htmlFor="">{label} : </label>
            <input
                type={type}
                value={value}
                onChange={onchange}
                placeholder={placeholder}
            />
        </div>
    )
}
export const InputPassword = ({ label, placeholder, onchange, value }) => {
    const [show, setShow] = useState(false);

    const handelType = () => {
        switch (show) {
            case false:
                setShow(true);
                break;
            case true:
                setShow(false);
                break;
            default:
                break;
        }
    }
    return (
        <div className={styles.input}>
            <label htmlFor="">{label} : </label>
            <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={onchange}
                placeholder={placeholder}
            />
            <div className={styles.hide_show} onClick={handelType}>
                {!show ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </div>
        </div>
    )
}

export const Submit = ({value}) => {
    return (
        <div className={styles.input}>
            <input
                className={styles.submit}
                type='submit'
                value={`${value}`}
            />
        </div>
    )
}
