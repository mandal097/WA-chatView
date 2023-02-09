import { ArrowDownOutlined, StarFilled } from '@ant-design/icons';
import React from 'react';
import styles from './Ratings.module.scss';


const Rating = ({ value, rating, count }) => {
    return (
        <div className={styles.stars_rating}>
            <span>{rating}</span>
            <StarFilled className={styles.icon} />
            {/* <div className={styles.progress}></div> */}
            <progress className={styles.progress} value={value} max="100"></progress>
            <small>{count}</small>
        </div>
    )
}

const Ratings = () => {
    return (
        <div className={styles.ratings_}>
            <div className={styles.top}>
                <span>Ratings & Reviews</span>
                <button>Rate Product</button>
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <div className={styles.count}>
                        <span>4.2</span><StarFilled className={styles.icon} />
                    </div>
                    <p>28,342 Ratings & <br /> 3,526 Reviews</p>
                </div>
                <div className={styles.right}>
                    <Rating value='80' rating='5' count='6990' />
                    <Rating value='50' rating='4' count='3990' />
                    <Rating value='40' rating='3' count='3490' />
                    <Rating value='25' rating='2' count='1740' />
                    <Rating value='15' rating='1' count='900' />
                </div>
                <div className={styles.scroll_down}>
                    <span>Read Reviews</span>
                    <ArrowDownOutlined className={styles.icon} />
                </div>
            </div>
        </div>
    )
}

export default Ratings