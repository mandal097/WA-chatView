import React, { useEffect, useRef, useState } from 'react'
import styles from './Category.module.scss'
import { useLocation } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import ProductCard from '../ProductCard/ProductCard';
import { toast } from 'react-toastify';
import axios from '../../../config/axios';

const Category = () => {
  const sectionRef = useRef();
  const [width, setWidth] = useState(Number);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const category = location.pathname.split('/')[3]

  useEffect(() => {
    const totalWidth = sectionRef.current.clientWidth;
    const cardWidth = totalWidth / 5;
    setWidth(cardWidth - 14)
  }, [])


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = category === undefined ?
          await axios.get(`/market-place/all-products`, {
            headers: {
              token: `Bearer ${localStorage.getItem('token')}`
            }
          })
          : await axios.get(`/market-place/products/${category}`, {
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
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong')
      }
    }
    fetchProducts()
  }, [category]);

  return (
    <div className={styles.category}>
      <div className={styles.section_}>
        <div className={styles.top}>
          <span>{category?.replace(/-/g, " ").replace(/ /g, " ")}</span>
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

          {products.length === 0 && <h1 style={{ fontSize: '2rem', color: 'var(--text)' }}>No products found</h1>}
        </div>
      </div>
    </div>
  )
}

export default Category