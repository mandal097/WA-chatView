import React, { useEffect } from 'react';
import styles from './Payment.module.scss';
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

const Payment = () => {
    const [paymentData, setPaymentData] = useState();
    useEffect(() => {
        setPaymentData(payments)
    }, [])

    return (
        <div className={styles.payments}>
            <h1>payments</h1>

            {
                paymentData?.map(ele => (
                    <Modes key={ele.id} ele={ele} />
                ))
            }

        </div>
    )
}

export default Payment