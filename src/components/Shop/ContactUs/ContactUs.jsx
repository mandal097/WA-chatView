import { ArrowRightOutlined, BugOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContactUs.module.scss';

const ContactUs = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.contact_us}>
            <div className={styles.wrapper}>

                <div className={styles.stripe}>
                    <BugOutlined className={styles.icon} />
                    <p>Wondering where your order is?</p>
                    <button onClick={() => navigate('/shop/test')}>track <ArrowRightOutlined className={styles.icon} /> </button>
                </div>

                <div className={styles.contact_details}>
                    <h1>Contacts</h1>
                    <h2>Get in touch with the right people for a faster response. Email is the most direct way to send in a question.</h2>

                    <div className={styles.contacts}>
                        <div className={styles.contact}>
                            <span>PRODUCTS & ORDERS</span>
                            <a href="mailto:amarnathmandal097@gmail.com">amarnathmandal097@gmail.com</a>
                        </div>
                        <div className={styles.contact}>
                            <span>SUBSCRIPTIONS</span>
                            <a href="mailto:amarnathmandal097@gmail.com">amarnathmandal097@gmail.com</a>
                        </div>
                        <div className={styles.contact}>
                            <span>OPENINGS</span>
                            <a href="mailto:amarnathmandal097@gmail.com">amarnathmandal097@gmail.com</a>
                        </div>
                        <div className={styles.contact}>
                            <span>BULK ORDERS & BUSINESS</span>
                            <a href="mailto:amarnathmandal097@gmail.com">amarnathmandal097@gmail.com</a>
                        </div>
                        <div className={styles.contact}>
                            <span>MARKETING & COLLABORATIONS</span>
                            <a href="mailto:amarnathmandal097@gmail.com">amarnathmandal097@gmail.com</a>
                        </div>
                    </div>

                    <div className={`${styles.stripe} ${styles.faqs}`}>
                        <p>Quick answers to the most common queries are found on our
                            {' '}  <span>Frequently Asked Questions</span> page. Check there first!</p>
                        <button onClick={() => navigate('/shop/faqs')}>FAQs <ArrowRightOutlined className={styles.icon} /> </button>
                    </div>

                </div>

                <div className={styles.phone}>
                    <p>Or reach us offline at </p>
                    <a href="tel:+918826764772">+91 8826764772</a>
                </div>

            </div>
        </div>
    )
}

export default ContactUs