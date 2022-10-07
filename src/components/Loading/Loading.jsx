import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Loading.module.scss'

const Loading = ({font}) => {
    return (
        <div className={styles.loader} style={{fontSize:font}}><LoadingOutlined /></div>
    )
}

export default Loading