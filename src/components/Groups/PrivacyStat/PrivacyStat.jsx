import React from 'react';
import styles from './PivacyStat.module.scss';

const PrivacyStat = ({ span, p, icon }) => {
    return (
        <div className={styles.privacy_stat}>
            <div className={styles.icon_}>
                {icon}
            </div>
            <div className={styles.stat}>
                <span>{span}</span>
                <p>{p}</p>
            </div>
        </div>
    )
}

export default PrivacyStat