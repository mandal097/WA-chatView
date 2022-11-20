import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/MarkePlace/Sidebar/Sidebar';
import styles from './MarketPlace.module.scss';

const MarketPlace = () => {
  return (
    <div className={styles.marketplace}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  )
}

export default MarketPlace