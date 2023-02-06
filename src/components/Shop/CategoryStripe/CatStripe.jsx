import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styles from './CatStripe.module.scss';

import { categories } from './data';


const Category = ({ ele, type }) => {
    const navigate = useNavigate();

    const navigateFunction = (params) => {
        const links = params.replace(/ &/g, '');
        navigate({
            pathname: '/shop/category/',
            search: `${createSearchParams({ 'q': links })}`
        })
    }

    return (
        <div
            className={styles.cat_card}
            onClick={() => navigateFunction(ele?.cat)}>
            {type === 'shophome' && <img src={`/assets/images/${ele?.img}`} alt="" />}
            <span>{ele.cat}</span>
        </div>
    )
}


const CatStripe = ({ type }) => {
    return (
        <div
            className={styles.categories}
            style={{
                height: type === 'categories_page' && 'auto',
                padding: type === 'categories_page' && '1rem 0',
            }}>
            {
                categories?.map(ele => (
                    <Category key={ele.id} ele={ele} type={type} />
                ))
            }
        </div>
    )
}

export default CatStripe