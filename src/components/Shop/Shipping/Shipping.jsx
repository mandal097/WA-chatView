import React, { useEffect } from 'react';
import styles from './Shipping.module.scss';
import { payments } from './data'
import { useState } from 'react';

const Modes = ({ ele }) => {
    return (
        <div className={styles.section}>
            <b>{ele?.mode}</b>
            {
                ele?.desc?.map(d => (
                    <p>{d}</p>
                ))
            }
        </div>
    )
}

const Shipping = () => {
    const [paymentData, setPaymentData] = useState();
    useEffect(() => {
        setPaymentData(payments)
    }, [])

    return (
        <div className={styles.shipping}>
            <h1>Shipping</h1>

            {
                paymentData?.map(ele => (
                    <Modes key={ele.id} ele={ele} />
                ))
            }

        </div>
    )
}

export default Shipping