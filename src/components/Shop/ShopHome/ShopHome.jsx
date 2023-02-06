import React from 'react';
import styles from './ShopHome.module.scss';
import Banner from '../Banner/Banner';
import { banners, aboutProdutsType } from './data'
import Browse from '../../MarkePlace/Browse/Browse';
import CatStripe from '../CategoryStripe/CatStripe';


const ShopHome = () => {
  return (
    <div className={styles.products_home}>
      <CatStripe />
      <Banner banners={banners} />
      <div className={styles.discount_coupan}>
        <img src="/assets/images/discount_coupan.jpg" alt="" />
      </div>

      <Browse />

      <div className={styles.products_availability}>
        <h1>What Can You Buy From WeeConnect shop?</h1>
        {aboutProdutsType?.map(ele => (
          <div key={ele.id} style={{ marginTop: '1rem' }}>
            <span>{ele.product}</span>
            {ele.about.split('<br/>').map(str => <p >{str}</p>)}
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default ShopHome