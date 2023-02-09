import React from 'react';
import styles from './PriceInfo.module.scss';

const PriceInfo = () => {
    return (
        <div className={styles.price_info}>
            <b>Prices</b>
            <div className={styles.prices}>
                <p>Maximum Retail Price</p>
                <strike>₹ 999</strike>
            </div>
            <div className={styles.prices}>
                <p>Selling Price</p>
                <strike>₹ 250</strike>
            </div>
            <div className={styles.prices}>
                <p style={{ color: 'var(--textSoft)' }}>Special Price</p>
                <p style={{ color: 'var(--textSoft)' }}>₹ 149</p>
            </div>
            <div className={styles.discount_per}>
                <p>Overall you save ₹850 (85%) on this product</p>
            </div>
        </div>
    )
}

export default PriceInfo