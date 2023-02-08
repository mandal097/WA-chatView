import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { HeartFilled, QqOutlined, StarFilled } from '@ant-design/icons'
import { capitalizeFirstLetter } from '../../../helpers/strings';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ProductCard = () => {
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);
    const handleWishlist = (e) => {
        e.stopPropagation()
        switch (added) {
            case false:
                setAdded(true);
                toast.success('Added to wishlist')
                break;
            case true:
                setAdded(false);
                toast.error('Removed from wishlist')
                break;
            default:
                setAdded(false)
        }
    }
    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.product_card}>
                <div className={styles.wrapper}>
                    <div className={styles.img} onClick={()=>navigate(`/shop/product/kuch-bhi-lele-yaha-se`)}>
                        <div className={`${styles.wishlist} ${added && 'pop'}`} onClick={handleWishlist} >
                            <HeartFilled className={`${styles.icon} ${added && styles.added} `} />
                        </div>
                        <img src="https://rukminim1.flixcart.com/image/612/612/kv9urgw0/shoe/t/h/b/7-new-9309-7-world-wear-footwear-black-original-imag87ndjqrzjg2m.jpeg?q=70" alt="product_image" />
                    </div>

                    <div className={styles.details}>
                        <Link
                            to={`/shop/product/kuch-bhi-filhal-haha`}
                            className={styles.name}>Name of the product should be here</Link>
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
                        <div className={styles.btns}>
                            <button>Add to cart</button>
                            <button>Buy now</button>
                        </div>
                        <div className={styles.delivery_stat}><span>{capitalizeFirstLetter("free delivery")}</span></div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductCard