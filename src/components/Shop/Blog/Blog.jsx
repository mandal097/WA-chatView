import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.scss';

const Card = () => {
    return (
        <Link className={styles.card} to={`/shop/blog/maybe-id-of-the-blog`}>
            <div className={styles.img}>
                <img src="https://media.istockphoto.com/id/1199536938/photo/food-blogger-young-woman-in-glasses-sitting-at-stylish-apartment-taking-photo-of-desserts-on.jpg?b=1&s=170667a&w=0&k=20&c=TfOasHUdNCJfXI5bmTtyUs5yKgCEpKscrAQaoMrVMUc=" alt="" />
            </div>
            <p>Interesting Facts You Must Know About Cold Brew</p>
        </Link>
    )
}

const Blog = () => {
    return (
        <div className={styles.blog}>
            <div className={styles.cover}>
                <div className={styles.cover_img}>
                    <img src="/assets/images/blog_one.jpg" alt="" />
                </div>
                <div className={styles.layer}>
                    <span>our blog</span>
                </div>
            </div>
            <div className={styles.blog_card_container}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default Blog