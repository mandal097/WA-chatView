import React from 'react';
import Sidebar from '../../components/MarkePlace/Sidebar/Sidebar';
import styles from './MarketPlace.module.scss';
import { Outlet, useLocation } from 'react-router-dom';

const MarketPlace = () => {
  const location = useLocation();
  const pathIndexTwo = location.pathname.split('/')[2];
  return (
    <div className={styles.marketplace}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.body} style={{padding:pathIndexTwo==='create'&& '0'}}>
        <Outlet />
      </div>
    </div>
  )
}

export default MarketPlace