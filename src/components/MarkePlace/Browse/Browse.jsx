import React from 'react';
import styles from './Browse.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Browse = () => {
  const sectionRef = useRef();
  const [width, setWidth] = useState(Number)

  useEffect(() => {
    // console.log(sectionRef);
    const totalWidth = sectionRef.current.clientWidth;
    const cardWidth = totalWidth / 3;
    setWidth(cardWidth - 10)
  }, [])

  return (
    <div className={styles.browse}>
      <div className={styles.section_}>
        <div className={styles.top}>
          <span>Today's Pick</span>
        </div>
        <div className={styles.section} ref={sectionRef}>
          <ProductCard
            width={width}
            img="https://scontent.fdel27-5.fna.fbcdn.net/v/t45.5328-4/311616868_5398726520236106_1534929263663625609_n.jpg?stp=c0.26.261.261a_dst-jpg_p261x260&_nc_cat=103&ccb=1-7&_nc_sid=c48759&_nc_ohc=e_BdMgOaTEsAX-UHQKt&_nc_ht=scontent.fdel27-5.fna&oh=00_AfBmM26ZqSRc5UZj-FJiYfQmPbVXjNtWEsQ89ypuLrzi5w&oe=637FCAA5"
            name='Leather jacket - Heavy Quality Furr Inside'
            price='1944'
            location='New Delhi ,DL'
          />
          <ProductCard
            width={width}
            img="https://scontent.fdel27-1.fna.fbcdn.net/v/t45.5328-4/315862544_5441077522669489_4785131158853255480_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=101&ccb=1-7&_nc_sid=c48759&_nc_ohc=Ua2WvzFV_acAX8NoiJD&_nc_ht=scontent.fdel27-1.fna&oh=00_AfASy1dTOUdcWFUkovusQfEO41L_RdPEgRxquOCWMSMfQw&oe=638040E5"
            name='iPhone pro high master copy 2022 edition'
            price='12,999'
            location='New Delhi ,DL'
          />
          <ProductCard
            width={width}
            img="https://scontent.fdel27-5.fna.fbcdn.net/v/t45.5328-4/311616868_5398726520236106_1534929263663625609_n.jpg?stp=c0.26.261.261a_dst-jpg_p261x260&_nc_cat=103&ccb=1-7&_nc_sid=c48759&_nc_ohc=e_BdMgOaTEsAX-UHQKt&_nc_ht=scontent.fdel27-5.fna&oh=00_AfBmM26ZqSRc5UZj-FJiYfQmPbVXjNtWEsQ89ypuLrzi5w&oe=637FCAA5"
            name='Leather jacket - Heavy Quality Furr Inside'
            price='1944'
            location='New Delhi ,DL'
          />
          <ProductCard
            width={width}
            img="https://scontent.fdel27-1.fna.fbcdn.net/v/t45.5328-4/315862544_5441077522669489_4785131158853255480_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=101&ccb=1-7&_nc_sid=c48759&_nc_ohc=Ua2WvzFV_acAX8NoiJD&_nc_ht=scontent.fdel27-1.fna&oh=00_AfASy1dTOUdcWFUkovusQfEO41L_RdPEgRxquOCWMSMfQw&oe=638040E5"
            name='iPhone pro high master copy 2022 edition'
            price='12,999'
            location='New Delhi ,DL'
          />
          <ProductCard
            width={width}
            img="https://scontent.fdel27-1.fna.fbcdn.net/v/t45.5328-4/315862544_5441077522669489_4785131158853255480_n.jpg?stp=c0.43.261.261a_dst-jpg_p261x260&_nc_cat=101&ccb=1-7&_nc_sid=c48759&_nc_ohc=Ua2WvzFV_acAX8NoiJD&_nc_ht=scontent.fdel27-1.fna&oh=00_AfASy1dTOUdcWFUkovusQfEO41L_RdPEgRxquOCWMSMfQw&oe=638040E5"
            name='iPhone pro high master copy 2022 edition'
            price='12,999'
            location='New Delhi ,DL'
          />
        </div>
      </div>
      <div className={styles.section_}>
        <div className={styles.top}>
          <span>Men's clothing & shoes</span>
          <button>See all</button>
        </div>
        <div className={styles.section} ref={sectionRef}>
          <ProductCard
            width={width}
            img="https://scontent.fdel27-5.fna.fbcdn.net/v/t45.5328-4/311616868_5398726520236106_1534929263663625609_n.jpg?stp=c0.26.261.261a_dst-jpg_p261x260&_nc_cat=103&ccb=1-7&_nc_sid=c48759&_nc_ohc=e_BdMgOaTEsAX-UHQKt&_nc_ht=scontent.fdel27-5.fna&oh=00_AfBmM26ZqSRc5UZj-FJiYfQmPbVXjNtWEsQ89ypuLrzi5w&oe=637FCAA5"
            name='Leather jacket - Heavy Quality Furr Inside'
            price='1944'
            location='New Delhi ,DL'
          />
        
          <ProductCard
            width={width}
            img="https://scontent.fdel27-5.fna.fbcdn.net/v/t45.5328-4/311616868_5398726520236106_1534929263663625609_n.jpg?stp=c0.26.261.261a_dst-jpg_p261x260&_nc_cat=103&ccb=1-7&_nc_sid=c48759&_nc_ohc=e_BdMgOaTEsAX-UHQKt&_nc_ht=scontent.fdel27-5.fna&oh=00_AfBmM26ZqSRc5UZj-FJiYfQmPbVXjNtWEsQ89ypuLrzi5w&oe=637FCAA5"
            name='Leather jacket - Heavy Quality Furr Inside'
            price='1944'
            location='New Delhi ,DL'
          />
          <ProductCard
            width={width}
            img="https://scontent.fdel27-5.fna.fbcdn.net/v/t45.5328-4/311616868_5398726520236106_1534929263663625609_n.jpg?stp=c0.26.261.261a_dst-jpg_p261x260&_nc_cat=103&ccb=1-7&_nc_sid=c48759&_nc_ohc=e_BdMgOaTEsAX-UHQKt&_nc_ht=scontent.fdel27-5.fna&oh=00_AfBmM26ZqSRc5UZj-FJiYfQmPbVXjNtWEsQ89ypuLrzi5w&oe=637FCAA5"
            name='Leather jacket - Heavy Quality Furr Inside'
            price='1944'
            location='New Delhi ,DL'
          />
        </div>
      </div>
    </div>
  )
}

export default Browse