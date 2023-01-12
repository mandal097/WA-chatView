import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './Overview.module.scss';

const DemoMessage = ({setShowMessage}) => {
    return (
        <div className={styles.demo_message}>
            <div className={styles.wrapper}>
                <div className={styles.close} onClick={()=>setShowMessage(false)}>
                    <CloseOutlined className={styles.icon} />
                </div>
                <p>The data on this page is dummy <br /> This is only for practice purpose <br />Will work on this later </p>
            </div>
        </div>
    )
}

export default DemoMessage