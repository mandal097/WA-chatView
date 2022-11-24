import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

const ProductCard = ({ price, name, img, location, width }) => {
    return (
        <Link 
        to={`/marketplace/item/${name}`}
        className={styles.product_card}
         style={{ width: `${width}px` }}>
            <div className={styles.img}>
                <img src={img} alt="product_image" />
            </div>
            <div className={styles.details}>
                <span>₹ {price}</span>
                <p>{name}</p>
                <small>{location}</small>
            </div>
        </Link>
    )
}

export default ProductCard