import React from 'react';
import styles from './ModalLayout.module.scss'
import { CloseOutlined } from '@ant-design/icons';

const Modal = (
    { children,
        head,
        onClick,
        overflow,
        width,
        height,
        margin,
        zIndex,
        center,
        p_bottom,
        gap }
) => {
    return (
        <div className={styles.modal_layout} style={{ overflowY: overflow, zIndex: zIndex, alignItems: center }} >
            <div className={styles.body} style={{ width: width, margin: margin, height: height, gap: gap, padding: p_bottom }}>
                <div className={styles.close} onClick={() => onClick()}>
                    <CloseOutlined className={styles.icon} />
                </div>
                <div className={styles.head}>{head}</div>
                {children}
            </div>
        </div>
    )
}

export default Modal