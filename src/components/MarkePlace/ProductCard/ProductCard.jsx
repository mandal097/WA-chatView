import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

const ProductCard = ({product, width }) => {
    return (
        <Link 
        to={`/marketplace/item/${product?._id}`}
        className={styles.product_card}
         style={{ width: `${width}px` }}>
            <div className={styles.img}>
                <img src={product?.photo} alt="product_image" />
            </div>
            <div className={styles.details}>
                <span>₹ {product?.price}</span>
                <p>{product?.productName}</p>
                <small>{product?.location}</small>
            </div>
        </Link>
    )
}

export default ProductCard