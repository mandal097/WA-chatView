import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={`${styles.section} ${styles.items}`}>

          <div className={styles.footer_item}>
            <span>About</span>
            <Link to='contact_us' className={styles.link}>contact us</Link>
            <Link to='about_us' className={styles.link}>about us</Link>
            {/* <Link to='our_story' className={styles.link}>our story</Link> */}
            <Link to='blog' className={styles.link}>blog</Link>
            <Link to='signin' className={styles.link}>sign in</Link>
          </div>

          <div className={styles.footer_item}>
            <span>Help</span>
            <Link to='payments' className={styles.link}>Payments</Link>
            <Link to='shippings' className={styles.link}>shippings</Link>
            <Link to='faqs' className={styles.link}>FAQs</Link>
            <Link to='cancellation&returns' className={styles.link}>cancellation & returns</Link>
            {/* <Link to='report' className={styles.link}>Report infringement</Link> */}
          </div>

          <div className={styles.footer_item}>
            <span>POLICY</span>
            <Link to='returns_policy' className={styles.link}>return policy</Link>
            <Link to='terms-of-use' className={styles.link}>terms of use</Link>
            <Link to='security' className={styles.link}>security</Link>
            {/* <Link to='privacy' className={styles.link}>privacy</Link> */}
            <Link to='sitemap' className={styles.link}>sitemap</Link>
          </div>

          <div className={styles.footer_item}>
            <span>SOCIAL</span>
            <a href='https://www.facebook.com/' target='_blank_' className={styles.link}>facebook</a>
            <a href='https://www.instagram.com/' target='_blank_' className={styles.link}>instagram</a>
            <a href='https://www.twitter.com/' target='_blank_' className={styles.link}>twitter</a>
            <a href='https://www.youtube.com/' target='_blank_' className={styles.link}>youTube</a>
          </div>

          <div className={`${styles.section9} ${styles.newsletter}`}>
            <span>Let's Stay Connected</span>
            <p>Enter your email to unlock 10% off</p>
            <div className={styles.input}>
              <input type="text" placeholder='Your Email' />
              <button>Submit</button>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.c_name}>
        <span>&#169; 2023 WeeConnect Shop</span>
      </div>
    </div>
  )
}

export default Footer