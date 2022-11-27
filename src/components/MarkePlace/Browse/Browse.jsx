import React from 'react';
import styles from './Browse.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';

const Browse = () => {
  const sectionRef = useRef();
  const [width, setWidth] = useState(Number);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log(sectionRef);
    const totalWidth = sectionRef.current.clientWidth;
    // const cardWidth = totalWidth / 3;
    const cardWidth = totalWidth / 3;
    setWidth(cardWidth - 14)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/market-place/all-products', {
          headers: {
            token: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.data.status === 'err') {
          toast.error(res.data.message);
          setLoading(false);
        }
        if (res.data.status === 'success') {
          setProducts(res.data.data)
          // console.log(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong')
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className={styles.browse}>
      <div className={styles.section_}>
        <div className={styles.top}>
          <span>Today's Pick</span>
        </div>
        <div className={styles.section} ref={sectionRef}>
          {
            loading && <Loading font='15rem' color='var(--text)' />
          }
          {
            products?.map(product => (
              <ProductCard
                key={product._id}
                width={width}
                product={product}
              />
            ))
          }

          {products.length === 0 && <h1>No Listed products</h1>}

        </div>
      </div>
      <div className={styles.section_}>
        <div className={styles.top}>
          <span>Men's clothing & shoes</span>
          <button>See all</button>
        </div>
        <div className={styles.section} ref={sectionRef}>
          {
            loading && <Loading font='15rem' color='var(--text)' />
          }
          {
            products?.map(product => (
              <ProductCard
                key={product._id}
                width={width}
                product={product}
              />
            ))
          }

          {products.length === 0 && <h1>No Listed products</h1>}
        </div>
      </div>
    </div>
  )
}

export default Browse