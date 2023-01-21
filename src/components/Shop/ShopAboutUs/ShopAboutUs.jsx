import { ArrowRightOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShopAboutUs.module.scss';

const ShopAboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.about_us}>
            <div className={styles.wrapper}>
                <h1>Who we are</h1>

                <p>The About Us Page of Magic Spoon does not have too much information; however, it has enough content about the team, history and unique selling point which makes them different from others. That is also the reason why customers should choose them.</p>

                <p>The About Us Page of Magic Spoon does not have too much information; however, it has enough content about the team, history and unique selling point which makes them different from others. That is also the reason why customers should choose them.The About Us Page of Magic Spoon does not have too much information; however, it has enough content about the team, history and unique selling point which makes them different from others. That is also the reason why customers should choose them. The About Us Page of Magic Spoon does not have too much informatio</p>

                <p>The About Us Page of Magic Spoon does not have too much information; however, it has enough content about the team, history and unique selling point which makes them different from others. That is also the reason why customers should choose them.</p>

                <div className={styles.flex}>
                    <div className={styles.img}>
                        <img src="/assets/images/out_mission.jpg" alt="" />
                    </div>
                    <div className={styles.content}>
                        <h2>Our mission</h2>
                        <p>The About Us Page of Magic Spoon does not have too much information; however, it has enough content about the team, history and unique selling point which makes them different from others. That is also the reason why customers should choose them.</p>
                    </div>
                </div>
                <div className={styles.flex} style={{ flexDirection: 'row-reverse' }}>
                    <div className={styles.img}>
                        <img src="/assets/images/our_values.jpg" alt="" />
                    </div>
                    <div className={styles.content}>
                        <h2>Our values</h2>
                        <p>The About Us Page of Magic Spoon does not have too much information; however, it has enough content about the team, history and unique selling point which makes them different from others. That is also the reason why customers should choose them.</p>
                    </div>
                </div>
                <div className={styles.flex}>
                    <div className={styles.img}>
                        <img src="/assets/images/our_community.jpg" alt="" />
                    </div>
                    <div className={styles.content}>
                        <h2>Our Community</h2>
                        <p>The About Us Page of Magic Spoon does not have too much information; however, it has enough content about the team, history and unique selling point which makes them different from others. That is also the reason why customers should choose them.</p>
                        <button onClick={() => {
                            navigate('/home');
                            window.location.reload()
                        }}>Visit social network</button>
                    </div>
                </div>

                <div className={styles.contact}>
                    <p>Or reach us offline at </p>
                    <button onClick={()=>navigate('/shop/contact_us')}>contact  <ArrowRightOutlined className={styles.icon} /></button>
                </div>

            </div>
        </div>
    )
}

export default ShopAboutUs