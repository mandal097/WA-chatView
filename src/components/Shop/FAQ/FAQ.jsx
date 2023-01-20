import React from 'react';
import styles from './FAQ.module.scss';
import {
    ArrowRightOutlined,
    DownOutlined,
    QuestionCircleOutlined,
    UpOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const FAQSTRIPE = () => {
    const [arrowDir, setArrowDir] = useState('up');

    const handleClick = () => {
        switch (arrowDir) {
            case 'up':
                setArrowDir('down');
                break;
            case 'down':
                setArrowDir('up');
                break;
            default:
                setArrowDir('up');
                break;
        }
    }
    return (
        <div className={styles.faq_stripe}>
            <div className={styles.ques}>
                <p>What is Cold Brew Coffee? Why should I opt for this?</p>
                <div className={styles.controls} onClick={handleClick}>
                    {arrowDir === 'up'
                        ? <UpOutlined className={styles.icon} />
                        : <DownOutlined className={styles.icon} />
                    }
                </div>
            </div>
            {arrowDir === 'down' &&
                <div className={styles.ans}>
                    <p>Original is our take on the purest expression of coffee. It has our signature chocolatey taste that comes from select Arabica beans. This is a medium roast coffee. Dark Roast is packed with deep flavours, a heavy body, and a smooth mouth-feel. Mellow it down with a little milk if that's your thing.</p>
                </div>
            }
        </div>
    )
}

const FAQ = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.faq}>
            <div className={styles.wrapper}>
                <div className={styles.img}>
                    <img src="/assets/images/faq.webp" alt="" />
                </div>
                <div className={styles.stripe}>
                    <QuestionCircleOutlined className={styles.icon} />
                    <p>Got a different question?</p>
                    <button onClick={() => navigate('/shop/contact_us')}>Contact us  <ArrowRightOutlined className={styles.icon} /> </button>
                </div>

                <FAQSTRIPE />
                <FAQSTRIPE />
                <FAQSTRIPE />
                <FAQSTRIPE />
                <FAQSTRIPE />

            </div>
        </div>
    )
}

export default FAQ