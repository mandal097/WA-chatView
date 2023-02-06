import React from 'react';
import styles from './CatStripe.module.scss';

import { categories } from './data';


const Category = ({ ele }) => {
    return (
        <div className={styles.cat_card}>
            <img src={`/assets/images/${ele?.img}`} alt="" />
            <span>{ele.cat}</span>
        </div>
    )
}


const CatStripe = () => {
    return (
        <div className={styles.categories}>
            {
                categories?.map(ele => (
                    <Category key={ele.id} ele={ele} />
                ))
            }
        </div>
    )
}

export default CatStripe