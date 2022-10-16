import React from 'react';
import styles from './TaggedUser.module.scss';
import { CloseOutlined } from '@ant-design/icons';

const TaggedUser = ({ setShowTagModal,post }) => {
    return (
        <div className={styles.tagged_users}>
            <div className={styles.body}>
                <div className={styles.close} onClick={() => setShowTagModal(false)}>
                    <CloseOutlined className={styles.icon} />
                </div>
                <div className={styles.head}>Tagged friends</div>
            </div>
        </div>
    )
}

export default TaggedUser