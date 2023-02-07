import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CatStripe from '../CategoryStripe/CatStripe';
import ProductCard from '../ProductCard/ProductCard';  //imported shop folder
import styles from './Category.module.scss';

const Category = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');

    return (
        <div className={styles.category}>
            <CatStripe type='categories_page' />
            <div className={styles.body}>
                <h1>{searchQuery.split(' ').join(' & ')}</h1>
                <div className={styles.product_list}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    )
}

export default Category