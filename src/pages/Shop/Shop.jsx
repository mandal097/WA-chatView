import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Shop/Footer/Footer';
import styles from './Shop.module.scss';

const Shop = () => {
    return (
        <div className={styles.shop}>
            <div className={styles.outlet}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Shop