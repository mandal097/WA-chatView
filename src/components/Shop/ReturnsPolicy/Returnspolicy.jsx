import React from 'react';
import styles from './Returnspolicy.module.scss';

const Returnspolicy = () => {
    return (
        <div className={styles.returns_policy}>
            <p>Our normal support hours are Monday through Friday, 9am to 5pm IST.</p>
            <h1>For Returns, Refunds and Exchange:</h1>
            <p>Please email us at: <a href="mailto:amarnathmandal097@gmail.com">amarnathmandal097@gmail.com</a></p>
            <p>After placing the order, the customer can cancel the order within 24 hours if he/she wishes to by emailing us at  amarnathmandal097@gmail.com</p>
            <p>In case payment has already been made, the refund will be processed via PayU or RazorPay within 2-3 working days. </p>
            <p>If you didn't like the product, you can return the products within 5 working days, and we'll refund your money. No returns will be accepted for merchandise orders unless a defected unit has been shipped. To initiate a request, please email us at  amarnathmandal097@gmail.com with the subject 'Please refund my order' </p>
        </div>
    )
}

export default Returnspolicy