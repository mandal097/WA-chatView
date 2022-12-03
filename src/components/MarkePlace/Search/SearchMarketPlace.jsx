import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styles from './Search.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';
import { format } from 'timeago.js';


const Card = ({ product }) => {
  const [color, setColor] = useState('green');

  useEffect(() => {
    if (product?.status === 'in-stock') {
      setColor('green')
    }
    if (product?.status === 'out-of-stock') {
      setColor('red')
    }
    if (product?.status === 'sold') {
      setColor('grey')
    }
  }, [product]);

  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={product?.photo} alt="" />
      </div>
      <div className={styles.details}>
        <span>{product?.productName}</span>
        <small>₹ {product?.price}</small>
        <span style={{
          width: '0.7rem',
          height: '0.7rem',
          borderRadius: '50%',
          marginTop: '0.3rem',
          backgroundColor: color,
        }}></span>
        <small>{product?.status} • product listed {format(product.createdAt)}</small>
      </div>
    </div >
  )
}

const SearchMarketPlace = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res =
          await axios.get(`/market-place/all-products`, {
            headers: {
              token: `Bearer ${localStorage.getItem('token')}`
            }
          })

        if (res.data.status === 'err') {
          toast.error(res.data.message);
          setLoading(false);
        }
        if (res.data.status === 'success') {
          setProducts(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong')
      }
    }
    fetchProducts()
  }, []);


  useEffect(() => {
    const search = products?.filter((product) => {
      if (query === '') {
        return false
      } else if (product?.productName.toLowerCase().includes(query.toLowerCase())) {
        return product
      }
      return false;
    });
    setSearchedProducts(search);
  }, [query, products,])



  return (
    <div className={styles.search}>
      <ToastContainer className='toaster' />
      <div className={styles.heading}>
        {searchedProducts.length >= 1
          ? <h3>You searched for : <span>{query}</span></h3>
          : <h3 >No products found for <span style={{color:'var(--error)'}}>{query}</span></h3>}
      </div>

      {searchedProducts.length >= 1 && <div className={styles.section} style={{ borderBottom: '1px solid var(--border)' }}>
        {
          loading && <Loading font='15rem' color='var(--text)' />
        }
        {
          searchedProducts?.map(product => (
            <Card
              key={product._id}
              product={product}
            />
          ))
        }
        {searchedProducts.length === 0 && <h1 style={{ fontSize: '2rem', color: 'var(--error)', fontWeight: '100' }}>No results foound for {query}</h1>}
      </div>}



      <div className={styles.section}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text)', fontWeight: '100' }}>Explore more products</h1>
        {
          loading && <Loading font='15rem' color='var(--text)' />
        }

        {
          products?.map(product => (
            <Card
              key={product._id}
              product={product}
            />
          ))
        }
        {products.length === 0 && <h1 style={{ fontSize: '2rem', color: 'var(--text)', fontWeight: '100' }}>Something went wrong</h1>}

      </div>
    </div>
  )
}

export default SearchMarketPlace;