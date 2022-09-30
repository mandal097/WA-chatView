import React from 'react';
import styles from './Default.module.scss';
import { WechatOutlined } from '@ant-design/icons'

const Default = () => {
    return (
        <div className={styles.default}>
            <div className={styles.img}>
                <WechatOutlined />
            </div>
            <h2>Start a new Chat from your friends</h2>
        </div>
    )
}

export default Default