import React from 'react';
import styles from './ProductPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Browse from '../Browse/Browse'
import {
    BookFilled,
    CloseOutlined,
    MessageFilled,
    MoreOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split('/')[3]

    const back = () => {
        navigate(-1)
    }
    return (
        <div className={styles.product_page}>
            <div className={styles.close} onClick={back}>
                <CloseOutlined className={styles.icon} />
            </div>
            <div className={styles.product}>
                <div className={styles.left}>
                    <div className={styles.img}>
                        <img src="https://scontent.fdel1-3.fna.fbcdn.net/v/t45.5328-4/310854811_5731274926966946_3761582780842765839_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=c48759&_nc_ohc=Okc70puVDCgAX_CPN0t&_nc_ht=scontent.fdel1-3.fna&oh=00_AfA2OLnDSBivj7t_jTcL6Nz_3AjyXI5Nm9jRKI-KRvLsWw&oe=63819218" alt="" />
                    </div>
                </div>
                <div className={styles.right}>
                    <h1>{path}</h1>
                    <span>₹ 1944</span>
                    <small>Listed 2 weeks ago in Delhi, DL</small>
                    <div className={styles.actions_btn}>
                        <button> <MessageFilled className={styles.icon} />Message</button>
                        <button> <BookFilled className={styles.icon} /></button>
                        <button> <ShareAltOutlined className={styles.icon} /></button>
                        <button> <MoreOutlined className={styles.icon} /></button>
                    </div>
                    <div className={styles.details}>
                        <span>Details</span>
                        <div className={styles.details_field}>
                            <span>Condition</span>
                            <span>New</span>
                        </div>
                        <div className={styles.details_field}>
                            <span>Size</span>
                            <span>  M L XL XXL</span>
                        </div>
                    </div>

                    <div className={styles.contact}>
                        <div className={styles.head}>
                            <MessageFilled className={styles.icon} />
                            <span>Send seller a message</span>
                        </div>
                        <input type="text" value={'Hi Gaurav, is this still available?'} />
                        <button>Send</button>
                    </div>
                </div>
            </div>
            <Browse />
        </div>
    )
}

export default ProductPage