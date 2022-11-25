import React from 'react';
import { useSelector } from 'react-redux';
import styles from './PreviewProduct.module.scss';

const PreviewProduct = (
    { photo,
        productName,
        price,
        condition,
        category,
        tags,
        location,
        desc }
) => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className={styles.preview_product} >
            <span >Preview</span>
            <div className={`${styles.wrapper} ${'custom_scroll'}`}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        {photo ?
                            <img src={URL.createObjectURL(photo)} alt="" />
                            : <div className={styles.dummy}>
                                <h1>Your listing preview</h1>
                                <p>As you create your listing, you can preview how it will appear to others Marketplace.</p>
                            </div>
                        }
                    </div>
                    <div className={`${styles.right} ${'custom_scroll'}`}>
                        <h1>{productName ? productName : 'Title'}</h1>
                        <h2>{price ? `₹ ${price}` : 'Price'}</h2>
                        <h2 style={{ marginTop: '1rem', fontSize: '2.5rem' }}>Details</h2>
                        <div className={styles.details_div}>
                            {condition && <div className={styles.details_field}>
                                <span>Condition :</span>
                                <span>{condition}</span>
                            </div>}
                            {category && <div className={styles.details_field}>
                                <span>Category :</span>
                                <span>{category}</span>
                            </div>}
                            {tags && <div className={styles.details_field}>
                                <span>Tags :</span>
                                <span>{tags}</span>
                            </div>}
                            {location && <div className={styles.details_field}>
                                <span>Locaton :</span>
                                <span>{location}</span>
                            </div>}
                        </div>
                        <p style={{ margin: '2rem 0' }}>{desc ? desc : 'Description will appear here'}</p>
                        <div className={styles.seller_info}>
                            <div className={styles.head}>
                                <span>Seller Information</span>
                                <small>Seller Details</small>
                            </div>
                            <div className={styles.card}>
                                <img src={currentUser?.profilePic} alt="" />
                                <span>{currentUser?.name}</span>
                            </div>
                            <button>Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewProduct