import React, { useEffect } from 'react';
import styles from './Security.module.scss';
import { shopping, payment } from './data'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Section = ({ ele }) => {
    return (
        <div className={styles.section}>
            <b>{ele?.topic}</b>
            <p>{ele?.desc}</p>
        </div>
    )
}

const Security = () => {
    const [securityDetails, setSecurityDetails] = useState();
    const [paymentDetails, setPaymentDetails] = useState()
    useEffect(() => {
        setSecurityDetails(shopping);
        setPaymentDetails(payment)
    }, [])

    return (
        <div className={styles.security}>
            <h1>Safe and Secure Shopping</h1>

            {
                securityDetails?.map(ele => (
                    <Section key={ele.id} ele={ele} />
                ))
            }


            <h1>Payment Options</h1>

            {
                paymentDetails?.map(ele => (
                    <Section key={ele.id} ele={ele} />
                ))
            }

            <div className={styles.section}>
                <b>Privacy Policy</b>
                <p>weeconnect.in respects your privacy and is committed to protecting it. For more details, please see our <Link to={`/shop/privacy`} className={styles.link}>Privacy Policy</Link></p>
            </div>
            <div className={styles.section}>
                <b>Contact Us</b>
                <p>Couldn't find the information you need? Please <Link to={`/shop/contact_us`} className={styles.link}> Contact Us</Link></p>
            </div>

        </div>
    )
}

export default Security