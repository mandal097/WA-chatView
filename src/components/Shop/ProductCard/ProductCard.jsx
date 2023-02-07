import React from 'react';
import styles from './ProductCard.module.scss';
import { QqOutlined, StarFilled } from '@ant-design/icons'
import { capitalizeFirstLetter } from '../../../helpers/strings';

const ProductCard = () => {
    return (
        <div className={styles.product_card}>
            <div className={styles.wrapper}>
                <div className={styles.img}>
                    <img src="https://rukminim1.flixcart.com/image/612/612/kv9urgw0/shoe/t/h/b/7-new-9309-7-world-wear-footwear-black-original-imag87ndjqrzjg2m.jpeg?q=70" alt="product_image" />
                </div>

                <div className={styles.details}>
                    <span className={styles.name}>Name of the product should be here</span>
                    <div className={styles.ratings}>
                        <div className={styles.stars}>
                            <span>4.3</span>
                            <StarFilled className={styles.icon} />
                        </div>
                        <small className={styles.counts}>{'(23,343)'}</small>
                        <div className={styles.logo}>
                            <QqOutlined className={styles.icon} />
                        </div>
                    </div>
                    <div className={styles.prices}>
                        <span>$267</span>
                        <strike>$400</strike>
                        <small>58% off</small>
                    </div>
                    <div className={styles.delivery_stat}><span>{capitalizeFirstLetter("free delivery")}</span></div>
                </div>
            </div>

        </div>
    )
}

export default ProductCard