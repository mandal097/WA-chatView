import React, { useEffect, useRef } from 'react';
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
    // const [scroll, setScroll] = useState(false)
    const ref = useRef(null);
    console.log(ref.current)
    useEffect(() => {
        var prevScrollPosition = window.pageYOffset;
        const handler = () => {
            var currentScrollPosition = window.pageYOffset;
            if (type === 'categories_page') {
                if (prevScrollPosition > currentScrollPosition) {
                    ref.current.style.position = 'fixed'
                    ref.current.style.top = '60px'
                    // ref.current.style.transform = 'translateY(12rem)'
                } else {
                    ref.current.style.position = 'fixed'
                    ref.current.style.top = '-60px'
                    // ref.current.style.transform = 'translateY(-12rem)'
                }
            }
            prevScrollPosition = currentScrollPosition;
        }
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [type])

    return (
        <div
            ref={ref}
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