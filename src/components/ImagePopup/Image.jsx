import React from 'react';
import styles from './Image.module.scss';
import { CloseOutlined } from '@ant-design/icons';

const Image = ({ src , setShowImagePopup }) => {

    return (
        <div className={styles.image}>
            <div className={styles.wrapper}>
                <div className={styles.close} onClick={() => setShowImagePopup(false)}>
                    <CloseOutlined className={styles.icon} />
                </div>
                <img src={src} alt="picture_" />
            </div>
        </div>
    )
}

export default Image