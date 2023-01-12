import React from 'react';
import styles from './Overview.module.scss';

const Counts = () => {
    return (
        <div className={styles.insight_count}>

            <div className={styles.counts_div}>
                <h1>0 requests reviewed</h1>
                <small>9 jan 2023</small>
                <div className={styles.counts_wrapper}>
                    <div className={styles.count}>
                        <b>Accepted</b>
                        <span>0</span>
                    </div>
                    <div className={styles.count}>
                        <b>Declined</b>
                        <span>0</span>
                    </div>
                </div>
            </div>
            
            <div className={styles.counts_div}>
                <h1>0 requests reviewed</h1>
                <small>9 jan 2023</small>
                <div className={styles.counts_wrapper}>
                    <div className={styles.count}>
                        <b>Accepted</b>
                        <span>0</span>
                    </div>
                    <div className={styles.count}>
                        <b>Declined</b>
                        <span>0</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Counts